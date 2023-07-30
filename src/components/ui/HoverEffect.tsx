import { type FC, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface HoverEffectProps {
  children: ReactNode;
  red?: boolean;
  className?: string;
}

export const HoverEffect: FC<HoverEffectProps> = ({
  children,
  red = false,
  className = "",
}) => {
  const colorsClasses = red
    ? "hover:bg-red-300 group-hover:bg-red-300 outline-red-400 focus-visible:bg-red-300"
    : "hover:bg-gray-300 group-hover:bg-gray-300 outline-gray-400 focus-visible:bg-gray-300";

  return (
    <div
      className={twMerge(
        "rounded-full p-2 transition-colors duration-200",
        colorsClasses,
        className
      )}
    >
      {children}
    </div>
  );
};
