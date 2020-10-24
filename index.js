let express = require('express')
let socket = require('socket.io')
const path=require('path')
const localtunnel = require('localtunnel')

//App setup
let app = express()
app.set('view engine' , 'ejs')
app.use(express.static(path.join(__dirname,'public')))
let server = app.listen(5000,function(){
    console.log('Server Conected')
})

//Static files
// app.use(express.static('public'))



app.get('/',(req,res)=>{
    res.render('./index.ejs')
})

//Socket setup
let io = socket(server)

io.on('connection',(socket)=>{
    console.log(socket.id)

    socket.on('chat',(data)=>{
        io.sockets.emit('chat',{
            data:data,
            time: formatAMPM(new Date())
        })
    })

    socket.on('typing',(data) =>{
        socket.broadcast.emit('typing',data)
    })
})



//Geting Time
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  (async () => {
    const tunnel = await localtunnel({ port: 4000 ,subdomain:'webchatapp'});
    tunnel.url;
    tunnel.on('close', () => {
      // tunnels are closed
    });
  })(); 
