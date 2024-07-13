import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";


export default function TeamRotation({teamRotation}){
	const [rotation, setRotation] = useState(teamRotation);
	
	const context = useContext(UserContext);
	
	useEffect(() => {
		setRotation(teamRotation);
	}, [context.team]);
	
	return(
		<div className="rotation-section">
			<label htmlFor="rotation">Rotation: </label>
			<textarea className="rotation-text" name="rotation" id="rotation" value={rotation} onChange={(e) => setRotation(e.target.value)}>
			</textarea>
		</div>
	);
}