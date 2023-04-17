const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');
const methodOverride = require('method-override');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError')
//把这个规定好的schema类给导入过来
// const {campgroundSchema, reviewSchema} = require('./schemas.js');
const AppError = require('./AppError');
const Review = require('./models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true, useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database Connection");
})
//一旦链接mongodb成功就会显示的东西，如果没有连接成功，最终会返回来什么东西出来

app.engine('ejs',ejsMate);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'))

app.post('/campgrounds/:id', async (req,res,next)=>{
        
   try{
    const campground = await Campground.findById(req.params.id);

    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);

   }catch(e){
       next(e);
   }
});


app.get('/',(req,res)=>{
    // res.send('Hello From Yelp Camp');
    res.render('home');
})

app.get('/campgrounds',async (req,res,next)=>{
    // res.send('Hello From Yelp Camp');
   try{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index',{campgrounds});
   }catch(e){
       next(e);
   }
    //这是用render 来对数据进行传输，传到后面的index.ejs上面去
})

app.get('/campgrounds/new', async (req,res)=>{
    // res.send('Hello From Yelp Camp');
    // const{id} = req.params;
    // const campground = await Campground.findById(req.params.id);
    //两种写法都是可以的
    res.render('campgrounds/new'); 
})

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
//这里需要事先parse的bodypart， 所以要用上述的方法调用
app.post('/campgrounds', async(req,res,next)=>{
    
    try{
        const campground = new Campground(req.body.campground)
    // res.send(req.body);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
    }catch(e){
        next(e);
    }

});
//被catchAync包裹后，所有的操作bug逻辑都会被送到CatchAsync中进行统一的操作和处理
//抓取上面可可能遇到的error,通过next的窗口，交给下面的 boy sth go wrong的next来处理



app.get('/campgrounds/:id',async(req,res,next)=>{
    // res.send('Hello From Yelp Camp');
    // const{id} = req.params;
    try{
        const campground = await Campground.findById(req.params.id);
    //两种写法都是可以的
    res.render('campgrounds/show',{campground});
    }catch(e){
        next(e);
    }


});

app.get('/campgrounds/:id/edit',async(req,res,next)=>{
    try{
        const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit',{campground});
    }catch(e){
        next(e);
    }
})


app.put('/campgrounds/:id',async(req,res,next)=>{
    // const campground = await Campground.findById(req.params.id);
    // res.send("it worked.");
    try{
        const{id} =req.params;
        const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
        res.redirect(`/campgrounds/${campground._id}`)
    }catch(e){
        next(e);
    }
})


app.delete('/campgrounds/:id', async(req,res,next)=>{
    // const campground = await Campground.findById(req.params.id);
    // res.send("it worked.");
    try{
        const{id} =req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect(`/campgrounds`);
    }catch(e){
        next(e);
    }
})

app.post('/campgrounds/:id/review',  async (req, res,next)=>{
    try{
        const campground = await Campground.findById(req.params.id);
        const review = new Review(req.body.review);
        campground.reviews.push(review);
        await review.save();
        await campground.save();
        res.redirect(`/campgrounds/${campground._id}`)
    }catch(e){
        next(e);
    }
})

app.use((err,req,res,next) =>{
    res.send('Oh boy,something went wrong');
})
//这里展开可以将不同的error都放在这里进行处理，完成进展



// const validateReview = (req,res,next) =>{
//     const{error} = reviewSchema.validate(req.body);
//     if(error){
//         const msg = error.details.map(el=>el.message);
//         throw new ExpressError(msg,400);
//     }else{
//         next();
//     }
// }


app.listen(4000, ()=>{
    console.log("Log in 4000")
})

app.get('/makecampground' , async (req,res)=>{
    const camp = new Campground({title:'My Backyard',description: 'cheap camping!'}) ;
    await camp.save();
    res.send(camp);
})

//给访问除了目标地址以外的位置的时候，傻瓜式报错
app.all('*',(req,res,next)=>{
    res.send('404!!!!');
    next(new ExpressError('Page Nofound!',404));
})
//比如 http://localhost:4000/campgroundsxxxx

