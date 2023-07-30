import { type FC } from "react";
import { VscRefresh } from "react-icons/vsc";

export const Loading: FC<{ big?: boolean }> = ({ big = false }) => {
  const sizeClasses = big ? "w-12 h-12" : "w-9 h-9";

  return (
    <div className="mt-6 flex justify-center p-2">
      <VscRefresh className={`animate-spin ${sizeClasses}`} />
    </div>
  );
};
