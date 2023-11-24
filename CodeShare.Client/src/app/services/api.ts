import axios from "axios";
import {
  CodeSnippet,
  CodeSnippetPreview,
  CreateCodeSnippet
} from "../models/codeSnippet";
import { z } from "zod";

const BASE_URL = import.meta.env.DEV
  ? "https://localhost:5002/api/v1/"
  : "/api/";

axios.defaults.baseURL = BASE_URL;

const guidSchema = z.string().uuid();

function isValidGuid(id: string): boolean {
  return guidSchema.safeParse(id).success;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
}

export interface ProblemDetails {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
}
const namespace = "code";

const api = {
  createCodeSnippet: async (values: CreateCodeSnippet, signal: AbortSignal) => {
    return axios
      .post<string>(namespace, values, { signal })
      .then((res) => res.data);
  },
  getCodeSnippetById: async (id: string, signal: AbortSignal) => {
    if (!isValidGuid(id)) {
      throw new Error("Invalid ID");
    }

    const res = await axios.get<ApiResponse<CodeSnippet>>(
      `${namespace}/${id}`,
      { signal }
    );
    return res.data;
  },
  getCodeSnippetPreview: async (
    values: CreateCodeSnippet,
    signal: AbortSignal
  ) => {
    return axios
      .post<ApiResponse<CodeSnippetPreview>>(`${namespace}/preview`, values, {
        signal
      })
      .then((res) => res.data);
  }
};

export default api;
