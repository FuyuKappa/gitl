import { useContext, createContext } from "react";
import { SiteContext } from "../App";
import { default as CharacterDeck } from "./TeamScreenCharacterDeck";
import { default as Description } from "./TeamDescription";
import { default as Rotation } from "./TeamRotation";

export const TeamScreenContext = createContext();

export default function TeamScreen({teamSize, currSite}){
	const context = useContext(SiteContext);
	let team = context.team;
	
	function DeleteButton(){
		return(
			<button className="delete-button" onClick={() => context.deleteFromList(team.id)}>
				Delete Team
			</button>
		)
	}
	
	function SaveButton(){
		return(
			<button type="submit" className="save-button" value="Save changes" onClick={() => context.saveTeam()}>
				Save changes
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
	
	const value={
		teamSize, currSite
	}

	return(
		<TeamScreenContext.Provider value={value}>
			<div className="team-screen">
				<div className="team-name">
					{team.name}
				</div>
				<div className="team-screen-form">
					
					<center>
					<hr style={{border: "1px solid white", width: "100%"}}/>
					</center>
					
					<SaveButton />
					
					<Description teamDescription={team.description}/>
					
					<span className="" style={{paddingBottom: "8px"}}>Click on the sections below to change the characters.</span>
					
					<CharacterDeck props={{team: team.characters, notes: team.notes, teamSize:teamSize}}/>
					
					<Rotation teamRotation={team.rotation} />
					
					<DeleteButton />
				</div>
			</div>
		</TeamScreenContext.Provider>
	)
}