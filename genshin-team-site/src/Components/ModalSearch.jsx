import {GenshinCharacterData as data} from "../Data/GenshinCharacters"
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";

export default function CharacterSearch({CharacterPortrait, setPreviewCharacter}){
	const context = useContext(UserContext);
	const [searchQuery, setPreviewSearchQuery] = useState("");
	
	function search(e){
		setPreviewSearchQuery(() => {return e.target.value});
	}
	
	useEffect(() =>{
		setPreviewSearchQuery("");
	}, [context.modalActive]);

	
	function populateWithData(){
		return data.map((character) => {
			let color;
			let name = character.name;
			let alt = "default_blank";
			if(character.alt !== undefined && character.alt !== null) alt = character.alt;
			let query = searchQuery.toLowerCase();
	
			if (name.toLowerCase().indexOf(query) !== -1 ||
               (alt !== "default_blank" && alt.toLowerCase().indexOf(query) !== -1)){
				character.rarity === "5" ? color = "linear-gradient(180deg, rgb(153,108,66), rgb(223,145,79))" 
										 : color = "linear-gradient(180deg, rgb(104,96,142), rgb(150,117,194))";
										 
				return <CharacterPortrait key={crypto.randomUUID()} clickEvent={() => {setPreviewCharacter(character.name)}}
					  bgColor={color} name={character.name} element={character.element} className="character-select-icon"/>;
			}
			return null;
		});
	}

	return(
		<>
			<div className="modal-search-container">
				<form className="modal-search-form">
					<input type="text" placeholder="Type character name to search" value={searchQuery} onChange={e => search(e)}/>
				</form>
			</div>
			
			
			<div className="modal-box-character-grid">
				{populateWithData()}
			</div>
		</>
	);
}