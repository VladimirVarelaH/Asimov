# Parte 1: El servidor
Como parte del proceso de amisión para [Asimov Consultores](https://asimov.cl/) se programó un servidor con la funcionalidad de agendar horas.  
## El stack
Para el servidor desidí ocupar JavaScript como lenguaje de programación, MySQL como base de datos y Expres como framework, la razón principal es que nunca había utilizado Expres o JavaScript para desarrollar una aplicación de servidor.  
## El funcionamiento
El funcionamiento inicial es que recibe un objeto JSON con el nombre del usuario, un correo de contacto, una fecha y una hora respresentada por un número entre el uno y el nueve (representando cada hora laborable del día).  
Al recibir la solicitud se valida que los campos no estén vacíos, que la hora sea laborable y que el día no sea fin de semana. Si todo esto es válido, se procede a revisar que el día no esté ocupado, si no lo está, procede a guardar el registro en base de datos.
### Las rutas
La aplicación cuenta con una sola ruta en el servidor, la ruta raíz, que a su vez puede ser accedida en por dos métodos:
* GET: Para solicitar las horas disponibles en un día en particular.
* POST: Para registrar una nueva hora.
### La validación
La primera capa de validaciones se hace del lado del cliente, pero, en el caso de que estas sean vulneradas, el servidor cuenta con otra capa de validaciones.  
Estas validaciones buscan identificar que la fecha introducida sea válida, esto se hace de la siguiente manera:
```javascript
// La primera validación es que los campos estén llenos con datos no nulos
if (req.body.name && req.body.date && req.body.hour && req.body.email &&
    // La segunda validación comprueba que el día sea un día de semana y en horario laboral
    (req.body.hour >= 1 && req.body.hour <= 9) && (day!=5 && day != 6) )
```
La intención era continuar con una validación de correo electrónico y repetir todos los chequeos del cliente, pero por temas de tiempo no fueron desarrolladas.
### El registro
Utilizando la librería de `mysql` se inicia solicitando todas las citas de el día introducido por el usuario en su solicitud, para confirmar que la hora está disponible; a continucación se procede a introducir un nuevo registro en la DB con los datos proporcionados por el cliente.
### La respuesta
Si el proceso de registro falla en cualquier momento, el servidor responde con un `{"status":505}`, en el caso de que la hora ya haya sido utilizada por otro usuario, se responde con un `{"status":200}` y, en el caso de que todo salga bien, se responde con un `{"status":201}`, significando que el registro fue creado en la DB.

## Las librerías
* **Body Parser**: Para el control de tipos.
* **Express**: Es el nucleo de la aplicación, la librería con la que desarrollamos las rutas.
* **Mysql**: Es el driver de conexión con la DB.
* **Cors**: Con esta librería configuramos la CORS policy del sitio, permitiendo las solicitudes desde el cliente.