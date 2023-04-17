const express  = require('express');
const app = express();
const path = require('path');
const  mongoose = require('mongoose');
//get the default setting from the dsginated area
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connection open!!")
})
.catch(err=>{
    console.log("Ho no error!!")
})


// app.set('views',path.join(__dirname, 'views'));
app.set('views engine', 'ejs');
app.use(express.urlencoded({extended:true}))

app.get('/dog',(req,res)=>{
    res.send('WOOF');
})

app.get('/products', async (req,res)=>{
    const products = await Product.find({});
    console.log(products);
    // res.send('info includes products');
    // res.render('views/products/index')
    // res.render(path.resolve(__dirname + "/views/index"));
    res.render(path.join(__dirname+'/views/index.ejs'),{products})
    //把默认初始的值去除掉，然后用这个对应绝对路径下的文件
   //把想要传输的内容放置到{}之中
})

app.get('/products/new',  (req, res)=>{
    res.render(path.join(__dirname+'/views/new.ejs'));
})

app.post('/products', (req, res)=>{
    // console.log(req.body);
    const newProduct = new Product(req.body);
    newProduct.save();
    // res.send('Making your product')
    //你看这里如何导航换到新的位置上面去的
    res.redirect(`/products/${newProduct._id}`)
})
//information could be directly posted to other place

app.get('/products/:id', async(req,res)=>{
    const{id} = req.params;
    //记住，用req里面的东西来取参数设置
    //只要req中各种parameter中的id那一项
    const product = await Product.findById(id);
    // console.log(product);
    res.render(path.join(__dirname+'/views/show.ejs'),{product});
    //Pass product for later usage
       
})






app.listen(3000,()=>{
    console.log("App is listened on port 3000");
})
