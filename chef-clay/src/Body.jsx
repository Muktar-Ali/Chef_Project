import React from "react";
import ClayRecipe from "./components/ClayRecipe";
import IngredientsList from "./components/IngredientsList";
import { getRecipeFromMistral } from "./api";

export default function Body() {
  const [ingredients, setIngredients] = React.useState([]);

  const [recipe, setRecipe] = React.useState("");

 

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

   async function getRecipe(){
    const recipeMarkdown = await getRecipeFromMistral(ingredients)
    setRecipe(recipeMarkdown)
  }

  return (
    <main>
      <form action={addIngredient} className="ingredient_form">
        <input type="text" name="ingredient" placeholder="e.g. Flour" />

        <button>Add ingredient</button>
      </form>
      {ingredients.length > 0 && <IngredientsList
      ingredients = {ingredients}
      getRecipe = {getRecipe}
      /> }
      {recipe && <ClayRecipe recipe = {recipe} />}
    </main>
  );
}
