import { Navigation } from "@/components/Navigation";
import { userNavigation } from "@/modules/Users/model/user.navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navigation items={userNavigation} />
      {children}
    </div>
  );
}
