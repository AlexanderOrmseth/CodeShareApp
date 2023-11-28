import axios from "axios";
import {
  CodeSnippet,
  CodeSnippetBase,
  CodeSnippetPreview
} from "../models/codeSnippet";
import { z } from "zod";

const baseURL = import.meta.env.DEV
  ? "https://localhost:5002/api/v1/"
  : "/api/v1/";

const axiosApi = axios.create({
  baseURL
});

function isValidGuid(id: string): boolean {
  return z.string().uuid().safeParse(id).success;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}

const namespace = "code";

const api = {
  createCodeSnippet: (values: CodeSnippetBase, signal?: AbortSignal) => {
    return axiosApi.post<ApiResponse<string>>(namespace, values, {
      signal
    });
  },
  getCodeSnippetById: (id: string, signal: AbortSignal) => {
    if (!isValidGuid(id)) {
      throw new Error("Invalid ID");
    }

    return axiosApi.get<ApiResponse<CodeSnippet>>(`${namespace}/${id}`, {
      signal
    });
  },
  createPreviewCodeSnippet: (values: CodeSnippetBase, signal?: AbortSignal) => {
    return axiosApi.post<ApiResponse<CodeSnippetPreview>>(
      `${namespace}/preview`,
      values,
      {
        signal
      }
    );
  }
};

export default api;
