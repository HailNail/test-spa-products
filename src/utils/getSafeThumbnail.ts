import defaultImage from "@/assets/default.jpg";
import { StaticImageData } from "next/image";

export const getSafeThumbnail = (
  thumbnail: string | StaticImageData | null
): string => {
  if (!thumbnail) return defaultImage.src;
  if (typeof thumbnail === "string") return thumbnail;
  return thumbnail.src;
};
