import ReactMarkdown from "react-markdown"

export default function ClayRecipe(props){
    return(
      <section className="recipeContainer">
          <ReactMarkdown>{props.recipe}</ReactMarkdown>
        </section>
    )
}