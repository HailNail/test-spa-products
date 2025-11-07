import defaultImage from "@/assets/default.jpg";

export const validatePexelsImage = (url?: string): string | null => {
  const getDefaultThumbnail = () => defaultImage.src;

  if (!url || url.trim() === "") {
    return getDefaultThumbnail();
  }

  const trimmedUrl = url.trim();
  const pexelsRegex =
    /^https:\/\/images\.pexels\.com\/photos\/\d+\/[\w\-%]+\.((jpe?g)|(png)|(webp))(\?.*)?$/i;

  if (!pexelsRegex.test(trimmedUrl)) {
    alert(
      "Please enter a valid Pexels image URL or leave it empty for the default image."
    );
    return null;
  }

  return trimmedUrl;
};
