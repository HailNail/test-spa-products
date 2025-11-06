// components/PathTest.tsx
"use client";

import { getPublicPath } from "@/utils/getPublicPath";

export default function PathTest() {
  const testPaths = [
    "/images/default.jpg",
    "images/default.jpg",
    "default.jpg",
  ];

  return (
    <div>
      <h3>Path Test (NODE_ENV: {process.env.NODE_ENV})</h3>
      <p>BASE_PATH: {process.env.NEXT_PUBLIC_BASE_PATH}</p>
      {testPaths.map((path) => (
        <div key={path}>
          <strong>Input:</strong> {path} →<strong>Output:</strong>
          {getPublicPath(path)}
        </div>
      ))}
    </div>
  );
}
