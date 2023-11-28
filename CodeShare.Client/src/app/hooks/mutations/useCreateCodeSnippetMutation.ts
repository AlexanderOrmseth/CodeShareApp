import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CodeSnippetBase } from "../../models/codeSnippet";
import api from "../../services/api";

export const useCreateCodeSnippetMutation = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: CodeSnippetBase) => {
      const response = await api.createCodeSnippet(data);
      console.log(response);
      return response.data.data;
    },
    onSuccess: (data: string) => navigate(`code/${data}`)
  });

  return mutation;
};
