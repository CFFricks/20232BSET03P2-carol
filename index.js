const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE cats (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL , votes INT)");
  db.run("CREATE TABLE dogs (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL , votes INT)");
});

app.post('/cats', (req, res) => {
  const name = req.params.name;
    db.run(`INSERT INTO cats (name, votes) VALUES ('${name}', 0)`, function(err) {
      if(( name.length === 0)){
        res.status(500).send("Erro nome nao fornecido")
      }
      if (err) {
        res.status(500).send("Erro ao cadastrar cachorro");
      } else {
        res.status(201).json({ id: this.lastID, name, votes: 0 });
      }
    });


});

app.post('/dogs', (req, res) => {
  const name = req.params.name;
    db.run(`INSERT INTO dogs (name, votes) VALUES ('${name}', 0)`, function(err) {
      if(( name.length === 0)){
        res.status(500).send("Erro nome nao fornecido")
      }
      if (err) {
        res.status(500).send("Erro em cadastrar cachorro");
      } else {
        res.status(201).json({ id: this.lastID, name, votes: 0 });
      }
    });


});

app.post('/vote/:animalType/:id', (req, res) => {
  const animalType = req.params.animalType;
  const id = req.params.id;
  const verifica = (`SELECT id FROM ${animalType} WHERE id = ${id}`)
  db.get(verifica, (row) =>{
  if(!row){
      res.status(404).send("Nào cadastrado")
    }
    else{
      db.run(`UPDATE ${animalType} SET votes = votes + 1 WHERE id = ${id}`, function(erro){
        if(erro){
        res.status(500).send("Erro ao computar voto");
        }
        else{
        res.status(200).send("Voto computado");
        }
      });
    }
  
  }

)});

app.get('/cats', (req, res) => {
  db.all("SELECT * FROM cats", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar tabela de cachorros");
    } else {
      res.json(rows);
    }
  });
});

app.get('/dogs', (req, res) => {
  db.all("SELECT * FROM dogs", [], (err, rows) => {
    if (err) {
      res.status(500).send("Erro ao consultar tabela de cachorros");
    } else {
      res.json(rows);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Ocorreu um erro!');
});

app.listen(port, () => {
  console.log(`Cats and Dogs Vote app listening at http://localhost:${port}`);
});