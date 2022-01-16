# Parte 1: El servidor
Como parte del proceso de amisión para [Asimov Consultores](https://asimov.cl/) se programó un servidor con la funcionalidad de agendar horas.  
## El stack
Para el servidor desidí ocupar JavaScript como lenguaje de programación, MySQL como base de datos y Expres como framework, la razón principal es que nunca había utilizado Expres o JavaScript para desarrollar una aplicación de servidor.  
## El funcionamiento
El funcionamiento inicial es que recibe un objeto JSON con el nombre del usuario, un correo de contacto, una fecha y una hora respresentada por un número entre el uno y el nueve (representando cada hora laborable del día).  
Al recibir la solicitud se valida que los campos no estén vacíos, que la hora sea laborable y que el día no sea fin de semana (*por desarrollar*).  

## To do
* Validar que el día no sea fin de semana.
* *Opcional*: Desarrollar una API para mostrar al usuario qué días están disponibles.
