const PORT = 5000|| process.env.PORT
const express = require ("express")
const connection= require("./connection")
const Recipe= require("./recipe")
const app = express()
const path = require("path")
require("dotenv").config()
connection()
app.use(express.static("public"))
app.use(express.json())


app.get('/', async(req,res)=>{
  res.sendFile(path.join(__dirname, '/index.html'));
}
)

app.get('/recipes', async(req,res)=>
{
    try{
        const recipes = await Recipe.find()
        res.status(200).json(recipes)
    }
    catch (err)
    {
        res.json({"error": console.log(err)})
    }
})

app.get("/recipes/:title", async (req, res) => {
  const searchTitle = req.params.title;
  try {
    const recipe = await Recipe.find({ title: { $regex: new RegExp(`${searchTitle}`, "i") } }).exec();
    if (recipe.length === 0) {
      res.status(404).send(`No such Recipe with title ${searchTitle} in the database!`);
      return;
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post('/recipes',(req,res)=>{
  const data= new Recipe(req.body)
  data.save()
  .then(recipe=>
      {
          console.log('user saved!',recipe)
          res.json({sucess:true, recipe})
      })
  .catch(err=> console.log(err))
})


app.delete('/recipes/:recipeId', async (req, res) => {
  try {
    const recipeId = req.params.recipeId;
    console.log("Recipe ID:", recipeId);

   
    //const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);
    const deletedRecipe = await Recipe.findOneAndDelete({ id: recipeId });

    console.log(deletedRecipe)

    if (!deletedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }  
    res.json({ success: true, deletedRecipe });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.put('/recipes/:recipeId', async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const { title, ingredients, instructions, cookingTime } = req.body;
  
      // Update the recipe in the database
      const updatedRecipe = await Recipe.findOneAndUpdate(
        { id: recipeId },
        { title, ingredients, instructions, cookingTime },
        { new: true }
      );
  
      // Check if the recipe was found and updated
      if (!updatedRecipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
  
      res.json({ success: true, updatedRecipe });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  



app.listen(PORT)
console.log("Listening to the port "+ PORT)