import {
  type ButtonHTMLAttributes,
  type DetailedHTMLProps,
  type FC,
  type ReactNode,
} from "react";
import { twMerge } from "tailwind-merge";
import { HoverEffect } from "./HoverEffect";

type NavButtonProps = {
  className?: string;
  children: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const NavButton: FC<NavButtonProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <HoverEffect className="mt-2">
      <button
        className={twMerge(
          "flex w-full items-center justify-center gap-2 rounded-lg   px-2 text-center text-slate-900",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </HoverEffect>
  );
};
