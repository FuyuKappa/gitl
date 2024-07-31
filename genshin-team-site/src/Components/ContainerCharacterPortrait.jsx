import { useContext } from "react";
import { UserContext } from "../App";

export default function ContainerCharacterPortrait({character, id, position}){
	const context = useContext(UserContext);
	
	return(
		<div className="container-character-portrait" onClick={() => {context.openModal(character, position) }}>
			<img src={"./SideIcon/" + character + ".png"} alt={character}/>
			<div className="container-character-bg"></div>
		</div>
	)
}