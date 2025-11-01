import React from "react";
import ClayRecipe from "./components/ClayRecipe";
import IngredientsList from "./components/IngredientsList";

export default function Body() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipeShown, setRecipeShown] = React.useState(false);

 

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  function toggleRecipeShown(){
        setRecipeShown(prevShown => !prevShown)
  }

  return (
    <main>
      <form action={addIngredient} className="ingredient_form">
        <input type="text" name="ingredient" placeholder="e.g. Flour" />

        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && <IngredientsList
      ingredients = {ingredients}
      toggleRecipeShown = {toggleRecipeShown}
      /> }
      {recipeShown && <ClayRecipe />}
    </main>
  );
}
