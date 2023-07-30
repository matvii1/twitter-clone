import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
} from "react";
import { twMerge } from "tailwind-merge";

type NavLinkProps = {
  label: string;
  className?: string;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const AccentButton: FC<NavLinkProps> = ({
  label,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        "flex w-full items-center justify-center rounded-full bg-blue-500 px-20 py-2 font-bold text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-300 disabled:text-gray-700",
        className
      )}
    >
      {label}
    </button>
  );
};
