import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import { CodeSnippetBase, CodeSnippetPreview } from "../../models/codeSnippet";

export const useCreatePreviewSnippetMutation = () => {
  const mutation = useMutation({
    mutationFn: async (data: CodeSnippetBase) => {
      const response = await api.createPreviewCodeSnippet(data);
      return response.data;
    },
    onSuccess: (data: CodeSnippetPreview) => {
      console.log(data);
    },
    onError: (error: unknown) => {
      console.error(error);
    },
    retry: 0
  });

  return mutation;
};
