const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("./models/Article");
const Article = mongoose.model('article');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin","http://localhost:3000")
    // aqui vc coloca quem pode acessar a API
    // se colocar "*" você permite todas as URL's
    // https://www.youtube.com/watch?v=gOuJE6d_l-U - nesse video tem a explicaçao de acesso
  res.header("Acess-Control-Methods","GET,PUT,POST,DELETE")
    //esses sao os metodos q a URL q solicita permissao pode utilizar
  app.use(cors);
  next();
});

mongoose.connect('mongodb://localhost/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB successfully connected");
  }).catch((erro) => {
    console.log("Error: MongoDB not connected!");
});

app.get("/", (req, res) => {
  Article.find({}).then((article) => {
    return res.json(article);
  }).catch((erro) => {
    return res.status(400).jason({
      error: true,
      message: "can not find an article!"
    })
  })
});

app.get("/article/:id",(req, res) => {
  Article.findOne({_id:req.params.id}).then((article) => {
    return res.json(article);
  }).catch((erro) => {
    return res.status(400).json({
      error: true,
      message: "Can not find any article"
    })
  })
});


app.post("/article", (req, res) => {
  const article = Article.create(req.body,(err) => {
    if(err) return res.status(400).json({
        error: true,
        message: "Error: Article not registred"
    })
      return res.status(200).json({
        error: false,
        message: " Article successfully registred"
    })
  })
});

app.put("/article/:id", (req, res) => {
  const article = Article.updateOne({_id: req.params.id }, req.body,(err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Can not edit it!"
    });
      return res.json({
        error: false,
        message: "successfully done!"
      })
  })
});

app.delete("/article/:id", (req, res) => {
    const article = Article.deleteOne({_id: req.params.id }, (err) => {
    if(err) return res.status(400).json({
      error: true,
      message: "Error: Can not delete it!"
    });
      return res.json({
        error: false,
        message: "successfully deleted!"
      })
  })
});


app.listen(3000, () => {
  console.log("Server started at door 3000: http://localhost:3000/")

})
