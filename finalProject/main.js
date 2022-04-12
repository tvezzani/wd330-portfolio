import recipes from "./modules/recipes.js";

//Create instance of recipes object
var _recipes =
  new recipes(document.getElementById("recipe-list-container"),165);
  _recipes.listRecipes();

// Add listenter to 'Add Recipe' button
document.getElementById("add-recipe").addEventListener("click", () => {
    _recipes.addRecipe();
});

// Add listenter to 'Add Recipe' button
document.getElementById("clear-local-storage").addEventListener("click", () => {
  _recipes.clearLocalStorage();
});