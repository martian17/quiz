import fs from "fs";
import * as M_express from "express";
const express = M_express.default;
import {promises as fs} from "fs";
const app = express();


const respRecord = {
    data: JSON.parse(await fs.readFile("responses.json")),
    save(){
        fs.writeFileSync("responses.json",data);
    }
    store(uid,qid,result){
        const ts = Date.now()
        
    }
    get(uid,qid){
        return data.filter(d => 
            d.uid === uid &&
            d.qid === qid
        );
    }
    put(uid,qid,response){// response is a list of []
        data.push({uid,qid,response});
    }
}

const defaultQuizList = [
    {
        name: "Essen in Dungeon",
        id: "9cac9db4-231d-4db4-89bb-07739c395f20",
        data: JSON.parse(await fs.readFile("./dungeon.json"))
    }
];

const defaultUid = "87b87c96-32e7-4c71-92fb-f86d2f6095df";

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
    const uid = defaultUid;
    respRecord.store(uid,qid,result);
    res.send(200);
});

app.get("/api/quiz/result/:qid",(req,res)=>{
    const qid = req.params.qid;
    const uid = defaultUid;
    res.send(respRecord.get(uid,qid));
});

app.listen(5080,()=>{
    console.log("Listening to 5080");
});



