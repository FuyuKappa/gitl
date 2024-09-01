import { useContext, useState, useRef, useEffect, useCallback } from "react";
import { SiteContext } from "../App";
import { default as CharacterSearch } from "./ModalSearch";
 
export default function CharacterModal({character, position, data, currSite}){
	const context = useContext(SiteContext);
	const [previewCharacter, setPreviewCharacter] = useState({name: "Blank"});
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
	
	const handleEsc = useCallback((e) => {
		if(e.key === "Escape")
			context.setModalActive(false);
	}, [context]);
	
	useEffect(() =>{
		window.addEventListener('keydown', handleEsc);
		
		return () => {
			window.removeEventListener('keydown', handleEsc);
		};		
	}, [handleEsc]);
	
	function editCharacter(newCharacter){
		if(Object.keys(newCharacter).length !== 0){
			context.setTeams(currentTeams => {
				return currentTeams.map(team => {
					if(context.team.id === team.id){
						let characters = team.characters;
						
						if(newCharacter.name === "Blank")
							characters[position] = null;
						else
							characters[position] = newCharacter;
						
						return {...team, characters: characters};
					}
					
					return team;
				});
			});
			context.setModalActive(false)
		}
	}
	
	function CharacterPortrait({clickEvent, bgColor, name, element, className, character}){
		if((bgColor === null || bgColor === undefined) && character.name !== "Blank" ){
			for(let i = 0; i < data.length; i++){
				let currCharacter = data[i]
				if(currCharacter.name === character.name){
					character.rarity === "5" ? bgColor = "linear-gradient(180deg, rgb(153,108,66), rgb(223,145,79))" 
											 : bgColor = "linear-gradient(180deg, rgb(104,96,142), rgb(150,117,194))";
					element = character.element;
					break;
				}
			}
		}
		if(character.name !== undefined && character.name !== "Blank"){
			let imgPath = "./"+ currSite + "/Portrait/" + character.name + ".png";
			
			if (currSite === "Genshin Impact" && character.name === "Traveler"){
				let replacement;
				let travelerPreference = localStorage.getItem("TravelerPreference");
				travelerPreference === null || travelerPreference === undefined ? replacement = "M" : replacement = travelerPreference;
				imgPath = "./"+ currSite + "/Portrait/" + character.name + replacement +".png";
			}
			return(
				<div className={className} key={crypto.randomUUID()} onClick={clickEvent}>
					<img src={imgPath} style={{background: bgColor}} alt={character.name}/>
					
					<div className="element-icon">
						<img className="element-icon-image" src={"./"+ currSite + "/Element/" + character.element + ".png"} alt={character.element}/>
					</div>
					
					<div className="portrait-name">
						{character.name}
					</div>
				</div>
			);
		}
		else{
			let imgPath = "./"+ currSite + "/Portrait/AddCharacter.png";
			return(
				<div className={className} key={crypto.randomUUID()} onClick={clickEvent}>
					<img src={imgPath} alt="Blank"/>
					
					<div className="portrait-name">
						Blank
					</div>
				</div>
			);
		}
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
					<CharacterPortrait character={character} className="character-select-icon character-select-preview" />
					->
					<CharacterPortrait character={previewCharacter} className="character-select-icon character-select-preview" />
				</div>
				
				<CharacterSearch CharacterPortrait={CharacterPortrait} setPreviewCharacter={setPreviewCharacter} fitText={fitText} data={data}/>
				
				<div className="modal-box-button-container">
					<button onClick={() => context.setModalActive(false)}>Cancel</button>
					<button onClick={() => {editCharacter(previewCharacter)}}>Confirm</button>
				</div>
			</div>
		</div>
	)
}