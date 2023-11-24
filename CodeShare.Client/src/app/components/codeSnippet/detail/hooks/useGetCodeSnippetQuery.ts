import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../../../../services/api";

export const useGetCodeSnippetQuery = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["code", id],
    queryFn: async ({ signal }) => {
      const response = await api.getCodeSnippetById(id as string, signal);
      return response.data;
    },

    staleTime: Infinity
  });

  return { data, isLoading, error };
};
