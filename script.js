axios.defaults.headers.common['Authorization'] = '9maaDDkKFQ1saSPY3udlpWmT';
let username = prompt("Digite seu nome?");
login();
function login(){
    while(username == null || username == ""){
        username = prompt("Por favor digite algum nome.");
    }
    let userObj = {name: `${username}`};
    let reqLogin = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', userObj);
    reqLogin.then(loginOk);
    reqLogin.catch(relog);
}
function relog(){
    username = prompt("Esse não é valido ou já está sendo utilizado, por favor digite outro nome.");
    login();
}
function loginOk(){
    alert("Login OK");
    const buton = document.querySelector('button');
    buton.disabled = false;
}
const notifyActive = setInterval(manterAtivo, 5000);
function manterAtivo(){
    let userObj = {name: `${username}`};
    let reqStatus = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', userObj);
}
function reload() {
    window.location.reload();
}
const pegamsg = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");
pegamsg.then(exibeMsg);
function exibeMsg(resp){
    const msgList = document.querySelector('.container');
    msgList.innerHTML = "";
    msgArr = resp.data;
    console.log(msgArr[99]);
    for(let i = 0 ; i < 100 ; i++){
        if(msgArr[i].type == "status"){
            msgList.innerHTML += `<div class="msg status" data-test="message" ><span class="time">${msgArr[i].time}</span> <span class="fromto">${msgArr[i].from}</span><span class="texto"> ${msgArr[i].text}</span></div>`;
            continue
        }
        msgList.innerHTML += `<div class="msg" data-test="message" ><span class="time">${msgArr[i].time}</span> <span class="fromto">${msgArr[i].from}</span> <span class="texto"> para </span> <span class="fromto">${msgArr[i].to}</span><span class="texto">: ${msgArr[i].text}</span></div>`;
    }
}
const attpag = setInterval(attMsg, 3000);
function attMsg(){
    const attmsg = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");
    attmsg.then(exibeMsg);
}
function sendmsg(){
    const inputmsg = document.querySelector('input')
    let msgtxt = inputmsg.value;
    let msgObj = {from: `${username}`, to: "Todos", text: `${msgtxt}`, type: "message"};
    let reqMsg = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', msgObj);
    reqMsg.then(attMsg);
    reqMsg.catch(reload);
    inputmsg.value = null;
}