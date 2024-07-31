import { useState, useEffect } from "react";


export default function TeamRotation({teamRotation}){
	const [rotation, setRotation] = useState(teamRotation);
	
	useEffect(() => {
		setRotation(teamRotation);
	}, [teamRotation]);
	
	return(
		<div className="rotation-section">
			<label htmlFor="rotation">Rotation: </label>
			<textarea className="rotation-text" name="rotation" id="rotation" value={rotation} onChange={(e) => setRotation(e.target.value)}>
			</textarea>
		</div>
	);
}