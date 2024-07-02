import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import '../Styles/stylesTeamScreen.css';
import { default as CharacterDeck } from "./TeamScreenCharacterDeck";
import { default as TeamName } from "./TeamName";

export default function TeamScreen(props){
	let team = props.currentTeam;
	const context = useContext(UserContext);
	const [description, setDescription] = useState(team.description);
	const [rotation, setRotation] = useState(team.rotation);
	
	function DeleteButton(){
		return(
			<button className="delete-button" onClick={() => props.delete(team.id)}>
				Delete Team
			</button>
		)
	}
	
	useEffect(()=>{
		setDescription(team.description);
		setRotation(team.rotation);
	}, [team]);
	
	function saveTeam(e){
		e.preventDefault();
		let notes = [
			e.target.note0.value.trim(),
			e.target.note1.value.trim(),
			e.target.note2.value.trim(),
			e.target.note3.value.trim()
		]
		context.setTeams(currentTeams=>{
			return currentTeams.map((currentTeam) =>{
				if(currentTeam.id === team.id)
					return {...team, notes: notes, description: description, rotation: rotation}
				return currentTeam;
			}) 
		})
		
		//update the team screen
		context.setTeam(() => {return {...team, notes: notes, description: description, rotation: rotation}});
		
		//update the active
		context.toggleTeamActive(team.id);
	}
	
	function SaveButton(){
		return(
			<input type="submit" className="Save-button" value="Save changes">
			</input>
		)
	}
	
	if(Object.keys(team).length === 0){
		return(
			<div className="team-screen">
				Select a team
			</div>
		)
	}
	return(
		<div className="team-screen">
				<TeamName teamName = {team.name}/>
			<form className="team-screen-form" onSubmit={(e)=>saveTeam(e)}>
				<center style={{width: "140%"}}>
				<hr style={{border: "1px solid white", width: "100%"}}/>
				</center>
				
				<div className="description-section">
					<label htmlFor="description">Team Description: </label>
					<textarea className="description-text" name="description" id="description"value={description} onChange={(e) => setDescription(e.target.value)}>
					</textarea>
				</div>
				
				<CharacterDeck props={{team: team.characters, notes: team.notes}}/>
				
				<div className="rotation-section">
					<label htmlFor="rotation">Rotation: </label>
					<textarea className="rotation-text" name="rotation" id="rotation" value={rotation} onChange={(e) => setRotation(e.target.value)}>
					</textarea>
				</div>
				
				<SaveButton />
				<DeleteButton />
			</form>
		</div>
	)
}