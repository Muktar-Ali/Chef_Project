export async function getRecipeFromMistral(ingredientsArr) {
  const res = await fetch("http://localhost:5000/api/recipe", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: ingredientsArr })
  });

  const data = await res.json();
  return data.recipe;
}
