import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";


export default function TeamDescription({teamDescription}){
	const [description, setDescription] = useState(teamDescription);
	
	const context = useContext(UserContext);
	
	useEffect(() => {
		setDescription(teamDescription);
	}, [context.team]);
	
	return(
		<div className="description-section">
			<label htmlFor="description">Team Description: </label>
			<textarea className="description-text" name="description" id="description"value={description} onChange={(e) => setDescription(e.target.value)}>
			</textarea>
		</div>
	);
}