var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.json())

var dataFile = 'data.json';

app.get('/data', function(req, res){
   fs.readFile(dataFile, 'utf8', (err, data) =>{
    if(err){
        res.status(500).json({ error: "blad odczytu pliku json"});
        return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
   })
});

app.post('/data', (req, res) =>{
    fs.readFile(dataFile, 'utf8', (err, data) =>{
        if(err){
            res.status(500).json({error: 'blad odczytu pliku json'});
            return;
        }
        const jsonData = JSON.parse(data);
        jsonData.push(req.body);
        fs.writeFile(dataFile, JSON.stringify(jsonData), (err) =>{
            if(err){
                res.status(500).json({error : 'blad zapisus do pliku json'})
                return;
            }
            res.json({message: 'Dane zostaly dodane'})
        });
    });
});

app.delete('/data/:id', (req, res) =>{
    const id = req.params.id;
    fs.readFile(dataFile, 'utf8', (err, data)=>{
        if(err){
            res.status(500).json({error: 'blad odczytu pliku json'});
            return;
        }
        const jsonData = JSON.parse(data);
        const newData = jsonData.filter((item, index) => index != id);

        fs.writeFile(dataFile, JSON.stringify(newData), (err) =>{
            if(err){
                res.status(500).json({error : 'blad zapisu do pliku json'});
                return;
            }
            res.json({message: 'dane zostaly usuniete'});
        });
    });
});
const port = 3000;
app.listen(port, () =>{
    console.log("Serwer dziala na porcie 3000");
});
