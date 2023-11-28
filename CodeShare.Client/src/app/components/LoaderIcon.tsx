interface Props {
  size: number;
}

const LoaderIcon = ({ size }: Props) => {
  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className={`relative overflow-hidden flex items-center`}
    >
      <div
        style={{ width: size / 3, height: size / 3 }}
        className="block inset-0 rounded-sm bg-disabled-color animate-[wiggle_1s_ease-in-out_infinite]"
      />
    </div>
  );
};

export default LoaderIcon;
