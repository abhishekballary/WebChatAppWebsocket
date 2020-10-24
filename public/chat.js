//Make connection

let socket = io.connect('http://192.168.0.30:4000')


//Selectors

let message = document.querySelector('#message'),
    handle = document.querySelector('#handle'),
    btn = document.querySelector('#send'),
    output = document.querySelector('#output'),
    feedback = document.querySelector('#feedback')

//Emit events

btn.addEventListener('click',function(){
    if(message.value && handle.value ){
        socket.emit('chat',{
            message:message.value,
            handle:handle.value
        })
        message.value = ""
    }else{
         message.value===''? message.style.border= '1px solid red':handle.style.border= '1px solid red'
         setTimeout(()=>{
            message.style.border= 'none' 
            handle.style.border= 'none'
         },1000)
        
    }
    
})


message.addEventListener('keypress',function(){
        socket.emit('typing',handle.value)
    
})

//Listen

socket.on('chat',(data)=>{
    feedback.innerHTML = ""
    if(data.data.handle===handle.value){
        output.innerHTML += `<div class='right'><p><strong>${data.data.handle}:</strong>${data.data.message}<br>${data.time}</p></div><br><br><br><br>`
    }else{
        output.innerHTML += `<div class='left'><p><strong>${data.data.handle}:</strong>${data.data.message}<br>${data.time}</p></div><br><br><br><br>`
    }      
})


socket.on('typing',(data) =>{
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`
})

document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.UserName==null){
        let uName = prompt('Enter your Name')
      localStorage.setItem('UserName',uName)
      let name=localStorage.getItem('UserName')
        handle.value=name
    }else{
        let name=localStorage.getItem('UserName')
        handle.value=name
    }
    
})