import LoaderIcon from "./LoaderIcon";

interface Props {
  message: string;
}

const LoadingMessage = ({ message }: Props) => {
  return (
    <div className="flex items-center justify-center flex-row gap-2 my-2">
      <LoaderIcon size={20} />
      <em className="text-disabled-color">{message}</em>
    </div>
  );
};

export default LoadingMessage;
