import React from "react";

function FormSectionDate(props){
    //Se optiene la fecha actual para limitar el rango de elección entre los parámetros establecidos
    const current_date = new Date();
    let current_day = current_date.getDate();
    let current_month = current_date.getMonth() + 1;
    let current_year = current_date.getFullYear();

    return (
        <div className="form-floating mb-3 form_section">
            <input 
                value={props.value} type="date" className="form-control" id={props.id}
                min={`${current_year}-${current_month<=9 ? '0'+current_month:current_month}-${current_day}`}
                max={`${current_year}-${(current_month+1)<=9 ? '0'+(current_month+1):(current_month+1)}-${current_day}`}
                name={props.name} onChange={props.handler}
            />
            <label htmlFor={props.id}>{props.text}</label>
        </div>
    )
}

export default FormSectionDate;