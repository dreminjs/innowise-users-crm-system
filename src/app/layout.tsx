import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={roboto.className} lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
