import LoaderIcon from "./LoaderIcon";

interface Props {
  message: string;
}

const LoadingMessage = ({ message }: Props) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center flex-row gap-2 my-2"
    >
      <LoaderIcon size={20} />
      <span className="text-disabled-color" aria-hidden="true">
        {message}
      </span>
      <span className="sr-only">Loading: {message}</span>
    </div>
  );
};

export default LoadingMessage;
