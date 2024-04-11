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
    const recipeId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(recipeId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }  
    res.json({ success: true, deletedUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT)
console.log("Listening to the port "+ PORT)