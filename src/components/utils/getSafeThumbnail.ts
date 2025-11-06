// utility to get safe image
export const getSafeThumbnail = (thumbnail: string | null) => {
  return (
    thumbnail ?? "https://www.pexels.com/photo/pine-forest-bottle-3270223/"
  ); // default Pexels image
};
