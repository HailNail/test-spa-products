export const validatePexelsImage = (url?: string): Promise<string | null> =>
  new Promise((resolve) => {
    const loadDefault = () =>
      import("./pexels").then(({ fetchPexelsImage }) =>
        fetchPexelsImage().then(resolve)
      );

    if (!url) {
      // empty → default image
      loadDefault();
      return;
    }

    if (!url.includes("pexels.com")) {
      alert("Only Pexels images are allowed. Please enter a valid Pexels URL.");
      resolve(null); // return null → stay on the page
      return;
    }

    const img = new Image();
    img.onload = () => resolve(url); // valid image → return URL
    img.onerror = () => {
      alert("Image URL is invalid. Please enter a valid Pexels URL.");
      resolve(null); // broken image → stay on the page
    };
    img.src = url;
  });
