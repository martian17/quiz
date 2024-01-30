import fs from "fs";
import * as M_express from "express";
const express = M_express.default;
import {promises as fs} from "fs";
const app = express();


const respRecord = {
    data: JSON.parse(await fs.readFile("responses.json"));
    save(){
        fs.writeFileSync("responses.json",data);
    }
    store(uid,qid,result){
        const ts = Date.now()
        
    }
    get(uid){
    }
}

const defaultQuizList = [
    {
        name: "Essen in Dungeon",
        id: "9cac9db4-231d-4db4-89bb-07739c395f20",
        data: JSON.parse(await fs.readFile("./dungeon.json"))
    }
];
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.json());

app.get("/api/quizList",(req,res)=>{
    res.send(defaultQuizList.map(d=>{
        return {
            name: d.name,
            id: d.id
        }
    }));
});

app.get("/api/quiz/:qid",(req,res)=>{
    res.send(defaultQuizList.filter(q=>{
        return q.id === req.params.qid
    }));
});

app.post("/api/quiz/result",(req,res)=>{
    const {qid,result} = req.body;
    // result: list[q,resp]
    const uid = "default_uid";
    respRecord.store();
});

app.listen(5080,()=>{
    console.log("Listening to 5080");
});



