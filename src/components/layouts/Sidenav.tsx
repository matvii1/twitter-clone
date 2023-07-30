import { signIn, signOut, useSession } from "next-auth/react";
import { type FC } from "react";
import { VscAccount, VscHome, VscSignIn, VscSignOut } from "react-icons/vsc";
import { NavButton, NavLink, ResponsiveText } from "../ui";

export const Sidenav: FC = () => {
  const session = useSession();
  const user = session.data?.user;

  async function handleLogout() {
    return await signOut();
  }

  async function handleSignIn() {
    return await signIn();
  }

  return (
    <nav className="sticky top-0 min-h-screen border-l p-4">
      <h2>LOGO</h2>

      <ul className="mt-3 flex flex-col whitespace-nowrap px-2">
        <li>
          <NavLink href="/">
            <VscHome className="h-7 w-7" />
            <ResponsiveText label="Home" />
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink href="/">
              <VscAccount className="h-7 w-7" />
              <ResponsiveText label="Profile" />
            </NavLink>
          </li>
        )}

        {user ? (
          <li>
            <NavButton onClick={() => void handleLogout()}>
              <VscSignOut className="h-6 w-6" />
              <ResponsiveText label="Log out" />
            </NavButton>
          </li>
        ) : (
          <li>
            <NavButton onClick={() => void handleSignIn()}>
              <VscSignIn className="h-6 w-6" />
              <ResponsiveText label="Log in" />
            </NavButton>
          </li>
        )}
      </ul>
    </nav>
  );
};
