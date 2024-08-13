import {default as Name} from "./TeamName";
import {default as CharacterPortrait} from "./ContainerCharacterPortrait";
import { useContext } from "react";
import { SiteContext } from "../App";

export default function TeamContainer({team}){
	const {name, id, characters, active} = team;
	const previewTeam = useContext(SiteContext).previewTeam;
	const toggleTeamActive = useContext(SiteContext).toggleTeamActive;
	const saveTeam = useContext(SiteContext).saveTeam;
	const className = "team-container team-container-" + active;
	
	let characterList = [];	
	for(let i = 0; i < 4; i++){
		//console.log(characters);
		let character = characters[i] ? characters[i] : "AddCharacter";
		characterList.push(<CharacterPortrait  character={character} key={crypto.randomUUID()} id={id} position={i}/>)
	}
	
	return(
		<div className={className} onClick={() => {saveTeam({switchActive: true, notifyUser: false}); previewTeam(team); toggleTeamActive(id);}}>
			<Name teamName={name} id={id} selected={active}/>
			<hr style={{margin: '4px 8px'}} />
				{/*Resnance deck (component = resonance deck)
				//resonance icons
				//character overview (map)
				//<CharacterPortrait /> 4x (component = container-character-portrait)*/}
			<div className="container-character-deck">
			{characterList}
			</div>
		</div>
	)
}