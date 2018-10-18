(function(){

const nameInput = document.getElementById('nameInput');
const nickNameInput = document.getElementById('nickNameInput');
const nameButton = document.getElementById('nameButton');
const allMessages = document.getElementById('allMessages');
const messageInput = document.getElementById('messageInput');
const sendMessage = document.getElementById('sendMessage');
const allUsers = document.getElementById('usersList');

let name = 'Name';
let nickName = 'NickName'; 
 
nameButton.onclick = () => {
   name = nameInput.value || 'Name';
   nickName = nickNameInput.value || 'NickName';
   const info = {
   name: name,
   nickName: nickName
    };
    nameInput.value = '';
    nickNameInput.value = '';
   ajaxRequest({
    method:'POST',
    url:'/allUsers',
    data:info
});
};
   
sendMessage.onclick = () => {
    var timestamp =  new Date();
    var data = {
    name: name,
    nickName: nickName,
    text: messageInput.value,
    'timestamp': timestamp
    };
    
    messageInput.value = '';
      
    ajaxRequest({
        'method':'POST',
        'url':'/allMessages',
        'data':data
    });
};

 
 
const ajaxRequest = (options) => {
  const url = options.url || '/';
  const method = options.method || 'GET';
  const callback = options.callback || function(){};
  const data = options.data || {};
  const xmlHttp = new XMLHttpRequest();

  xmlHttp.open(method, url, true);
  xmlHttp.setRequestHeader('Content-Type', 'application/json');
  xmlHttp.send(JSON.stringify(data));

  xmlHttp.onreadystatechange  = () => {
      if( xmlHttp.readyState === 4 && xmlHttp.status == 200) {
        callback(xmlHttp.responseText);
      }
  };
};

 


var getData = function(){
    ajaxRequest({
        method:'GET',
        url:'/allMessages',
        callback: function(msg){

            
            msg = JSON.parse(msg);
            allMessages.innerHTML = '';
            for(var i in msg){
                if (msg.hasOwnProperty(i)){
                    var time = new Date(msg[i].timestamp);
                    var element = document.createElement('div');
                    element.setAttribute ('class', 'element');
                    element.setAttribute ('id', 'message-placeholder');
                    var messageText = document.createElement('span');
                    messageText.setAttribute('class', 'message-text');
                    messageText.innerText = msg[i].text; 
                    var messageCreator = document.createElement('span'); 
                    messageCreator.setAttribute('class', 'creator');
                    messageCreator.innerText = msg[i].name + '(@'+msg[i].nickName + ')' ; 
                    var timestamp = document.createElement('span'); 
                    timestamp.setAttribute ('class', 'time');
                    timestamp.innerText = time.getHours()+':'+time.getMinutes()+':'+time.getSeconds();
                    var wrapper = document.createElement('div');
                    wrapper.setAttribute('class', 'wrapper');
                    allMessages.appendChild(element);
                    element.appendChild(wrapper);
                    wrapper.appendChild(messageCreator);
                    wrapper.appendChild(timestamp); 
                    element.appendChild(messageText);
                     
                    if(msg[i].text.includes('@'+ nickName)){
                     element.style.background = '#99ff99';
                     };
          
                     
                     
                }
            }
        }
    });
};

var getNames = function(){
    ajaxRequest({
        method:'GET',
        url:'/allUsers',
        callback: function(entry){
            entry = JSON.parse(entry);
            allUsers.innerHTML = '';
            for(var i in entry){
                if (entry.hasOwnProperty(i)){
                    var userInList = document.createElement('li');
                    userInList.innerText = entry[i].name + '(@'+entry[i].nickName +')';
                    allUsers.appendChild(userInList); 
                }
            }
        }
    });
};
 
 
getData();
getNames();
 

setInterval(function(){
    getData();
}, 1000);
setInterval(function(){
    getNames();
}, 1000); 


})();