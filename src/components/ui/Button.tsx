import { FC } from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  return (
    <button
      className={cn("h-[35px] w-[100px] rounded bg-blue-600", className)}
      {...props}
    ></button>
  );
};
