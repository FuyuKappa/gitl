import { useContext } from "react";

import { SiteContext } from "../App";

export default function NewTeamButton({teams, setTeams}){
	//console.log(setTeams);
	const context = useContext(SiteContext);
	
	return(
		<div className="new-button team-container" onClick={() => context.addToList()}>
			Add New Team
		</div>
	)
}