import {DashboardLayout} from "@/layouts/dashboard/ui/DashboardLayout";
import {UsersPage} from "@/app/(dashboard)/users/UsersPage";

export default function UsersRoutePage() {
    return (
        <DashboardLayout>
            <UsersPage />
        </DashboardLayout>
    )
}