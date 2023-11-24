export interface CodeSnippetBase {
  title?: string;
  author?: string;
  code: string;
}
export interface CodeSnippet extends CodeSnippetBase {
  id: string;
  createdAt: string;
  linesOfCode: number;
  html: string;
}
export interface CodeSnippetPreview extends CodeSnippetBase {
  linesOfCode: number;
  html: string;
}
