import {default as CharacterSection } from "./TeamScreenCharacterSection";

export default function TeamScreenCharacterDeck({props}){
	let {team, notes} = props;
	let characterList = [];	
	
	for(let i = 0; i < 4; i++){
		let character = team[i] ? team[i] : "Blank";
		let note = notes[i];
		let key = crypto.randomUUID();
		characterList.push(<CharacterSection character={character} note={note} key={key} index={i}/>);
	}
	
	return(
		<div className="character-deck">
			{characterList}
		</div>
	)
}