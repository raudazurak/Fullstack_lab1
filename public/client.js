let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButton");
let updateData = document.getElementById("updateButton");
let searchRecipe = document.getElementById("searchButton");

displayRecipes()


async function addRecipes(recipe){
    try{
        let results = await fetch('http://localhost:5000/recipes',{
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
        displayRecipes(); // Refresh the displayed recipes after deletion
        let receive = results
        console.log(receive)
        return receive
         
    }catch (error){
        console.log(error)
    }
}



async function getdata(){
    try{
        let result = await fetch('http://localhost:5000/recipes',{
            method: 'GET',
            headers: {'content-type': 'application/json'}
        })
        let rest = ( result).json();
        return (rest)
    }catch (error){
        console.log(error)
    }
}


async function searchTitle(title){
    
    try{
    //const title = (document.getElementById('myInput')).value;
    let searchAlbum = await fetch(`http://localhost:5000/recipes/${title}`, {
        method: 'GET',
        headers: {'content-type': 'application/json'},
    })
        let rest = ( searchAlbum).json();
        return (rest)
    }catch (error){
        console.log(error)
    }
    

}

async function deleteRecipe(id) {
    try {
        await fetch(`http://localhost:5000/recipes/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        });
        displayRecipes(); // Refresh the displayed recipes after deletion
    } catch (error) {
        console.log(error);
    }
}

async function displayRecipes(){

    let data = await getdata()
    let tableHTML = '<table border="1"><tr><th>ID</th><th>Title</th><th>Ingredients</th><th>Instructions</th><th>Cooking Time</th><th>Action</th></tr>';
            data.forEach(recipe => {
                tableHTML += `<tr><td>${recipe.id}</td><td>${recipe.title}</td>
                <td>${recipe.ingredients}</td><td>${recipe.instructions}</td><td>${recipe.cookingTime}</td>
                <td><button onclick="deleteRecipe('${recipe.id}')">Delete</button></td></tr>`;
            });
            tableHTML += '</table>';
            document.getElementById('recipeTable').innerHTML = tableHTML;

    
    
    
}

   

searchRecipe.addEventListener('click', async event => {
    console.log("here")

    let sTitle = searchText.value

    let data = await searchTitle(sTitle)

    console.log(data)
    
        
    
    
});



addData.addEventListener('click', async event => {
    // add data here
    let id = idText.value
    let title = titleText.value
    let ingredients = ingredientsText.value
    let instructions = instructionsText.value
    let cookingTime = cookingTimeText.value


    console.log("Guideline " + title)

    // Here you should make the fetch to the rest api
    //await addBooks({name:name,genre:category,date:date,author:author})

   let response = await addRecipes({id:id,title:title,ingredients:ingredients,instructions:instructions,cookingTime:cookingTime})
    console.log(response.status)

    //addData(name,category,data,author)



    console.log(id,title,ingredients,instructions,cookingTime)
 
});