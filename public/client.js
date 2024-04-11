let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");

let searchRecipe = document.getElementById("searchButton");

displayRecipes()


async function addRecipes(recipe){
    try{
        let results = await fetch('http://localhost:5000/recipes',{
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
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
        const confirmed = confirm("Are you sure you want to delete this recipe?");
        
        // Proceed with deletion if confirmed
        if (confirmed) {
        await fetch(`http://localhost:5000/recipes/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        });
        displayRecipes(); // Refresh the displayed recipes after deletion
    }

    } catch (error) {
        console.log(error);
    }

}

async function updateRecipes(recipe){
    try{
        let results = await fetch(`http://localhost:5000/recipes/${id}`,{
            method: 'PUT',
            body: JSON.stringify(recipe),
            headers: {'content-type': 'application/json'}
            
        })
        let receive = results
        console.log(receive)
        return receive
         
    }catch (error){
        console.log(error)
    }
}


async function displayRecipes(){

    let data = await getdata()
    let tableHTML = '<table border="1"><tr><th>ID</th><th>Title</th><th>Ingredients</th><th>Instructions</th><th>Cooking Time</th><th>Action</th></tr>';
            data.forEach(recipe => {
                tableHTML += `<tr><td>${recipe.id}</td><td>${recipe.title}</td>
                <td>${recipe.ingredients}</td><td>${recipe.instructions}</td><td>${recipe.cookingTime}</td>
                <td><button onclick="updateRecipe('${recipe.id}')">update</button>
                <td><button onclick="deleteRecipe('${recipe.id}')">Delete</button></td></tr>`;
            });
            tableHTML += '</table>';
            document.getElementById('recipeTable').innerHTML = tableHTML;

    
    
    
}

   

searchRecipe.addEventListener('click', async event => {
    console.log("here")

    let sTitle = searchText.value

    let recipeData = await searchTitle(sTitle)

    console.log(recipeData)
    const searchResultDiv = document.getElementById('showRecipes');

    if (recipeData && recipeData.length > 0) {
        const recipe = recipeData[0];
   
        // Create HTML content to display the recipe
        const recipeHTML = `
            <h2>${recipe.title}</h2>
            <p>Ingredients: ${recipe.ingredients}</p>
            <p>Instructions: ${recipe.instructions}</p>
            <p>Cooking Time: ${recipe.cookingTime}</p>
        `;
        // Set the HTML content to the searchResultDiv
        searchResultDiv.innerHTML = recipeHTML;
    } else {
        // Display a message if the recipe is not found
        searchResultDiv.innerHTML = "<p>Recipe not found</p>";
    }
    
        
    
    
});



addData.addEventListener('click', async event => {
    // add data here
    let id = idNumber.value
    let title = titleText.value
    let ingredients = ingredientsText.value
    let instructions = instructionsText.value
    let cookingTime = cookingTimeText.value


    console.log("Guideline " + title)

   let response = await addRecipes({id:id,title:title,ingredients:ingredients,instructions:instructions,cookingTime:cookingTime})
    console.log(response.status)
    displayRecipes(); // Refresh the displayed recipes after addition





    console.log(id,title,ingredients,instructions,cookingTime)
 
});

async function updateRecipe(id) {
    //let id = idNumber.value
    let title = titleText.value
    let ingredients = ingredientsText.value
    let instructions = instructionsText.value
    let cookingTime = cookingTimeText.value

    try {
        await fetch(`http://localhost:5000/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, ingredients, instructions, cookingTime })
        });
        displayRecipes(); // Refresh the displayed recipes after update
    } catch (error) {
        console.log(error);
    }
}

