import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { CodeSnippetBase } from "../../models/codeSnippet";

export const useCreatePreviewSnippetMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: CodeSnippetBase) => {
      const response = await api.createPreviewCodeSnippet(data);
      return response.data.data;
    }
  });

  return mutation;
};
