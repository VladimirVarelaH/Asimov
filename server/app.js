const express = require('express');
// Si se decidiera pasar a producción deberíamos setear el puerto
const port = process.env.PORT || 3000;

const app =  express();
const bodyParser = require('body-parser');
app.use(bodyParser.json())

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'asimov_node'
})


// Routes
app.route('/')
.get((req, res)=>{
    res.send('data')
})
.post((req, res)=>{
        // Valida que todos los campos estén completados
        if  (req.body.name && req.body.date && req.body.hour && req.body.email && (req.body.time >= 1 && req.body.time <= 9)){

            const data = {
                name: req.body.name,
                date: req.body.date,
                hour: req.body.hour,
                email: req.body.email,
            }

            connection.query (`SELECT * FROM turns WHERE date = ${data.date}`, (error, results)=>{
                if (error){
                    res.send(error);
                } else {
                    let validator = [];
                    results.forEach(element => {
                        validator[validator.length] = element.hour;
                    });
                    if (validator.includes(data.hour)){
                        res.send('200')
                    } else {
                        connection.query('INSERT INTO turns SET ?', data , (error, results, fields)=> {
                            if (error){
                                res.send (error)
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