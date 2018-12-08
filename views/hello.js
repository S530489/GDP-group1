const  http  =  require('http')
const  port  =8888
const  server  = http.createServer(function (req,  res) 
 {  res.statusCode =200       ]
    res.setHeader('Content-Type',  'text/plain')
    res.end('Hello,  Web  Server!\n')
})
    server.listen(port)