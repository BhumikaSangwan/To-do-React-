import styles from './styles.module.css';

export default function Input(props)
{
    let {placeholder, value, onChange} = props
    return (
        <input 
        placeholder = {placeholder}
        value = {value}
        onChange = {onChange}
        className = {styles.container}
        />
    )
}