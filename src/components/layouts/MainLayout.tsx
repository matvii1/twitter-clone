import { type FC, type ReactNode } from "react";
import { Sidenav } from "./Sidenav";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto flex items-start pr-4 sm:pr-0">
      <Sidenav />

      <main className="min-h-screen flex-grow border-x">{children}</main>
    </div>
  );
};
