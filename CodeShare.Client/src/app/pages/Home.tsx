import CodeSnippetForm from "../components/codeSnippet/create/CodeSnippetForm";
import CodeSnippet from "../components/codeSnippet/detail/CodeSnippet";
import { useCreateCodeSnippetMutation } from "../hooks/mutations/useCreateCodeSnippetMutation";
import { useCreatePreviewSnippetMutation } from "../hooks/mutations/useCreatePreviewSnippetMutation";

const Home = () => {
  const { mutateAsync: createCodeSnippet } = useCreateCodeSnippetMutation();
  const {
    data: previewData,
    mutateAsync: createPreviewSnippet,
    isPending: previewIsLoading,
    isSuccess: isPreviewSuccess
  } = useCreatePreviewSnippetMutation();

  return (
    <div>
      <CodeSnippetForm
        submitFn={createCodeSnippet}
        createPreviewFn={createPreviewSnippet}
        previewIsPending={previewIsLoading}
      />
      {previewData && (
        <div role="region" aria-label="Code Snippet Preview" className="mt-4">
          <h2 className="mb-2 text-lg font-bold">Preview</h2>
          <CodeSnippet
            linesOfCode={previewData.linesOfCode}
            html={previewData.html}
            headerDetails={{
              author: previewData.author,
              title: previewData.title
            }}
          />
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {isPreviewSuccess && "Code snippet preview updated successfully!"}
      </div>
    </div>
  );
};

export default Home;
