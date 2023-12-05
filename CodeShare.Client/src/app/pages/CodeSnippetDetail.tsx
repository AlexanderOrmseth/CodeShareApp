import LoadingMessage from "../components/LoadingMessage/LoadingMessage";
import ServerError from "../components/ServerError/ServerError";
import CodeSnippet from "../features/codesnippet/detail/CodeSnippet";
import CodeSnippetControls from "../features/codesnippet/detail/CodeSnippetControls";
import { useGetCodeSnippetQuery } from "../hooks/queries/useGetCodeSnippetQuery";

const CodeSnippetDetail = () => {
  const { data, isLoading, error } = useGetCodeSnippetQuery();

  if (isLoading) return <LoadingMessage message="Fetching..." />;
  if (error) return <ServerError error={error} />;

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
