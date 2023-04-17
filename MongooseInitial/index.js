const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movieApp',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connection open!!")
})
.catch(err=>{
    console.log("Ho no error!!")
})

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
//   console.log("CONNECTION OPEN!!!")
// });


const movieSchema = new mongoose.Schema({
    title: String, 
    year:Number, 
    score:Number, 
    rating:String, 
});

const Movie = mongoose.model('Movie', movieSchema);
//有点类似于Java的
const amadeus = new Movie({title:'Ammas',year:1986,score:9.2,rating:'R'})




