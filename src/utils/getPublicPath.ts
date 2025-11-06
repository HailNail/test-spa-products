export const getPublicPath = (path: string) => {
  const basePath =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/test-spa-products")
      ? "/test-spa-products"
      : "";
  return `${basePath}${path}`;
};
