import { FC } from "react";
import { cn } from "../../utils/cn";

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
  type: string;
}

export const TextInput: FC<TextInputProps> = ({
  type,
  className,
  ...props
}) => {
  return <input type={type} {...props} className={cn("", className)} />;
};
