import { useId, useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface Props extends TextAreaProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
  label: string;
  required?: boolean;
}

const FormTextArea = ({ register, error, label, required, ...rest }: Props) => {
  const id = useId();
  const errorId = `${id}-error`;

  const [charCount, setCharCount] = useState(0);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    register.onChange(event);
    setCharCount(event.target.value.length);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-baseline pr-2">
        <label className="label" htmlFor={id}>
          {label}
          {required ? (
            <span className="ml-1 text-red-300">
              * <span className="text-gray-300">(required)</span>
            </span>
          ) : (
            <span className="ml-1 text-gray-300">(optional)</span>
          )}
        </label>
        <span className="text-sm text-gray-400">
          {charCount}/{rest.maxLength}
        </span>
      </div>
      <textarea
        autoComplete="off"
        id={id}
        aria-required={required ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={`text-input ${
          error
            ? "border-red-400  text-red-300 placeholder:text-transparent"
            : ""
        }`}
        {...register}
        {...rest}
        onChange={handleInputChange}
      />

      {error && (
        <p id={errorId} className="text-sm italic text-red-300">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormTextArea;
