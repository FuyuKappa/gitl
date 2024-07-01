import {default as Container} from "./TeamContainer";
import {default as NewTeamButton} from "./NewTeamButton";
import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function TeamListSection(){
	const teams = useContext(UserContext).teams;
	const addToList = useContext(UserContext).addToList;
	
	return(
		<div className="team-list-section">
			{teams.map((team) =>{
				return <Container team={team} key={crypto.randomUUID()}/>
			})}
			<NewTeamButton addFunction={addToList} />
		</div>
	)
}