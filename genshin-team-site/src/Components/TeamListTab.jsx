import {default as Section} from "./TeamListSection";
//import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../App";
import { useMediaQuery } from "react-responsive";

export default function TeamListTab(){
	const isSmallerThan_1419 = useMediaQuery({ maxWidth: 1419 });
	const isSmallerThan_680 = useMediaQuery({ maxWidth: 680 });
	const className = "team-list-tab " + (isSmallerThan_1419 ? "team-list-mobile" : "");
	
	
	const context = useContext(UserContext);
	const teamCount = context.teams.length;
	
	function blurClick(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		if(e.target.className === "team-list-tab-blur") context.setShowTeams(false);
		console.log(e.target.className);
	}
	
	return(
		<>	
			{ isSmallerThan_1419 && !isSmallerThan_680 ?
				<div className="team-list-tab-blur" onClick={(e) => blurClick(e)}>
				</div> :
				<></>
			}
			<div className={className}>
				<div className="team-list-header">
					<span className="team-list-header-label">Teams | { teamCount ? teamCount: "No teams found" }</span>
				</div>
				<hr />
				<Section />
			</div>
		</>
	)
}