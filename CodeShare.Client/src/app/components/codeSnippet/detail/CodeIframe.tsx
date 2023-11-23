import { memo } from "react";

interface Props {
  html: string;
  height: number;
  scale: number;
}

const CodeIframe = memo(({ html, height, scale }: Props) => {
  const iframeStyle = {
    height: `${height}px`,
    backgroundColor: "#1E1E1E",
    transform: `scale(${scale})`,
    width: `${100 / scale}%`,
    transformOrigin: "0 0"
  };

  return (
    <div style={{ height: height * scale + "px" }} className="block">
      <iframe
        seamless
        srcDoc={html}
        className="block w-full overflow-auto"
        title={"C# Code Fragment"}
        style={iframeStyle}
      />
    </div>
  );
});

export default CodeIframe;
