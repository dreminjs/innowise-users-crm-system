import { ThemeProvider } from "next-themes";
import "../styles/globals.css";
import { Roboto } from "next/font/google";
import { ApolloWrapper } from "@/application/ApolloWrapper";
import { NotificationList } from "@/modules/Notifications";

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
        <ApolloWrapper>
          <ThemeProvider enableSystem defaultTheme="system">
            {children}
            <NotificationList />
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
