const express = require('express');
const path = require('path');
const posts = require('./routes/posts')
const PORT = process.env.PORT || 8000;


const logger = require('./middleware/logger')
const errorHandler = require('./middleware/error')
const app = express();


//Logger middleware
app.use(logger);


//Setup static folder
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));


app.use('/api/posts', posts);


// Error handler
app.use(errorHandler)
//Absolute routes
// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })


// app.get('/about', (req,res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// })


app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));