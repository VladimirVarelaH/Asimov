import React, {useImperativeHandle, useState, useEffect} from 'react';

import Button from './components/button.jsx';
import FormSection from './components/form_section.jsx';
import FormSectionDate from './components/form_section_date.jsx';
import FormSectionSelect from './components/form_section_select.jsx';

const axios = require ('axios');

function Form(props){

    const [data, setData] = useState({"name":"", "email":"", "date":"", "hour":""});
    const [date, setDate] = useState('');
    const [ocupated_hours, setOcupatedHours] = useState([]);

    const current_date = new Date();

    let current_day = current_date.getDate();
    let current_month = current_date.getMonth() + 1;
    let current_year = current_date.getFullYear();


    //Cuando se actualice la fecha se actualizarán las horas disponibles para ese día
    useEffect(() => {
        if (data['date']){
                axios.get('http://localhost:5000/'+date
            ).then(res=>{
                console.log(res.data)
                if (res.data.status == 200){
                    setOcupatedHours(res.data.hours)
                }
            }).catch(err=>{
                console.log(err);
            })
           
        }
    }, [date]);

    function sendHandler(event){
        event.preventDefault();
        let date = data.date.split('-');
        // Valida que todos los campos sean válidos
        if (data.name && data.email && data.date && data.hour && data.hour < 10){
            // Valida que los datos no hayan sido manipulados
            if ( (current_month == 12 && (((date[1]== 12 && date[2] >= current_day) || (date[1]==1 && date[2] <= current_day)) && (date[0] == current_year || date[0] == current_year+1))) ||
            (current_month != 12 && (((date[1] == current_month && date[2] >= current_day) || (date[1] == current_month+1 && date[2]<= current_day)) && date[0]==current_year)) ){
                axios.post(
                    'http://localhost:5000/',
                    data
                ).then(res=>{
                    props.handler(res.data.status);
                    setData({"name":"", "email":"", "date":"", "hour":""});
                }).catch(err=>{
                    console.log(err);
                });
            } else {
                props.handler(3);
            }
        } else {
            props.handler(2);
        }

    }

    function dataHandler(event){
        let new_data = {... data};
        new_data[event.target.name] = event.target.value;
        setData(new_data);
    }
    
    function handleDate(event){
        const current_date = new Date(event.target.value);
        const day = current_date.getDay();

        if (day == 5 || day == 6){
            props.handler(1);
            event.target.value = "";
        } else {
            setDate(event.target.value);
            let new_data = {... data};
            new_data['date'] = event.target.value;
            setData(new_data);
        }
        
    }

    function handleSelect(event){
        let new_data = {... data};
        new_data['hour'] = event.target.value;
        setData(new_data);
    }

    return (
        <main id="main">

            <FormSection value={data.name} id="name" type="text" placeholder="Introduce tu nombre" 
            name="name" text="Nombre" handler={dataHandler}/>

            <FormSection value={data.email} id="email" type="email" placeholder="Introduce tu correo" 
            name="email" text="Correo Electrónico" handler={dataHandler}/>

            <FormSectionDate value={data.date} id="date" placeholder="DD-MM-YY" 
            name="date" text="Fecha Deseada" handler={handleDate}/>

            <FormSectionSelect handler={handleSelect} ocupated={ocupated_hours}/>

            <Button handler={sendHandler} text="Agendar mi cita"/>
        </main>
    )
}

export default Form;