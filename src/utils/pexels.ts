const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_KEY;
const PEXELS_BASE_URL = "https://api.pexels.com/v1";

export const fetchPexelsImage = async (query?: string): Promise<string> => {
  const searchQuery = query?.trim() || "technology"; // default category
  try {
    const res = await fetch(
      `${PEXELS_BASE_URL}/search?query=${searchQuery}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY || "",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Pexels image");

    const data = await res.json();
    const photo = data.photos?.[0];

    return (
      photo?.src?.medium ||
      "https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg"
    ); // fallback
  } catch (err) {
    console.error(err);
    return "https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg"; // fallback
  }
};
