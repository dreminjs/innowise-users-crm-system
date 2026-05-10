import { Header } from "@/components/Header";
import { DashboardLayout } from "@/layouts/dashboard/ui/DashboardLayout";
type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <DashboardLayout>
      <Header />
      {children}
    </DashboardLayout>
  );
}
