import React from "react";

function FormSection(props){
    return (
        <div className="form-floating mb-3">
            <input type={props.type} className="form-control" id={props.id} placeholder={props.placeholder}
                name={props.name} onChange={props.handler}/>
            <label htmlFor={props.id}>{props.text}</label>
        </div>
    )
}

export default FormSection;