import { readFromLS, writeToLS } from "./ls.js";

//Variable for list of toDos
let recipeList = [];
let nutritionalData = [];

//Class for toDo object
class recipe {
  constructor(
    id,
    title,
    prepTime,
    cookTime,
    imageURL,
    ingredients,
    instructions,
    nutritionalFacts
  ) {
    this.id = id;
    this.title = title;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.imageURL = imageURL;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.nutritionalFacts = nutritionalFacts;
  }
}

//Save to JSON
function saveRecipe(
  title,
  prepTime,
  cookTime,
  imageURL,
  ingredients,
  directions,
  nutritionalFacts,
  key
) {
  //Generate unique id and write to LS
  let _recipe = new recipe(
    Math.floor(Date.now()),
    title,
    prepTime,
    cookTime,
    imageURL,
    ingredients,
    directions,
    nutritionalFacts
  );
  recipeList.push(_recipe);
  writeToLS(key, JSON.stringify(recipeList));
  return _recipe;
}

//Update recipe list in local storage
function updateRecipeList(list, key) {
  writeToLS(key, JSON.stringify(list));
}

//Get list of recipes
function getRecipes(key) {
  if (recipeList.length === 0) {
    let temp;
    temp = readFromLS(key);
    if (temp !== null) {
      console.log(temp.length);
      return temp;
    } else {
      return recipeList;
    }
  }
}

function initRecipes(key) {
  if (recipeList.length === 0) {
    let temp;
    temp = readFromLS(key);
    if (temp !== null) {
      recipeList = temp;
    } else {
      recipeList = [];
    }
  }
}

// function addListItemEventListeners(){
//     const listItems = Array.from(/*use qs here*/document.querySelectorAll('#taskList li'));
//     listItems.forEach(listItem => {
//         const button = listItem.querySelector('span.close');
//         addButtonEventListener(button);
//         addCompleteEventListener(listItem);
//     });
// }

//Render recipe list
function renderRecipeList(list, element) {
  if (list.length === 0) {
    element.innerHTML =
      "You have no recipes.<br>Add one by clicking 'New Recipe'";
  } else {
    element.innerHTML = "";
    list.forEach((_recipe) => {
      var div = document.createElement("div");
      const newContent = document.createTextNode(_recipe.title);
      div.appendChild(newContent);
      element.innerHTML +=
        "<div id = " +
        _recipe.id +
        " class='card'><img src='" +
        _recipe.imageURL +
        "' alt='" +
        _recipe.title +
        "'/><p>" +
        _recipe.title +
        "</p><p>Prep Time: " +
        _recipe.prepTime +
        "</p><p>Cook Time: " +
        _recipe.prepTime +
        "</p><p>Ingredients: " +
        _recipe.ingredients +
        "</p><p>Directions: " +
        _recipe.directions +
        "</p><p>Nutritional Facts: " +
        _recipe.nutritionalFacts +
        "</div>";
    });

    //Add listeners to dynamic list items and spans
    // addListItemEventListeners();
  }
}

const apiURL = "https://api.edamam.com/api/nutrition-details?app_id=";
const appId = "17ece135";
const apiKey = "d430c183fcd46c968156e2e893d0dc06";
let testPayload = {
  title: "Cookies",
  yield: "About 4 servings",
  ingr: [
    "1 cup flour",
    "1 cup sugar",
    "2 eggs",
    "1 teaspoon of baking powder",
    "1/2 teaspoon of salt",
  ],
};

async function fetchNutritionalData(payload) {
  const url = `${apiURL}${appId}&app_key=${apiKey}`;
  console.log("Payload: " + JSON.stringify(payload));
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  // wait till it comes through
  nutritionalData = response.json();
  console.log(nutritionalData);
}

class recipes {
  constructor(element, key) {
    this.element = element;
    this.key = key;
  }

  // List the items
  listRecipes() {
    initRecipes(this.key);
    //recipeList = getRecipes(this.key);

    renderRecipeList(recipeList, this.element);
  }

  //Add an item to the list
  addRecipe() {
    //Grab input from html where user enters task,
    //and send along with key to the saveTodo() functiuon
    let recipeTitle = document.getElementById("recipe-title").value;
    let recipePrepTime = document.getElementById("recipe-prep-time").value;
    let recipeCookTime = document.getElementById("recipe-cook-time").value;
    let recipeImageURL = document.getElementById("recipe-image-url").value;
    let recipeIngredients = document.getElementById("recipe-ingredients").value;
    let recipeInstructions = document.getElementById(
      "recipe-instructions"
    ).value;

    //REQUIRED: TITLE, INGREDIENTS
    if (recipeTitle == "") {
      alert("Please enter a title.");
    } else if (recipeIngredients == "") {
      alert("Please enter at least one ingredient.");
    } else {
      //Add default picture
      if (recipeImageURL == "") {
        recipeImageURL =
          "//i0.wp.com/eyesclosedcooking.com/wp-content/uploads/2020/06/new-fluffy-pancakes-watermark1_5_orig-1.jpg?fit=1024%2C683&ssl=1";
      }

      //Get nutritional facts
      fetchNutritionalData(testPayload);
      setTimeout('', 5000);
      console.log(nutritionalData.calories);
      //Clear fields
      document.getElementById("recipe-title").value = "";
      document.getElementById("recipe-prep-time").value = "";
      document.getElementById("recipe-cook-time").value = "";
      document.getElementById("recipe-image-url").value = "";
      document.getElementById("recipe-ingredients").value = "";
      document.getElementById("recipe-instructions").value = "";
      //Save recipe
      saveRecipe(
        recipeTitle,
        recipePrepTime,
        recipeCookTime,
        recipeImageURL,
        recipeIngredients,
        recipeInstructions,
        nutritionalData.calories,
        this.key
      );
      //display current list of tasks
      this.listRecipes();
      window.scrollTo(top);
    }
  }

  // //Remove item from todo list
  // removeToDo(id) {
  //     removeItemOnce(recipeList, id)
  //     console.log("remove to do was run");
  //     this.listToDos();
  // }

  //Clear the storage
  clearLocalStorage() {
    //Dangerous but for debugging
    localStorage.clear();
    console.log("local storage cleared");
    recipeList = [];
    this.listRecipes();
  }
}

export default recipes;
