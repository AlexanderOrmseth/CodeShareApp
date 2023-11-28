import { memo, useCallback, useId } from "react";

interface Props {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  labelText: string;
}

const ScaleInput = memo(({ scale, setScale, labelText }: Props) => {
  const id = useId();
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setScale(+e.target.value);
    },
    [setScale]
  );

  return (
    <div className="mb-4 flex flex-row items-center gap-2">
      <label htmlFor={id} className="sr-only select-none">
        {labelText}
      </label>
      <input
        type="range"
        id={id}
        step={0.1}
        min={0.3}
        max={1.5}
        className="range-lg h-3 w-full flex-1 cursor-pointer touch-none appearance-none rounded-lg dark:bg-gray-300/20"
        value={scale}
        onChange={onChange}
        aria-label={labelText}
      />
      <span
        aria-hidden="true"
        className="font-mono text-xs select-none text-gray-400"
      >
        {scale.toFixed(1)}
      </span>
    </div>
  );
});
export default ScaleInput;
