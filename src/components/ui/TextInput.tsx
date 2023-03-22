import type { FC } from "react";
import { cn } from "../../utils/cn";

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string;
  name?: string;
  label?: string;
}

export const TextInput: FC<TextInputProps> = ({
  label,
  type,
  name,
  value,
  className,
  ...props
}) => {
  return (
    <div className="relative">
      <input
        name={name}
        type={type}
        value={value}
        className={cn(
          "peer block w-full appearance-none rounded-lg border border-gray-700 bg-background2 px-2 pb-2 pt-5 text-sm text-white focus:border-blue-600 focus:outline-none focus:ring-0",
          className
        )}
        placeholder=" "
        {...props}
      />
      <label className="absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform select-none text-sm text-gray-500 duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600">
        {label}
      </label>
    </div>
  );
};
