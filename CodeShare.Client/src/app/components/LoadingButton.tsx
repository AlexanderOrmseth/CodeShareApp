import { ReactNode, ButtonHTMLAttributes } from "react";
import LoaderIcon from "./LoaderIcon";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  icon?: ReactNode;
  loadingText: string;
  buttonText: string;
}

const LoadingButton = ({
  loading,
  buttonText,
  icon,
  loadingText,
  ...buttonProps
}: Props) => {
  return (
    <button
      {...buttonProps}
      disabled={buttonProps.disabled || loading}
      className={`btn-secondary disabled-btn ${
        buttonProps.className ? buttonProps.className : ""
      }`}
    >
      {loading ? (
        <>
          <LoaderIcon size={20} />
          {loadingText}
        </>
      ) : (
        <>
          {icon && icon}
          {buttonText}
        </>
      )}
    </button>
  );
};

export default LoadingButton;
