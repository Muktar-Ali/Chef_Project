import chefLogo from "../images/chef_img.png"
import './index.css'

export default function Header(){

    return(
        <header className="header">
            <img src={chefLogo}/>
            <h1>Chef Clay</h1>
        </header>
    )
}