export const getPublicPath = (path: string): string => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const cleanBase = basePath.replace(/^\/|\/$/g, "");
  const cleanPath = path.replace(/^\//, "");

  if (!cleanBase) return `/${cleanPath}`;

  return `/${cleanBase}/${cleanPath}`;
};
