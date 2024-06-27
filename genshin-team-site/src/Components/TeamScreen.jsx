import { useContext } from "react";
import { UserContext } from "../App";

export default function TeamScreen(props){
	let team = props.currentTeam;
	
	function DeleteButton(){
		return(
			<button onClick={() => props.delete(team.id)}>
				Delete Team
			</button>
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
			{/*
			//Character deck
				//Character
					//Character portrait
					//Notes
			*/}
			{team.name}
			{team.characters}
			<DeleteButton />
		</div>
	)
}