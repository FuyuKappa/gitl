import { useContext} from "react";
import { UserContext } from "../App";
import '../Styles/stylesTeamScreen.css';
import { default as CharacterDeck } from "./TeamScreenCharacterDeck";
import { default as TeamName } from "./TeamName";

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
		context.setTeams(currentTeams=>{
			return currentTeams.map((currentTeam) =>{
				if(currentTeam.id === team.id)
					return {...team, notes: notes}
				return currentTeam;
			}) 
		})
		
		//update the team screen
		context.setTeam(() => {return {...team, notes: notes}});
		
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
			<form onSubmit={(e)=>saveTeam(e)}>
				<CharacterDeck props={{team: team.characters, notes: team.notes}}/>
				<SaveButton />
				<DeleteButton />
			</form>
		</div>
	)
}