"use client";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ReduxProvider } from "./Provider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "@/redux/store";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
export default MainProvider;
