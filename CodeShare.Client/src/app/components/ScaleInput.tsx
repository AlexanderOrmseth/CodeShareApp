import { memo, useCallback } from "react";

interface Props {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

const ScaleInput = memo(({ scale, setScale }: Props) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setScale(+e.target.value);
    },
    [setScale]
  );

  return (
    <div className="mb-4 flex flex-row items-center gap-2">
      <input
        type="range"
        step={0.1}
        min={0.3}
        max={1.5}
        className="range-lg h-3 w-full flex-1 cursor-pointer touch-none appearance-none rounded-lg dark:bg-gray-300/20"
        value={scale}
        onChange={onChange}
        aria-label="Scale"
      />
      <span className="font-mono text-xs text-gray-400">
        {scale.toFixed(1)}
      </span>
    </div>
  );
});
export default ScaleInput;
