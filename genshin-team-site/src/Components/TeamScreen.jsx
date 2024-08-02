import { useContext } from "react";
import { UserContext } from "../App";
import '../Styles/stylesTeamScreen.css';
import { default as CharacterDeck } from "./TeamScreenCharacterDeck";
//import { default as TeamName } from "./TeamName";
import { default as Description } from "./TeamDescription";
import { default as Rotation } from "./TeamRotation";

export default function TeamScreen(props){
	let team = props.currentTeam;
	const context = useContext(UserContext);
	
	function DeleteButton(){
		return(
			<button className="delete-button" onClick={() => props.delete(team.id)}>
				Delete Team
			</button>
		)
	}
	
	function saveTeam(e){
		e.preventDefault();
		let notes = [
			e.target.note0.value.trim(),
			e.target.note1.value.trim(),
			e.target.note2.value.trim(),
			e.target.note3.value.trim()
		]
		let description = e.target.description.value.trim();
		let rotation = e.target.rotation.value.trim();
		
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
			<input type="submit" className="save-button" value="Save changes">
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
				<div className="team-name">
					{team.name}
				</div>
			<form className="team-screen-form" onSubmit={(e)=>saveTeam(e)}>
				
				<center>
				<hr style={{border: "1px solid white", width: "100%"}}/>
				</center>
				
				<SaveButton />
				
				<Description teamDescription={team.description}/>
				
				<span className="" style={{paddingBottom: "8px"}}>Click on the sections below to change the characters.</span>
				
				<CharacterDeck props={{team: team.characters, notes: team.notes}}/>
				
				<Rotation teamRotation={team.rotation} />
				
				<DeleteButton />
			</form>
		</div>
	)
}