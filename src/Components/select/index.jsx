import styles from "./styles.module.css";
// import styles from './styles.module.css';

export default function Select({ value, onChange }) {
    return (
            <select className={styles.container} value={value} onChange={onChange}>
                <option value="All">All</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
            </select>
    )
    
}