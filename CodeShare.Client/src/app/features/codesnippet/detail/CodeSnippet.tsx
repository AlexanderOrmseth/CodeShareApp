import CodeSnippetHeader, {
  CodeSnippetHeaderDetails
} from "./CodeSnippetHeader/CodeSnippetHeader";
import CodeSnippetBody from "./CodeSnippetBody";
import { animated, useSpring } from "react-spring";

interface Props {
  html: string;
  linesOfCode: number;
  headerDetails: CodeSnippetHeaderDetails;
}

const CodeSnippet = ({ headerDetails, html, linesOfCode }: Props) => {
  const styles = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(10px)" }
  });

  return (
    <animated.div
      style={styles}
      className="bg-visual-studio-bg border-dark-300 rounded-lg border p-4"
    >
      <CodeSnippetHeader headerDetails={headerDetails} />
      <CodeSnippetBody html={html} linesOfCode={linesOfCode} />
    </animated.div>
  );
};

export default CodeSnippet;
