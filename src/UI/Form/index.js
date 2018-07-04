import React from 'react';
import Button from './../Button';
import styles from './styles.module.css'





const Form = (props) => {
    const { onSubmit, buttonText, title } = props

    return(
        <React.Fragment>
            <form className="form" onSubmit={onSubmit}>
                <h3>{title}</h3>
                { props.children }
                <div className={styles.submitBox}>
                    <Button className={styles.formButton} text={buttonText} />
                    {/* <p onClick={cancel}>Cancel</p> */}
                </div>
                    
            </form>
        </React.Fragment>
    )
}


export default Form;