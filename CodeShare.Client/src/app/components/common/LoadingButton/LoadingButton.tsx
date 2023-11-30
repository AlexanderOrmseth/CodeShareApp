import { ButtonHTMLAttributes } from "react";
import LoaderIcon from "../LoaderIcon/LoaderIcon";
import { IconProps } from "react-feather";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  Icon?: React.FunctionComponent<IconProps>;
  loadingText: string;
  buttonText: string;
}

const LoadingButton = ({
  loading,
  buttonText,
  Icon,
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
          {Icon && <Icon aria-hidden="true" size="1.25rem" />}
          {buttonText}
        </>
      )}
    </button>
  );
};

export default LoadingButton;
