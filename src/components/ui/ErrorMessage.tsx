import { type FC } from "react";

export const ErrorMessage: FC = () => {
  return (
    <h2 className="mt-16 px-3 text-center text-xl text-red-500 ">
      Error occured while loading tweets, please try again later
    </h2>
  );
};
