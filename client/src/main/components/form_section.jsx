import React from "react";

function FormSection(props){
    return (
        <div className="form-floating mb-3 form_section">
            <input type={props.type} className="form-control form_section" id={props.id} placeholder={props.placeholder}
                name={props.name} onChange={props.handler} value={props.value}/>
            <label htmlFor={props.id}>{props.text}</label>
        </div>
    )
}

export default FormSection;