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
  const createdBy = headerDetails.author || "Unknown";

  return (
    <header
      role="banner"
      className="border-dark-300 mb-4 items-center gap-x-4 border-b pb-2 text-sm text-gray-100/70 md:flex"
    >
      <h3
        data-testid="title"
        id="title"
        aria-label={
          headerDetails.title || !headerDetails.id
            ? "Code Snippet Title " + headerDetails.title
            : "Code Snippet ID"
        }
        className="flex leading-4 flex-1 text-c-sharp-100 flex-wrap items-center gap-2 font-bold"
      >
        <CodeIcon
          className="text-gray-100/70"
          aria-hidden="true"
          size="1.5rem"
        />
        {headerDetails.title || headerDetails.id}
      </h3>
      <div className="mt-1.5 flex flex-row flex-wrap items-center gap-x-4 gap-y-1 md:mt-0">
        <span
          data-testid="createdBy"
          id="createdBy"
          className="flex items-center justify-end gap-2"
          aria-label={`Created by ${createdBy}`}
        >
          <User aria-hidden="true" size="1.25rem" />
          {createdBy}
        </span>
        <time
          data-testid="time"
          id="creationTime"
          className="flex flex-wrap items-center justify-end gap-2"
          aria-label={`Creation time: ${
            headerDetails.createdAt ? headerDetails.createdAt : "just now"
          }`}
        >
          <Clock aria-hidden="true" size="1.25rem" />
          {headerDetails.createdAt ? headerDetails.createdAt : "just now"}
        </time>
      </div>
    </header>
  );
};

export default CodeSnippetHeader;
