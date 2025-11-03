import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";

export const metadata = {
  title: "Product SPA",
  description: "Single Page Application with Next.js + Redux + TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
