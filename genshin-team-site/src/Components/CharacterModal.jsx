import {GenshinCharacterData as data} from "../Data/GenshinCharacters"
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../App";
import { default as CharacterSearch } from "./ModalSearch";
 
export default function CharacterModal({character, position}){
	const context = useContext(UserContext);
	const [previewCharacter, setPreviewCharacter] = useState("Blank");
	const previewRef = useRef(null);
	
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
	
	useEffect(() => {
		for(let i = 0; i < previewRef.current.children.length; i++){
			let section = previewRef.current.children[i];
			if(section.className === "character-select-icon character-select-preview")
				fitText(section.querySelector(".portrait-name"));
		}
	}, [previewCharacter]);
	
	function editCharacter(newCharacter){
		if(newCharacter !== "Blank"){
			context.setTeams(currentTeams => {
				return currentTeams.map(team => {
					if(context.team.id === team.id){
						let characters = team.characters;
						characters[position] = newCharacter;
						return {...team, characters: characters};
					}
					
					return team;
				});
			});
			 context.setModalActive(false)
		}
	}
	
	function CharacterPortrait({clickEvent, bgColor, name, element, className}){
		if(bgColor === null || bgColor === undefined){
			for(let i = 0; i < data.length; i++){
				let character = data[i]
				if(character.name === name){
					character.rarity === "5" ? bgColor = "linear-gradient(180deg, rgb(153,108,66), rgb(223,145,79))" 
											 : bgColor = "linear-gradient(180deg, rgb(104,96,142), rgb(150,117,194))";
					element = character.element;
					break;
				}
			}
		}
		return(
			<div className={className} key={crypto.randomUUID()} onClick={clickEvent}>
				<img src={"./Portrait/" + name + ".png"} style={{background: bgColor}} alt={name}/>
				
				<div className="element-icon">
					<img className="element-icon-image" src={"./Element/" + element + ".png"} alt={element}/>
				</div>
				
				<div className="portrait-name">
					{name}
				</div>
			</div>
		);
	}
	

	return (
		<div className="modal-global" onClick={(e) => {if(e.target.className === "modal-global") context.setModalActive(false)}}>
			<div className="modal-box">
				<div className="modal-top">
					Select a character
					
					<svg height="40" width="40" id="modal-close" onClick={() => context.setModalActive(false)}>
						<line x1="5" y1="5" x2="36" y2 ="36" style={{stroke: "#FFF", strokeWidth: "5", strokeLinecap:"round" }}/>
						<line x1="5" y1="36" x2="36" y2 ="5" style={{stroke: "#FFF", strokeWidth: "5", strokeLinecap:"round" }}/>
					</svg>
				</div>
				<div className="modal-box-preview" ref={previewRef}>
					<CharacterPortrait name={character} className="character-select-icon character-select-preview" />
					->
					<CharacterPortrait name={previewCharacter} className="character-select-icon character-select-preview" />
				</div>
				
				<CharacterSearch CharacterPortrait={CharacterPortrait} setPreviewCharacter={setPreviewCharacter} fitText={fitText}/>
				
				<div className="modal-box-button-container">
					<button onClick={() => context.setModalActive(false)}>Cancel</button>
					<button onClick={() => {editCharacter(previewCharacter)}}>Confirm</button>
				</div>
			</div>
		</div>
	)
}