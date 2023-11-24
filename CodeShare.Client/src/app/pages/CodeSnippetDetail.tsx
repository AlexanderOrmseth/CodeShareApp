import LoadingMessage from "../components/LoadingMessage";
import CodeSnippet from "../components/codeSnippet/detail/CodeSnippet";
import CodeSnippetControls from "../components/codeSnippet/detail/CodeSnippetControls";
import { useGetCodeSnippetQuery } from "../hooks/queries/useGetCodeSnippetQuery";

const CodeSnippetDetail = () => {
  const { data, isLoading, error } = useGetCodeSnippetQuery();

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
