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
      {testPaths.map((path) => (
        <div key={path}>
          <strong>Input:</strong> {path} →<strong>Output:</strong>
          {getPublicPath(path)}
        </div>
      ))}
    </div>
  );
}
