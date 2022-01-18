import React from 'react';

function Alert(props){

    if (!props.type) {
        return (
            <>
            </>
        );
    } else if (props.type == 505) {
        return (
            <div className="alert alert-danger" role="alert">
                Un error ocurió en el servidor, lo sentimos. <br/>
                Vuelve a intentarlo en unos minutos.
            </div>
        )
    } else if (props.type == 201) {
        return (
            <div className="alert alert-success" role="alert">
                La cita fue agendada!. <br/>
                Muchas gracias, espera a la muerte en la hora acordada.
            </div>
        )
    } else if (props.type == 200) {
        return (
            <div className="alert alert-warning" role="alert">
                Lo sentimos, la hora fue agendada por otro usuario <br/>
                La muerte es un ser ocupado, te recomendamos intentar nuevamente con una nueva cita.
            </div>
        )
    } else if (props.type == 1) {
        return (
            <div className="alert alert-warning" role="alert">
                Lo sentimos, la muerte no trabaja fines de semana <br/>
                Hasta los espíritus necesitan descansar, agenda una hora en un día de semana.
            </div>
        )
    } else if (props.type == 2) {
        return (
            <div className="alert alert-warning" role="alert">
                Por favor revisa que <b>todos los campos estén completados</b> <br/>
                La muerte es muy meticulosa, chequea bien la información.
            </div>
        )
    } else if (props.type == 3) {
        return (
            <div className="alert alert-dark" role="alert">
                Hubo un problema, la información no cumple con el formato <br/>
                Hay personas que intentan ser más listas que la muerte... que lo intentan.
            </div>
        )
    }

}
export default Alert;