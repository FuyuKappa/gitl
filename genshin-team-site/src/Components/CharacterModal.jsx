import {GenshinCharacterData as data} from "../Data/GenshinCharacters"
import { useContext } from "react";
import { UserContext } from "../App";
 
export default function CharacterModal({character, position}){
	const context = useContext(UserContext);
	
	function editCharacter(newCharacter){
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
	}
	
	
	function populateWithData(){
		return data.map((character) => {
			let color;
			
			character.rarity === "5" ? color = "linear-gradient(180deg, rgb(153,108,66), rgb(223,145,79))" 
									 : color = "linear-gradient(180deg, rgb(104,96,142), rgb(150,117,194))";
			
			return <CharacterPortrait clickEvent={() => {editCharacter(character.name); context.setModalActive(false)}}
									  bgColor={color} name={character.name} element={character.element} className="character-select-icon"/>;
		});
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
				<img className="element-icon" src={"./Element/" + element + ".png"} alt={element}/>
				{name}
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
				<div className="modal-box-preview">
					<CharacterPortrait name={character} className="character-select-icon character-select-preview" />
					->
					<CharacterPortrait name={character} className="character-select-icon character-select-preview" />
				</div>
				<div className="modal-box-character-grid">
					{populateWithData()}
				</div>
			</div>
		</div>
	)
}