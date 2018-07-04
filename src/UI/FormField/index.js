import React from 'react';
// import './Form.css'





const FormField = (props) => {
    
    let label = props.label || null
    let onChange = props.onChange || null
    let type = props.type || null
    let autoFocus = props.autoFocus || null
    // let name = props.name || null
    let optional = props.optional ? ' (optional)' : null



    return (
        <React.Fragment>
            <label>{label}<span>{optional}</span></label>
            <input autoComplete='nope' placeholder={props.placeholder} onChange={onChange} type={type} autoFocus={autoFocus} name={props} />
        </React.Fragment>
    )
}


export default FormField;