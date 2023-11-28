import { useId } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends InputProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
  label: string;
  required?: boolean;
}

const FormTextField = ({
  register,
  error,
  label,
  required,
  ...rest
}: Props) => {
  const id = useId();
  const errorId = `${id}-error`;

  // prevent from submitting by pressing enter inside input
  const checkKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <div>
      <label className="label" htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-1 text-red-400">
            * <span className="text-purple-300">(required)</span>
          </span>
        ) : (
          <span className="ml-1 text-purple-300">(optional)</span>
        )}
      </label>
      <input
        onKeyDown={(e) => checkKeyDown(e)}
        autoComplete="off"
        id={id}
        aria-required={required ? "true" : "false"}
        aria-describedby={error ? errorId : undefined}
        className={`text-input ${
          error
            ? "border-red-500  text-red-400 placeholder:text-transparent"
            : ""
        }`}
        {...register}
        {...rest}
      />
      {error && (
        <em id={errorId} className="text-sm italic text-red-400">
          {error.message}
        </em>
      )}
    </div>
  );
};

export default FormTextField;
