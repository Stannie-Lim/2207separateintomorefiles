const express = require('express');

const { conn } = require('./db');
const seed = require('./db/seed');

const app = express();
const path = require('path');
app.use(express.json());


app.use('/dist', express.static('dist'));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

// 2 args
// 1. the url
// 2. the routes that the url will be serving
app.use('/api', require('./router/api'));

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});


const start = async()=> {
  try {
    await conn.sync({ force: true });
    await seed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

start();

