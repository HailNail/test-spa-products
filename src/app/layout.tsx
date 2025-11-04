import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { ReduxProvider } from "@/redux/Provider";
import Header from "@/components/Header";

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
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
