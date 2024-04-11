const mongoose  = require("mongoose")

const recipeSchema=mongoose.Schema({
    id:String,
    title: String,
    ingredients:String,
    instructions: String,
    cookingTime:String,
})


module.exports=mongoose.model("Recipe",recipeSchema)