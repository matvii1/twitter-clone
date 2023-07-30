import Link from "next/link";
import { type FC, type ReactNode } from "react";
import { HoverEffect } from "./HoverEffect";

interface NavLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export const NavLink: FC<NavLinkProps> = ({
  href,
  className = "",
  children,
}) => {
  return (
    <Link href={href} className={className}>
      <HoverEffect className="flex items-center justify-center gap-4 px-4 md:justify-normal">
        {children}
      </HoverEffect>
    </Link>
  );
};
