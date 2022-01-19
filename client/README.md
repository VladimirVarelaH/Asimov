# Parte 2: Cliente
Se desarrolló un cliente para consumir la API desarrollada en la parte 1.  

## Funcionamiento
El funcionamiento principal es el de un formulario clásico de React, con validación de los datos para segurar que nadie ingrese datos inválidos y un sistema de alertas para informar al usuario sobre el estado de su solicitud.
### La validación de datos
El formulario cuenta con una fuerte validación de datos, con una primera de capa desde el HTML, en el que se marcan los tipos de input y los máximos o mínimos en el `input type=date`.  
La segunda capa de validación es a través del JavaScript, que impide que el usuario envíe el formulario sin completar todos los campos y presta principal atención a la validación de la fecha, revisando que ni el mes, ni el día ni el año rompan las normas:
* El usuario sólo puede agendar una hora dentro del mes corriente.
* El mes crriente es a partir de hoy, es decir, desde el 18-01-2022 hasta el 18-02-2022.
Para esto la función que envía los datos valida de la siguiente manera:
```javascript
if (
    // Si el mes es diciembre
    (current_month == 12 && (
        // En ese caso el mes puede ser 12 y el día mayor o igual que hoy 
        // O el mes puede ser 1 (enero) y el día menor o igual que hoy
        ((date[1]== 12 && date[2] >= current_day) || (date[1]==1 && date[2] <= current_day)))
        // Y el año puede ser el año presente o el próximo
        && (date[0] == current_year || date[0] == current_year+1)
    )
    // O si el mes no es diciembre
    || (current_month != 12 && (
        // En este caso el mes puede ser igual al mes presente y el día igual o mayor
        // O el día puede ser mayor por uno al mes presente  y el día menor o igual al día presente
        ((date[1] == current_month && date[2] >= current_day) || (date[1] == current_month+1 && date[2]<= 
        current_day)) 
        // Por último, si el mes no es diciembre, el año debe ser el mismo que el presente
        && date[0]==current_year)

    )
)
```
Esta es, por mucho, la parte más difícil de leer del código, pero busca ser una validación exahustiva.  
Se buscó añadir una validación de corro electrónico, pero en post del tiempo no se incluyó.
### La solicitud
Luego de la validación de los datos, el programa procede a enviar la solicitud al servidor mediante Axios. En base a la respuesta del servidor (505, 200 ó 201) envía esta al sistema de alertas de la aplicación.  
### El sistema de alertas 
Dependiendo de las acciones del usuario, el programa despliega una de sus seis alertas:
* Caso I: El susario no completó todos los datos.
* Caso II: El usuario intentó enviar una fecha inválida modificando el HTML.
* Caso III: El usuario seleccinó un día de fin de semana.
* Caso IV: El servidor respondió con un 505, es decir, algo falló con la DB.
* Caso V: EL servidor respondió con un 200, es decir, el registro no fue posible por la hora seleccionada.
* Casp VT: El servidor respondió con un 201, es decir, todo en ordem.

## Las librerías
* **React**: Es el nucleo de nuestra aplicación, con esta librería desarrollamos los componentes del cliente.
* **Axios**: Con esta librería se gestionaron las solicitudes a las rutas del servidor.
* **Bootstrap**: Con esta librería se aceleró el desarrollo de los estilos del cliente, la librería no se instaló localmente, si no que se solicitó en la ruta que se muestra en el sitio web de Bootstrap.