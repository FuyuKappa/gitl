import {default as CharacterSection } from "./TeamScreenCharacterSection";
export default function TeamScreenCharacterDeck({team}){
	
	let characterList = [];	
	for(let i = 0; i < 4; i++){
		let character = team[i] ? team[i] : "Blank";
		characterList.push(<CharacterSection character={character} />);
	}
	
	return(
		<div>
			{characterList}
		</div>
	)
}