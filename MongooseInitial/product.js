const  mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp',{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log("Connection open!!")
})
.catch(err=>{
    console.log("Ho no error!!")
})

const productSchema = new mongoose.Schema({
    name:{
        type: String, 
        required: true
    },
    price:{ 
        type: Number, 
    },
    onSale:{
        type: Boolean, 
        default: false
    },
    categories:[String],
    qty:{ 
        online:{
            type: Number, 
            default:0
        },
        inStore:{ 
            type: Number, 
            default:0
        },
        size :{
            type: String,
            enum: ['S','M','L']
        }
    }

});

productSchema.methods.greet = function(){
    console.log("Hello!!Hi!! Howdy!!")
    console.log(`-from ${this.name}`)
}
//Like define a function for every model

const Product = mongoose.model('Product',productSchema);

productSchema.methods.toggleOnSale = function(){
    this.onSale = !this.onSale;
    return this.save();
}

const findProduct = async() =>{
    const foundProduct = await Product.findOne({name:'Moutain Bike'});
    // foundProduct.greet();
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
  }

// const Product = mongoose.model('Product', productSchema);
// //substantialize an item
// const bike = new Product({name:'Moutain Bike',price:599})
// // Don't forget to save it after creation
// bike.save()
// .then(m=>{
//     console.log("it worked!")
// })
// .catch(err=>{
//     console.log("NO , there is err");
//     console.log(err);
// })
findProduct();