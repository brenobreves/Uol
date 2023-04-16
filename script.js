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
}

const pegamsg = axios.get("https://mock-api.driven.com.br/api/vm/uol/messages");
pegamsg.then(exibeMsg);
function exibeMsg(resp){
    const msgList = document.querySelector('.container');
    msgList.innerHTML = "";
    msgArr = resp.data;
    msgArr.forEach(element => {
        
    });
}