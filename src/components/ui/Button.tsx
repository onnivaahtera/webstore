import type { FC } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset" | undefined;
}

export const Button: FC<ButtonProps> = ({ type, className, ...props }) => {
  return (
    <button
      className={cn(
        "h-[35px] w-[100px] rounded bg-blue-600 hover:bg-blue-700",
        className
      )}
      {...props}
      type={type}
    ></button>
  );
};
