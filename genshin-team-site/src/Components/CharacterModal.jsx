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
		context.saveToLocalStorage();
	}
	
	
	function populateWithData(){
		return data.map((character) => {
			let color;
			
			character.rarity === "5" ? color = "linear-gradient(180deg, rgb(153,108,66), rgb(223,145,79))" 
									 : color = "linear-gradient(180deg, rgb(104,96,142), rgb(150,117,194))";
			
			return (
				<div className="character-select-icon" key={crypto.randomUUID()} onClick={() => {editCharacter(character.name); context.setModalActive(false)}}>
					<img src={"./Portrait/" + character.name + ".png"} style={{background: color}} alt={character.name}/>
					<img className="element-icon" src={"./Element/" + character.element + ".png"} alt={character.element}/>
					{character.name}
				</div>
			);
		});
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
					{character}
				</div>
				<div className="modal-box-character-grid">
					{populateWithData()}
				</div>
			</div>
		</div>
	)
}