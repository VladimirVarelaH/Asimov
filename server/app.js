const express = require('express');
// Si se decidiera pasar a producción deberíamos setear el puerto
const port = process.env.PORT || 5000;

const app =  express();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asimov_node'
})


// Routes
app.route('/:date?')

.get((req, res)=>{
    const sql = `SELECT * FROM turns WHERE date=${req.params.date}`;
    connection.query(sql, (error, results)=>{
        if (error){
            res.send({"status":505});
        } else {
            let ocupated_hours = [];
            results.forEach(element => {
                if (element.date == req.params.date){
                    ocupated_hours[ocupated_hours.length] = element.hour;
                }
            });
            res.send({"status":200, "hours": ocupated_hours})
        }
    })
})
.post((req, res)=>{

    let day = new Date(req.body.date)
    day = day.getDay();

    // Valida que todos los campos estén completados
    if  (req.body.name && req.body.date && req.body.hour && req.body.email && 
        // Comprueba que la hora sea laborable y el día no sea fin de semana
        (req.body.hour >= 1 && req.body.hour <= 9) && (day!=5 && day != 6)){
        const data = {
            name: req.body.name,
            date: req.body.date,
            hour: req.body.hour,
            email: req.body.email,
        }
        // Se traen todas las citas de ese día
        connection.query (`SELECT * FROM turns WHERE date = '${data.date}'`, (error, results)=>{
            // Si ocurre un error en la Query
            if (error){
                res.send({"status": 505});
            } else {
                // Se crea un array con loas horas tomadas
                let validator = [];
                results.forEach(element => {
                    validator[validator.length] = element.hour;
                });
                // Se verifica si la hora está tomada
                if (validator.includes(Number(data.hour))){
                    res.send({"status":200});
                } else {
                    // Si no está tomada se insterta la hora en la DB
                    connection.query('INSERT INTO turns SET ?', data , (error)=> {
                        if (error){
                            res.send ({"status":505})
                        } else {
                            res.send ({"status":201});
                        }
                    })
                }
                
            }
        })
        
    }
        
});

//Check connection
connection.connect (error =>{
    if (error) throw error ;
    console.log('Database server running')
})

app.listen (port, ()=>{
    console.log (`Server running on port ${port}`);
})