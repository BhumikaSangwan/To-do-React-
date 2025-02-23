import styles from './styles.module.css';

export default function Button(props)
{
    let { onClick, children} = props;
    return (
        <button onClick = {onClick} className={styles.container}> {children} </button>
    )
}