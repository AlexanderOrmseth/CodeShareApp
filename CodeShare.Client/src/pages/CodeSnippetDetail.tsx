import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import api from "../app/services/api";
import LoadingMessage from "../app/components/LoadingMessage";
import CodeSnippet from "../app/components/codeSnippet/detail/CodeSnippet";
import CodeSnippetControls from "../app/components/codeSnippet/detail/CodeSnippetControls";

const CodeSnippetDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["code", id],
    queryFn: async ({ signal }) => {
      const response = await api.getCodeSnippetById(id as string, signal);
      return response.data;
    }
  });

  if (isLoading) return <LoadingMessage message="Fetching..." />;

  if (error) return "An error has occurred: " + error.message;

  return (
    data && (
      <>
        <CodeSnippetControls code={data.code} />
        <CodeSnippet
          linesOfCode={data.linesOfCode}
          html={data.html}
          headerDetails={{
            author: data.author,
            createdAt: data.createdAt,
            id: data.id,
            title: data.title
          }}
        />
      </>
    )
  );
};

export default CodeSnippetDetail;
