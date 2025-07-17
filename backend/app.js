const express = require("express");
const path = require("path");
const sequelize = require("./config/database");
const router = require("./routes/router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public')); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', router);

app.use('/' , (req, res) => {res.json({ message: "API funcionando!" })});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
});