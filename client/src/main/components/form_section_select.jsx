import React from "react";

function FormSectionSelect (props){
    let hours = [
      {"value":1,"html":'09:00 - 10:00'},
      {"value":2,"html":'10:00 - 11:00'},
      {"value":3,"html":'11:00 - 12:00'},
      {"value":4,"html":'12:00 - 13:00'},
      {"value":5,"html":'13:00 - 14:00'},
      {"value":6,"html":'14:00 - 15:00'},
      {"value":7,"html":'15:00 - 16:00'},
      {"value":8,"html":'16:00 - 17:00'},
      {"value":9,"html":'17:00 - 18:00'}
    ]
    const hour_qtty = hours.length;
    props.ocupated.forEach(element => {
      for (let i = 0; i<hours.length; i++){
        // Delete de taken hours
        if (hours[i].value == element){
          hours.splice(i,1);
        }
      }
    });
    
    if (hours.length == 0){
      return (
        <select className="form-select" aria-label="Default select example" onChange={props.handler}>
          <option value="10">Todas las horas en esta fecha están ocupadas</option>
        </select>
      )
    } else {
      return (
        <select value={props.value} className="form-select form_section" aria-label="Default select example" onChange={props.handler}>
          <option value="10">Seleccione una fecha</option>
          {hours.map(element=>{
            return <option value={element.value} key={element.value}>{element.html}</option>
          })}
        </select>
      
      )
    }
}
export default FormSectionSelect;