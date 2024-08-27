import { useContext } from "react";
import { ListContext } from "./TeamListTab";

export default function ContainerCharacterPortrait({character, id, position}){
	let currSite = useContext(ListContext).currSite;
	let imgPath = "./" + currSite +"/SideIcon/" + character.name + ".png";
	
	if (currSite === "Zenless Zone Zero"){
		imgPath = "url('" + imgPath + "')";
		let className = "zzz-portrait";
		
		if(character.name==="AddCharacter") className += " blank-portrait"
		return(
			<div className="container-character-portrait">
				<div className={className} style={{"backgroundImage":imgPath}}>
				</div>
			</div>
		)
	}
	return(
		<div className="container-character-portrait" >
			<img src={"./" + currSite +"/SideIcon/" + character.name + ".png"} alt={character.name}/>
			<div className="container-character-bg"></div>
		</div>
	)
}