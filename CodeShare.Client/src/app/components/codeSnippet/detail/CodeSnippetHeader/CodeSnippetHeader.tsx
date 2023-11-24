import { Clock, Code as CodeIcon, User } from "react-feather";

export interface CodeSnippetHeaderDetails {
  id?: string;
  title?: string;
  author?: string;
  createdAt?: string;
}

interface Props {
  headerDetails: CodeSnippetHeaderDetails;
}

const CodeSnippetHeader = ({ headerDetails }: Props) => {
  return (
    <header className="border-dark-400 mb-4 items-center gap-x-4 border-b pb-2 text-sm text-gray-100/70 md:flex">
      <h2 className="flex flex-1 flex-wrap items-center gap-2 font-bold">
        <CodeIcon size="1.5rem" />
        <em className="flex-1 leading-4 text-purple-300">
          {headerDetails.title || headerDetails.id}
        </em>
      </h2>
      <div className="mt-1.5 flex flex-row flex-wrap items-center gap-x-4 gap-y-1 md:mt-0">
        <span className="flex items-center justify-end gap-2">
          <User size="1.25rem" />
          {headerDetails.author || "Unknown"}
        </span>
        <time
          data-testid="time"
          className="flex flex-wrap items-center justify-end gap-2"
        >
          <Clock size="1.25rem" />
          {headerDetails.createdAt
            ? new Date(headerDetails.createdAt).toLocaleString()
            : new Date().toLocaleDateString()}
        </time>
      </div>
    </header>
  );
};

export default CodeSnippetHeader;
