import {ELEM, CSS} from "htmlgen";
import {get, post, addBus} from "./util.mjs";


class Options extends ELEM{
    // list[label,value]
    static create(options){
        const op = new Options("div",{class:"options"});
        let selected;
        for(let [label,value] of options){
            const btn = op.add("div",{class: "diamond button"},label);
            btn.on("click",()=>{
                this.value = value;
                op.emit("select",value);
                if(selected)selected.e.classList.remove("selected");
                selected = btn;
                selected.e.classList.add("selected");
            });
        }
        return op;
    }
}

addBus(Options);

const topPage = async function(body){
    body.destroy();
    body.add("h1",0,"Bitte wählen Sie ein Quiz aus");
    const listWrapper = body.add("div");
    for(let {name,id} of await get("/quizList")){
        const item = listWrapper.add("div",{class:"itemButton diamond"});
        item.add("span",0,name);
        const button = item.add("div",{class:"button"},"Weiter");
        item.on("click",()=>{
            ctx.id = id;
            quizOptionPage(body);
        });
    }
}

const quizTop = 





// const ctx = {};
// 
// const quizOptionPage = async function(body){
//     console.log("loading quiz option page");
//     body.add("H1",0,"Bitte wählen Sie das Einstellung für das Quiz aus");
//     const wrapper = body.add("div",{class: "content-wrapper"},0,{display:"flex","align-items":"center","flex-direction": "column","gap":"1em"});
// 
//     const b1 = wrapper.add("div",{class: "sbox"});
//     b1.add("h2",{},"Wie lange willst du das Quiz sind?",{"text-align":"center",margin:"0px"});
//     let bereit = false;
//     const lengthE = b1.add(Options.create([["10",10],["20",20],["50",50],["100",100]]))
//     lengthE.on("select",(val)=>{
//         bereit = true;
//         ctx.length = val;
//         weiter.e.classList.remove("disabled");
//     });
// 
//     const weiter = wrapper.add("div",{class: "diamond button disabled"},"weiter");
//     weiter.on("click",()=>{
//         if(!bereit)return;
//         destroy();
//         quizPage(body);
//     });
//     const destroy = () => body.destroy();
// }
// 
// const createQuiz = function(data,size){
//     const words = data.sort(()=>Math.random()-0.5).slice(0,size);
//     let res = [];
//     for(let word of words){
//         const options = [word[1]];
//         for(let i = 0; i < 3; i++){
//             const idx = Math.floor(Math.random()*data.length);
//             r.options.push(data[idx][1]);
//         }
//         options.sort(()=>Math.random()-0.5);
//         res.push({
//             q: word[0],
//             a: word[1],
//             options
//         });
//     }
//     return res;
// }
// 
// const quizPage = async function(body){
//     console.log("loading quiz page");
//     const data = (await get(`/quiz/${ctx.id}`)).data;
//     const quiz = createQuiz(data,ctx.length);
//     const wrapper = body.add("div",{class:"diamond"});
//     const counter = wrapper.add("div",{class:"couter"});
//     const qf = wrapper.add("div",{class:"diamond"});
//     const afs = wrapper.add("div");
//     let score = 0;
//     const responses = [];
//     for(let i = 0; i < quiz.length; i++){
//         counter.setInner(`${score}/${i}/${ctx.length}`)
//         const frage = quiz[i];
//         qf.setInner(frage.q);
//         afs.destroy();
//         const btns = [];
//         for(let op of frage.options){
//             const btn = afs.add("div",{class:"diamond button"},op);
//             btn.on("click",()=>{
//                 answer(op);
//             });
//             btns.push(btn);
//         }
//         const answer = function(ans){
//             responses.push([frage,ans]);
//             for(let btn of buttons){
//                 btn.e.classList.add("disabled");
//             }
//             if(ans === frage.a){
//                 for(let i = 0; i < btns.length; i++){
//                     const btn = btns[i];
//                     btn.e.classlist.add("disabled");
//                     if(frage.options[i] === frage.a){
//                         btn.e.classlist.add("correct success");
//                     }
//                 }
//                 score++;
//             }else{
//                 for(let i = 0; i < btns.length; i++){
//                     const btn = btns[i];
//                     btn.e.classlist.add("disabled");
//                     if(frage.options[i] === frage.a){
//                         btn.e.classlist.add("correct");
//                     }else if(frage.options[i] === ans){
//                         btn.e.classList.add("wrong");
//                     }
//                 }
//                 wrongs.push([frage,ans]);
//             }
//         }
//     }
//     // log the response to the backend
//     // display the report page with the result
//     return responses;
// }
// 
// 
// const startPage = async function(body){
//     console.log(body);
//     body.add("h1",0,"Bitte wählen Sie ein Quiz aus");
//     // Liste der Quizze
//     const listWrapper = body.add("div");
//     const list = await get("/quizList");
//     console.log(list);
//     list.map(({name,id})=>{
//         const item = listWrapper.add("div",{class:"itemButton diamond"});
//         item.add("span",0,name);
//         const button = item.add("div",{class:"button"},"Weiter");
//         item.on("click",()=>{
//             destroy();
//             ctx.id = id;
//             quizOptionPage(body);
//         });
//     });
//     const destroy = () => body.destroy();
// }
// 
// startPage(ELEM.fromElement(document.body));
// //quizOptionPage(ELEM.fromElement(document.body));
// 
