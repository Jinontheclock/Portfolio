import express from 'express'
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
let app = express();
let message;
app.use(express.urlencoded({extended:true}));

function logger(req, res, next){
    console.log(req.method);
    console.log(req.url);
    next();
}

app.use(logger);

function output(req, res, next){
    message = `<h3>Hi, ${req.body.na}, your email is ${req.body.ema}</h3>`;
    next();
}
app.use(output);

app.get('/',(req,res)=>{
    res.send(__dirname+'/index.html')
})  

app.get('/about',(req,res)=>{
    res.send('<h1>About Page!</h1>');
})  // route or endpoint

app.post('/login',(req, res)=>{
    console.log(req.body);
    res.sendStatus(200);
})

app.post('/submit',(req,res)=>{
    res.send(message)

})


app.listen(3000, ()=>{
    console.log("Our express server is running on port 3000!")
})