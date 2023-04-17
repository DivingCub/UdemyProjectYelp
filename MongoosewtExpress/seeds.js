const  mongoose = require('mongoose');
//get the default setting from the dsginated area
const Product = require('./models/product');

//专门用来存储seed 这类的事物。

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connection open!!")
})
.catch(err=>{
    console.log("Ho no error!!")
})

const p = new Product({
    name : 'Ruby Grapefruit',
    price: 1.99,
    category: 'fruit',
})

p.save().then(p=>{
    console.log(p);
})
.catch(e =>{
    console.log(e);
})

const seedProducts = [
{
    name:'Organic Goddess',
    price:4.99,
    category: 'fruit'
},
{
    name:'Organic Mini',
    price: 3.99,
    category: 'fruit'
},
{
    name: 'Chocolate Whole',
    price: 1.50,
    category: 'vegetable'
},
{
    name:'Fairy Eggplant',
    price: 1.00,
    category: 'fruit'
}
]

Product.insertMany(seedProducts)
.then(res =>{
    console.log(res);
}).catch(err =>{
    console.log(err);
})
//记住这种集中传输的模式，并且强化这种记忆