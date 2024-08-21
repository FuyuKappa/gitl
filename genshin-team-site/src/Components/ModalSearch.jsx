import { useContext, useState, useEffect, useRef } from "react";
import { SiteContext } from "../App";

export default function CharacterSearch({CharacterPortrait, setPreviewCharacter, fitText, data}){
	const context = useContext(SiteContext);
	const [searchQuery, setPreviewSearchQuery] = useState("");
	const gridRef = useRef(null);
	
	function search(e){
		setPreviewSearchQuery(() => {return e.target.value});
	}
	
	useEffect(() =>{
		setPreviewSearchQuery("");
	}, [context.modalActive]);
	
	
	useEffect(() =>{
		if(gridRef.current.children.length > 0){
			for(let i = 0; i < gridRef.current.children.length; i++){
				let section = gridRef.current.children[i];
				fitText(section.querySelector(".portrait-name"));
			}
		}
	});
	
	
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
										 
				let previewCharacter = {name: character.name, element: character.element, rarity: character.rarity};
				if(character.type) previewCharacter = {...previewCharacter, type: character.type}
				return <CharacterPortrait key={crypto.randomUUID()} clickEvent={() => {setPreviewCharacter(previewCharacter);}}
					  bgColor={color} name={character.name} element={character.element} className="character-select-icon" character={character}/>;
			}
			return null;
		});
	}

	return(
		<>
			<div className="modal-search-container">
				<input className="modal-search-form" name="character-search-query" type="text" placeholder="Type character name to search" value={searchQuery} onChange={e => search(e)}/>
			</div>
			
			<div className="modal-box-character-grid-falloff top">
			</div>
			
			<div className="modal-box-character-grid" ref={gridRef}>
				{populateWithData()}
			</div>
			
			<div className="modal-box-character-grid-falloff bottom">
			</div>
		</>
	);
}