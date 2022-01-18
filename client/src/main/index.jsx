import React, {useImperativeHandle, useState, useEffect} from 'react';

import Button from './components/button.jsx';
import FormSection from './components/form_section.jsx';
import FormSectionDate from './components/form_section_date.jsx';
import FormSectionSelect from './components/form_section_select.jsx';

const axios = require ('axios');

function Form(){
    const [data, setData] = useState({});
    const [date, setDate] = useState('');
    const [aviable_hours, setAviableHours] = useState([]);

    //Cuando se actualice la fecha se actualizarán las horas disponibles para ese día
    useEffect(() => {
        if (data['date']){
            // axios.get('localhost:5000/'
            // ).then(res=>{
            //     console.log(res)
            // }).catch(err=>{
            //     console.log(err)
            // })
            console.log([1,3,4]);
        }
    }, [date]);

    function sendHandler(event){
        event.preventDefault();
        console.log(data);
    }

    function dataHandler(event){
        let newData = {... data};
        newData[event.target.name] = event.target.value;
        setData(newData);
    }
    
    function handleDate(event){
        const current_date = new Date(event.target.value);
        const day = current_date.getDay();

        if (day == 5 || day == 6){
            alert ('Fecha inválida\nLa fecha sólo puede ser un día de semana');
            event.target.value = "";
        } else {
            setDate(event.target.value)
            let newData = {... data};
            newData['date'] = event.target.value;
            setData(newData);
        }
        
    }

    function handleSelect(event){
        let newData = {... data};
        newData['hour'] = event.target.value;
        setData(newData);
    }

    return (
        <>
            <h1>Reserva tu hora con la muerte</h1>
            <FormSection id="name" type="text" placeholder="Introduce tu nombre" 
            name="name" text="Nombre" handler={dataHandler}/>

            <FormSection id="email" type="email" placeholder="Introduce tu correo" 
            name="email" text="Correo Electrónico" handler={dataHandler}/>

            <FormSectionDate id="date" placeholder="DD-MM-YY" 
            name="date" text="Fecha Deseada" handler={handleDate}/>

            <FormSectionSelect handler={handleSelect}/>

            <Button handler={sendHandler} text="Agendar mi cita"/>
        </>
    )
}

export default Form;