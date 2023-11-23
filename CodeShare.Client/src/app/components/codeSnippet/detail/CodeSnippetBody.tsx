import { useState } from "react";
import CodeIframe from "./CodeIframe";
import ScaleInput from "../../ScaleInput";

interface Props {
  html: string;
  linesOfCode: number;
}

const CodeSnippetBody = ({ html, linesOfCode }: Props) => {
  const [scale, setScale] = useState(1);
  const height = linesOfCode * 24 + 24;

  return (
    <>
      <ScaleInput scale={scale} setScale={setScale} />
      <CodeIframe html={html} height={height} scale={scale} />
    </>
  );
};

export default CodeSnippetBody;
