import React from "react";

function FormSectionDate(props){
    //Se optiene la fecha actual para limitar el rango de elección entre los parámetros establecidos
    const currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();

    return (
        <div className="form-floating mb-3">
            <input type="date" className="form-control" id={props.id} min={`${cYear}-${cMonth<=9 ? '0'+cMonth:cMonth}-${cDay}`}
                max={`${cYear}-${(cMonth+1)<=9 ? '0'+(cMonth+1):(cMonth+1)}-${cDay}`} name={props.name} onChange={props.handler}/>
            <label htmlFor={props.id}>{props.text}</label>
        </div>
    )
}

export default FormSectionDate;