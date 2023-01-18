const connectToMongo = require('./db')
const express = require('express');
const { use } = require('./routes/auth');
var cors = require('cors')


connectToMongo();
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json());

// routes...

app.use('/api/auth' , require('./routes/auth'))
app.use('/api/notes' , require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(port,()=>{
    console.log('listening on port ' + port)
})
