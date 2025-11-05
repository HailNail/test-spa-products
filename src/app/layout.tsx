import "./globals.css";
import Header from "@/components/Header";
import MainProvider from "@/providers/MainProvider";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <MainProvider>
          <Header />
          {children}
        </MainProvider>
      </body>
    </html>
  );
}
