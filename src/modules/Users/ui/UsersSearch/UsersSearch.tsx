import styles from './UsersSearch.module.css'

export const UsersSearch = () => {
    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="text"
                placeholder="Search employee"
            />
        </div>
    )
}