import { ReactNode } from 'react'
import { DesktopSidebar } from '../DesktopSidebar'
import { MobileBottomNav } from '../MobileBottomNav'
import styles from './DashboardLayout.module.css'

type Props = {
    children: ReactNode
}

export const DashboardLayout = ({ children }: Props) => {
    return (
        <div className={styles.layout}>
            <DesktopSidebar />
            <main className={styles.content}>{children}</main>
            <MobileBottomNav />
        </div>
    )
}