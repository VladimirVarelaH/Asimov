import React from "react";

function FormSectionSelect (props){
    return (
        <select className="form-select" aria-label="Default select example" onChange={props.handler}>
          <option value="10">Seleccione una fecha</option>
          <option value="1">09:00 - 10:00</option>
          <option value="2">10:00 - 11:00</option>
          <option value="3">11:00 - 12:00</option>
          <option value="4">12:00 - 13:00</option>
          <option value="5">13:00 - 14:00</option>
          <option value="6">14:00 - 15:00</option>
          <option value="7">15:00 - 16:00</option>
          <option value="8">16:00 - 17:00</option>
          <option value="9">17:00 - 18:00</option>
        </select>
        
        )
}
export default FormSectionSelect;