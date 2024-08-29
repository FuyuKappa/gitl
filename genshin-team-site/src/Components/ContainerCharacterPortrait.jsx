import { useContext } from "react";
import { ListContext } from "./TeamListTab";

export default function ContainerCharacterPortrait({character, id, position}){
	let currSite = useContext(ListContext).currSite;
	let travelerPreference = localStorage.getItem("TravelerPreference");
	let imgPath = "./" + currSite + "/SideIcon/" + character.name + ".png";
	
	//SPECIAL LOGIC FOR ZZZ
	if (currSite === "Zenless Zone Zero"){
		imgPath = "url('" + imgPath + "')";
		let className = "zzz-portrait";
		
		if(character.name==="AddCharacter" || character.name==="Blank") className += " blank-portrait"
		return(
			<div className="container-character-portrait">
				<div className={className} style={{"backgroundImage":imgPath}}>
				</div>
			</div>
		)
	}
	//SPECIAL LOGIC FOR GENSHIN
	if (currSite === "Genshin Impact" && character.name === "Traveler"){
		let replacement;
		travelerPreference === null || travelerPreference === undefined ? replacement = "M" : replacement = travelerPreference;
		imgPath = "./" + currSite +"/SideIcon/" + character.name + replacement +".png";
	}
	
	
	return(
		<div className="container-character-portrait" >
			<img src={imgPath} alt={character.name}/>
			<div className="container-character-bg"></div>
		</div>
	)
}