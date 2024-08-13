import {default as Container} from "./TeamContainer";
import {default as NewTeamButton} from "./NewTeamButton";

export default function TeamListSection({teams, setTeams}){

	return(
		<div className="team-list-section">
			{teams ? 
				teams.map((team) =>{
					return <Container team={team} key={crypto.randomUUID()}/>
				})
				: (<></>)
			}
			<NewTeamButton teams={teams} setTeams={setTeams}/>
		</div>
	)
}