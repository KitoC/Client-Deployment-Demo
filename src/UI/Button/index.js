import React from 'react';
import styles from './styles.module.css'


const Button = (props) => {
    return (
        <React.Fragment>
            <button className={styles.button} id="submit">{props.text}</button>
        </React.Fragment>
    )
}

export default Button;