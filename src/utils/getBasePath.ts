export const getBasePath = () => {
  if (typeof window === "undefined") return "";
  return window.location.pathname.includes("/test-spa-products")
    ? "/test-spa-products"
    : "";
};
