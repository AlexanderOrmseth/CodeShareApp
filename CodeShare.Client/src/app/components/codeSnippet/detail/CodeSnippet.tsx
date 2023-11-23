import CodeSnippetHeader, {
  CodeSnippetHeaderDetails
} from "./CodeSnippetHeader";
import CodeSnippetBody from "./CodeSnippetBody";

interface Props {
  html: string;
  linesOfCode: number;
  headerDetails: CodeSnippetHeaderDetails;
}

const CodeSnippet = ({ headerDetails, html, linesOfCode }: Props) => {
  return (
    <div className="bg-visual-studio-bg border-dark-700 rounded-lg border p-4">
      <CodeSnippetHeader headerDetails={headerDetails} />
      <CodeSnippetBody html={html} linesOfCode={linesOfCode} />
    </div>
  );
};

export default CodeSnippet;
