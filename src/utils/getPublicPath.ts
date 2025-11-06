export const getPublicPath = (path: string): string => {
  const isGitHubPages =
    typeof window !== "undefined"
      ? window.location.hostname === "hailnail.github.io"
      : false;

  const basePath = isGitHubPages ? "/test-spa-products" : "";

  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (!basePath) return `/${cleanPath}`;
  return `/${basePath}/${cleanPath}`;
};
