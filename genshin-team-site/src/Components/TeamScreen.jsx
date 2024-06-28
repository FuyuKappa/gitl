import { useContext } from "react";
import { UserContext } from "../App";
import '../Styles/stylesTeamScreen.css';
import { default as CharacterDeck } from "./TeamScreenCharacterDeck";
import { default as TeamName } from "./TeamName";

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
			<TeamName teamName={team.name}/>
			<CharacterDeck team={team.characters}/>
			<DeleteButton />
		</div>
	)
}