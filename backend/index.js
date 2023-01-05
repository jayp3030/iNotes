const connectToMongo = require('./db')
const express = require('express');
const { use } = require('./routes/auth');

connectToMongo();
const app = express();
const port = 5000;

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
