import {GenshinCharacterData as data} from "../Data/GenshinCharacters"
import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../App";

export default function CharacterSearch({CharacterPortrait, setPreviewCharacter}){
	const context = useContext(UserContext);
	const [searchQuery, setPreviewSearchQuery] = useState("");
	const gridRef = useRef(null);
	
	//Special thanks to: Ricardo Goncalves
	//https://github.com/ricardobrg/fitText/
	function fitText(outputSelector){
		// max font size in pixels
		const maxFontSize = 30;
		// get the DOM output element by its selector
		let outputDiv = outputSelector;
		// get element's width
		let width = outputDiv.clientWidth;
		// get content's width
		let contentWidth = outputDiv.scrollWidth;
		// get fontSize
		let fontSize = parseInt(window.getComputedStyle(outputDiv, null).getPropertyValue('font-size'),10);
		// if content's width is bigger then elements width - overflow
		if (contentWidth > width){
			fontSize = Math.ceil(fontSize * width/contentWidth,10);
			fontSize =  fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize - 1;
			outputDiv.style.fontSize = fontSize+'px';   
		}else{
			// content is smaller then width... let's resize in 1 px until it fits 
			while (contentWidth === width && fontSize < maxFontSize){
				fontSize = Math.ceil(fontSize) + 1;
				fontSize = fontSize > maxFontSize  ? fontSize = maxFontSize  : fontSize;
				outputDiv.style.fontSize = fontSize+'px';   
				// update widths
				width = outputDiv.clientWidth;
				contentWidth = outputDiv.scrollWidth;
				if (contentWidth > width){
					outputDiv.style.fontSize = fontSize-1+'px'; 
				}
			}
		}
	}
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
										 
				return <CharacterPortrait key={crypto.randomUUID()} clickEvent={() => {setPreviewCharacter(character.name);}}
					  bgColor={color} name={character.name} element={character.element} className="character-select-icon"/>;
			}
			return null;
		});
	}

	return(
		<>
			<div className="modal-search-container">
				<input className="modal-search-form" type="text" placeholder="Type character name to search" value={searchQuery} onChange={e => search(e)}/>
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