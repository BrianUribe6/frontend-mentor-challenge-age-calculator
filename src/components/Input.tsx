import { forwardRef } from "react";
import cn from "../utils/classNames";

type InputProps = {
  label: string;
  error?: unknown;
  helperText?: string;
} & React.ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, helperText, ...rest },
  ref
) {
  const hasError = Boolean(error);

  return (
    <label>
      <span
        className={cn(
          error ? "text-lightRed" : "text-smokeyGray",
          "mb-2 block uppercase font-bold tracking-widest text-sm"
        )}
      >
        {label}
      </span>
      <input
        ref={ref}
        className={cn(
          "w-full placeholder:font-extrabold py-3 px-2 font-extrabold text-xl",
          "text-offBlack border rounded-md focus:outline-none caret-purple",
          error ? "border-lightRed" : "border-lightGray focus:border-purple"
        )}
        {...rest}
        aria-invalid={hasError}
      />
      {helperText && hasError && (
        <span className="text-lightRed text-sm mt-1" role="alert">
          {helperText}
        </span>
      )}
    </label>
  );
});

export default Input;
