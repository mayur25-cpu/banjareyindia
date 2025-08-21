"use client";

import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: { main: "#E67E22" },   // Sunset Orange
    secondary: { main: "#C0392B" }, // Heritage Red
    background: { default: "#FDF6E3" }, // Sand Beige
    text: { primary: "#2C3E50" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default function ThemeRegistry({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
