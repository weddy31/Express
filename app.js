const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: '123' 
});

connection.connect((err) => {
  if (err) {
    console.error('Błąd połączenia z bazą danych: ' + err.message);
  } else {
    console.log('Połączono z bazą danych MySQL');
  }
});

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM dane', (err, results) => {
    if (err) {
      console.error('Błąd zapytania SQL: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania SQL', details: err.message });
      return;
    }

    res.json(results);
  });
});

app.post('/data', (req, res) => {
  const { field1, field2 } = req.body; // Zakładając, że dane są przekazywane jako JSON: { "field1": "wartosc1", "field2": "wartosc2" }

  connection.query('INSERT INTO dane (id, kolumna_123321) VALUES (?, ?)', [field1, field2], (err, results) => {
    if (err) {
      console.error('Błąd zapytania SQL: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania SQL', details: err.message });
      return;
    }

    res.json({ message: 'Dane zostały dodane' });
  });
});

app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM dane WHERE id = ?', id, (err, results) => {
    if (err) {
      console.error('Błąd zapytania SQL: ' + err.message);
      res.status(500).json({ error: 'Błąd zapytania SQL', details: err.message });
      return;
    }

    res.json({ message: 'Dane zostały usunięte' });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('Serwer działa na porcie 3000');
});

