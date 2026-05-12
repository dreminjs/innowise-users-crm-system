import "../styles/globals.css";
import { Roboto } from "next/font/google";
import { ApolloWrapper } from "@/application/ApolloWrapper";
import { NotificationList } from "@/modules/Notifications";
import { Provider } from "@/components/ui/provider";
import { ThemeProvider } from "next-themes";
import { NextIntlClientProvider } from "next-intl";
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
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <ApolloWrapper>
              <Provider>
                <NotificationList />
                {children}
              </Provider>
            </ApolloWrapper>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
