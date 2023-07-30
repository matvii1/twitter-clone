import { type FC } from "react";
import { useTabsContext } from "../contexts/TabsProvider";
import { type TabType } from "../types";

export const HeaderTabs: FC = () => {
  const { tabs, selectedTab, setSelectedTab } = useTabsContext();
  return (
    <div className="flex-grow-1 mt-6 flex">
      {tabs.map((tab) => (
        <Tab
          key={tab}
          isSelected={tab === selectedTab}
          text={tab}
          setSelectedTab={setSelectedTab}
        />
      ))}
    </div>
  );
};

interface TabProps {
  isSelected?: boolean;
  text: TabType;
  setSelectedTab: (tab: TabType) => void;
}

function Tab({ isSelected = false, text, setSelectedTab }: TabProps) {
  function handleTabClick() {
    setSelectedTab(text);
  }

  return (
    <button
      className="flex h-16 flex-grow cursor-pointer items-center justify-center transition-colors hover:bg-slate-100 focus-visible:bg-slate-100"
      onClick={handleTabClick}
    >
      <p className="relative">
        {text}
        {isSelected && (
          <span className="absolute -bottom-5 left-0 right-0 h-1 w-full rounded-md bg-blue-500" />
        )}
      </p>
    </button>
  );
}
