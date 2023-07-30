import Image from "next/image";
import { type FC } from "react";
import { VscAccount } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

interface ProfileImageProps {
  src: string | undefined | null;
  className?: string;
}

export const ProfileImage: FC<ProfileImageProps> = ({
  src,
  className = "",
}) => {
  return (
    <div
      className={twMerge(
        "relative h-12 w-12 overflow-hidden rounded-full text-white",
        className
      )}
    >
      {src == null ? (
        <VscAccount className="h-full w-full text-slate-900" />
      ) : (
        <Image
          quality={100}
          src={src}
          className="absolute object-cover"
          fill
          sizes="100px"
          alt="Profile Image"
        />
      )}
    </div>
  );
};
