import styles from './loader.module.scss'

const Loader = () => {
    return (
        <div className={styles.backdrop}>
            <div class={styles.loading}>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
                <div class={styles.dot}></div>
            </div>
        </div>
    )
}

export default Loader