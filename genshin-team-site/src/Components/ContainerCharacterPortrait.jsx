import { useContext } from "react";
import { ListContext } from "./TeamListTab";

export default function ContainerCharacterPortrait({character, id, position}){
	return(
		<div className="container-character-portrait" >
			<img src={"./" + useContext(ListContext).currSite +"/SideIcon/" + character.name + ".png"} alt={character.name}/>
			<div className="container-character-bg"></div>
		</div>
	)
}