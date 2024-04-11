const mongoose  = require("mongoose")

const recipeSchema=mongoose.Schema({
    id:Number,
    title: String,
    ingredients:String,
    instructions: String,
    cookingTime:String,
})


module.exports=mongoose.model("Recipe",recipeSchema)