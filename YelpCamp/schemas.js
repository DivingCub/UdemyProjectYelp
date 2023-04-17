const Joi = require('joi');

module.exports.campgroundSchema = Joi.object({
    campground: Joi.object({
        // title:Joi.string().require(),
        // price:Joi.number().require.min(0),
        image:Joi.string().require(),
        imageUrl:Joi.string().require(),
        location:Joi.string().require(),
        description:Joi.string().require(),
    }).require()
});



module.exports.reviewSchema = Joi.object({

    review: Joi.object({
        rating:Joi.number().require(),
        body:Joi.string().require()
    })

})

