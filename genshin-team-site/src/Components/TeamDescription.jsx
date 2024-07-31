import { useState, useEffect } from "react";

export default function TeamDescription({teamDescription}){
	const [description, setDescription] = useState(teamDescription);
	
	useEffect(() => {
		setDescription(teamDescription);
	}, [teamDescription]);
	
	return(
		<div className="description-section">
			<label htmlFor="description">Team Description: </label>
			<textarea className="description-text" name="description" id="description"value={description} onChange={(e) => setDescription(e.target.value)}>
			</textarea>
		</div>
	);
}