interface CodeSnippetBase {
  title?: string;
  author?: string;
}
export interface CodeSnippet extends CodeSnippetBase {
  id: string;
  createdAt: string;
  linesOfCode: number;
  code: string;
  html: string;
}
export interface CodeSnippetPreview extends CodeSnippetBase {
  linesOfCode: number;
  html: string;
}
export interface CreateCodeSnippet extends CodeSnippetBase {
  code: string;
}
