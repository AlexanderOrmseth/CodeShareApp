import CopyButton from "../../common/CopyButton/CopyButton";
import { Code as CodeIcon, Link2 as LinkIcon } from "react-feather";

interface Props {
  code: string;
}

const CodeSnippetControls = ({ code }: Props) => {
  return (
    <div className="mb-2 grid gap-2 sm:grid-cols-2">
      <CopyButton
        aria-label="Copy link to code-fragment to clipboard"
        buttonText="Copy link"
        Icon={LinkIcon}
        data={window.location.href}
      />
      <CopyButton
        aria-label="Copy code to clipboard"
        buttonText="Copy code"
        Icon={CodeIcon}
        data={code}
      />
    </div>
  );
};

export default CodeSnippetControls;
