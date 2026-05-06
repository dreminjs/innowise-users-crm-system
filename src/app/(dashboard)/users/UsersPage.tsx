'use client'

import { useQuery } from '@apollo/client/react'
import { GET_USERS } from '@/modules/Users/api/queries'
import { UsersSearch } from '@/modules/Users/ui/UsersSearch'
import { UsersTable } from '@/modules/Users/ui/UsersTable'
import styles from './UsersPage.module.css'

export const UsersPage = () => {
    const { data, loading, error } =
        useQuery(GET_USERS)
    if (loading) {
        return (
            <div className={styles.state}>
                Loading...
            </div>
        )
    }
    if (error) {
        return (
            <div className={styles.state}>
                {error.message}
            </div>
        )
    }
    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>
                    Employees
                </h1>
            </div>
            <UsersSearch />
            <UsersTable users={data?.users ?? []} />
        </section>
    )
}