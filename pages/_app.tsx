import "../styles/globals.css";
import type { AppProps } from "next/app";

import { SnackbarProvider } from "notistack";

// moment
import moment from "moment";
import "moment/min/locales";

moment.locale("es");

import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "../themes";
import { UIProvider } from "../context/ui";
import { EntriesProvider } from "../context/entries";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}

export default MyApp;
