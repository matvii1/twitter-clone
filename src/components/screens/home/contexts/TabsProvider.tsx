import {
  createContext,
  useContext,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from "react";
import { type TabType } from "../types";

export const TABS = ["Recent", "Following"] as const;

interface TabsContextType {
  selectedTab: string;
  setSelectedTab: (tab: TabType) => void;
  tabs: typeof TABS;
}

export const TabsContext = createContext<TabsContextType>(
  {} as TabsContextType
);

export const useTabsContext = () => useContext(TabsContext);

interface TabsProviderProps {
  children: ReactNode;
}

export const TabsProvider: FC<TabsProviderProps> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState<TabType>("Recent");

  const values = useMemo(
    () => ({
      selectedTab,
      setSelectedTab,
      tabs: TABS,
    }),
    [selectedTab]
  );

  return <TabsContext.Provider value={values}>{children}</TabsContext.Provider>;
};
