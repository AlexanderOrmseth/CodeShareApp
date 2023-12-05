import { animated, useSpring } from "react-spring";
import CopyButton from "../../../components/CopyButton/CopyButton";
import { Code as CodeIcon, Link2 as LinkIcon } from "react-feather";

interface Props {
  code: string;
}

const CodeSnippetControls = ({ code }: Props) => {
  const lbStyle = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(-10px)" }
  });

  const rbStyle = useSpring({
    opacity: 1,
    transform: "translateX(0)",
    from: { opacity: 0, transform: "translateX(10px)" }
  });

  return (
    <div className="mb-2 grid gap-2 sm:grid-cols-2">
      <animated.div style={lbStyle}>
        <CopyButton
          aria-label="Copy link to code-fragment to clipboard"
          buttonText="Copy link"
          Icon={LinkIcon}
          data={window.location.href}
        />
      </animated.div>
      <animated.div style={rbStyle}>
        <CopyButton
          aria-label="Copy code to clipboard"
          buttonText="Copy code"
          Icon={CodeIcon}
          data={code}
        />
      </animated.div>
    </div>
  );
};

export default CodeSnippetControls;
