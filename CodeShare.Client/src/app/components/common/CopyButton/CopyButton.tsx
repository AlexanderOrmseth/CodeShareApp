import React, { ButtonHTMLAttributes, useCallback, useState } from "react";
import { Copy, ThumbsUp, IconProps } from "react-feather";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: string;
  buttonText: string;
  Icon?: React.FunctionComponent<IconProps>;
}

const CopyButton = ({ data, buttonText, Icon, ...buttonProps }: Props) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDataCopy = useCallback((): void => {
    navigator.clipboard.writeText(data).then(() => {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    });
  }, [data]);

  return (
    <button
      {...buttonProps}
      type="button"
      disabled={showSuccess}
      className="disabled-btn btn-secondary h-10"
      onClick={handleDataCopy}
    >
      {!showSuccess ? (
        <>
          {Icon ? (
            <Icon aria-hidden="true" size="1.25rem" />
          ) : (
            <Copy aria-hidden="true" size="1.25rem" />
          )}
          {buttonText}
        </>
      ) : (
        <>
          <ThumbsUp aria-hidden="true" size="1.25rem" />
          Copied!
        </>
      )}
    </button>
  );
};

export default CopyButton;
