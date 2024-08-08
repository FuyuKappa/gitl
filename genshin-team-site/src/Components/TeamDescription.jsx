import { useState, useEffect, useContext } from "react";
import { UserContext } from '../App';

export default function TeamDescription({teamDescription}){
	const [description, setDescription] = useState(teamDescription);
	const contextTeam = useContext(UserContext).team;
	
	useEffect(() => {
		setDescription(teamDescription);
	}, [teamDescription, contextTeam]);
	
	return(
		<div className="description-section">
			<label htmlFor="description">Team Description: </label>
			<textarea className="description-text" name="description"
			id="description"value={description} onChange={(e) => setDescription(e.target.value)}
			placeholder="Write a short description of the team">
			</textarea>
		</div>
	);
}