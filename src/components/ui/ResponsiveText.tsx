import { type FC } from "react";

interface ResponsiveTextProps {
  label: string;
}

export const ResponsiveText: FC<ResponsiveTextProps> = ({ label }) => {
  return <div className="hidden text-lg md:inline-block">{label}</div>;
};
