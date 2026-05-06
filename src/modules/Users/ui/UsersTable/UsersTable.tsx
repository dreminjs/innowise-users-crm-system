import { GetUsersQuery } from '@/graphql/graphql'
import { UsersTableRow } from './UsersTableRow'
import styles from './UsersTable.module.css'

type Props = {
    users: GetUsersQuery['users']
}

export const UsersTable = ({ users }: Props) => {
    if (!users.length) {
        return (
            <div className={styles.empty}>
                No users found
            </div>
        )
    }
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.table}>
                <div className={styles.header}>
                    <div>User</div>
                    <div className={styles.email}>
                        Email
                    </div>
                    <div>Department</div>
                    <div>Position</div>
                </div>
                <div className={styles.body}>
                    {users.map(user => (
                        <UsersTableRow
                            key={user.id}
                            user={user}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}