const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
//把这个规定好的schema类给导入过来
const {places,descriptors} = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true, useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database Connection");
})

const sample = (array)=> array[Math.floor(Math.random()*array.length)]


const seedDB = async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const priceInput = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description: 'Something is getting more exciting!',
            price: priceInput
            
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})