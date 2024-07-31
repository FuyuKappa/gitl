import {default as Container} from "./TeamContainer";
import {default as NewTeamButton} from "./NewTeamButton";
import { useContext } from "react";
import { UserContext } from "../App";

export default function TeamListSection(){
	const teams = useContext(UserContext).teams;
	const addToList = useContext(UserContext).addToList;
	
	console.log(teams);
	return(
		<div className="team-list-section">
			{teams ? 
				teams.map((team) =>{
					return <Container team={team} key={crypto.randomUUID()}/>
				})
				: (<></>)
			}
			<NewTeamButton addFunction={addToList} />
		</div>
	)
}