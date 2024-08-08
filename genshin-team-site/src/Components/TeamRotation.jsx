import { useState, useEffect, useContext } from "react";
import { UserContext } from '../App';

export default function TeamRotation({teamRotation}){
	const [rotation, setRotation] = useState(teamRotation);
	const contextTeam = useContext(UserContext).team;
	
	useEffect(() => {
		setRotation(teamRotation);
	}, [teamRotation, contextTeam]);
	
	return(
		<div className="rotation-section">
			<label htmlFor="rotation">Rotation: </label>
			<textarea className="rotation-text" name="rotation"
			id="rotation" value={rotation} onChange={(e) => setRotation(e.target.value)}
			placeholder="Write in the team rotation (e.g. Yelan E Q -> Yanfei Q E C 3[N2C] -> etc.)">
			</textarea>
		</div>
	);
}