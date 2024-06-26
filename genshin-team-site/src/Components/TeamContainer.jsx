import {default as Name} from "./TeamName";
import {default as CharacterPortrait} from "./ContainerCharacterPortrait";

export default function TeamContainer(props){
	{/*Have states, prop
	for team name and characters*/}
	
	let characterList = [];
	if(props.characters){
		props.characters.forEach((character) =>{
			characterList.push(<CharacterPortrait character={character} />);
		});
	}
	return(
		<div className="team-container" id={props.id}>
		<Name name = {props.name}/>
			{/*Resonance deck (component = resonance deck)
				//resonance icons
				//character overview (map)
				//<CharacterPortrait /> 4x (component = container-character-portrait)*/}
			<div className="container-character-deck">
			{characterList}
			</div>
		</div>
	)
}