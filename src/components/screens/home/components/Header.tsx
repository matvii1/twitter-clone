import { useSession } from "next-auth/react";
import { type FC } from "react";
import { twMerge } from "tailwind-merge";
import { HeaderTabs } from "./HeaderTabs";

export const Header: FC = () => {
  const session = useSession();
  const isAuth = session.status === "authenticated";

  return (
    <header
      className={twMerge(
        "sticky top-0 z-10 border-b bg-white pt-2",
        !isAuth && "pb-6"
      )}
    >
      <h1 className="px-4 text-lg font-bold">Home</h1>

      {isAuth && <HeaderTabs />}
    </header>
  );
};
