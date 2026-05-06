import { GetUsersQuery } from '@/graphql/graphql'
import styles from './UsersTableRow.module.css'

type Props = {
    user: GetUsersQuery['users'][number]
}

export const UsersTableRow = ({ user }: Props) => {
    const firstName =
        user.profile.first_name ?? ''
    const lastName =
        user.profile.last_name ?? ''
    const initials = `
    ${firstName[0] ?? ''}
    ${lastName[0] ?? ''}
  `
    return (
        <div className={styles.row}>
            <div className={styles.userInfo}>
                {user.profile.avatar ? (
                    <img
                        className={styles.avatarImage}
                        src={user.profile.avatar}
                        alt={firstName}
                    />
                ) : (
                    <div className={styles.avatar}>
                        {initials}
                    </div>
                )}
                <div className={styles.userContent}>
                    <div className={styles.name}>
                        {firstName} {lastName}
                    </div>

                    <div className={styles.mobileEmail}>
                        {user.email}
                    </div>
                </div>
            </div>
            <div className={styles.email}>
                {user.email}
            </div>
            <div className={styles.department}>
                {user.department_name ?? '-'}
            </div>
            <div className={styles.position}>
                {user.position_name ?? '-'}
            </div>
        </div>
    )
}