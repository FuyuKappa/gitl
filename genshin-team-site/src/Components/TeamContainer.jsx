import {default as Name} from "./TeamName";
import {default as CharacterPortrait} from "./ContainerCharacterPortrait";
import { useContext } from "react";
import { SiteContext } from "../App";
import { ListContext } from "./TeamListTab";

export default function TeamContainer({team}){
	const {name, id, characters, active} = team;
	const previewTeam = useContext(SiteContext).previewTeam;
	const toggleTeamActive = useContext(SiteContext).toggleTeamActive;
	const saveTeam = useContext(SiteContext).saveTeam;
	const className = "team-container team-container-" + active;
	const teamSize = useContext(ListContext).teamSize;
	const currSite = useContext(ListContext).currSite;
	
	let characterList = [];	
	for(let i = 0; i < teamSize; i++){
		let character = characters[i] ? characters[i] : {name: "AddCharacter"};
		characterList.push(<CharacterPortrait  character={character} key={crypto.randomUUID()} id={id} position={i}/>)
	}
	
	function ResonanceDeck(){
		let elementList = [];
		characters.forEach(character => {elementList.push(character === null ? "Null" : character.element)});
		
		let uniqueElements = {};
		for(let i = 0; i < elementList.length; i++){
			let currentElement = elementList[i];
			
			if(Object.keys(uniqueElements).indexOf(currentElement) === -1 && currentElement !== "Null"){
				uniqueElements[currentElement] = 1;
				for(let k = i + 1; k < elementList.length; k++){
					if(currentElement === elementList[k])
						uniqueElements[currentElement] = uniqueElements[currentElement] + 1;
				}
			}			
		}
		
		let resonances = [];
		let keys = Object.keys(uniqueElements);
		if(keys.length === 4) resonances = elementList;
		else if(keys.length < 4){
			for(let i = 0; i < keys.length; i++){
				if(uniqueElements[keys[i]] > 1){
					resonances.push(keys[i]);
					resonances.push(keys[i]);
				}
			}
		}
		let deck = [];
		for(let i = 0; i < resonances.length; i++){
			deck.push(<img className="deck-element" src={"./"+ currSite + "/Element/" + resonances[i] + ".png"} key={crypto.randomUUID()} alt={resonances[i]} />);
		}
		return(
			<div className="resonance-deck">
			{deck}
			</div>
		)
	}
	
	return(
		<div className={className} onClick={() => {saveTeam({switchActive: true, notifyUser: false, teamSize: teamSize}); previewTeam(team); toggleTeamActive(id);}}>
			<div className="team-container-top">
				<Name teamName={name} id={id} selected={active}/>
				{currSite === "Genshin Impact" ? <ResonanceDeck /> : <></>}
			</div>
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