import {default as Section} from "./TeamListSection";
//import { useEffect } from "react";
import { useContext, createContext } from "react";
import { SiteContext } from "../App"
import { useMediaQuery } from "react-responsive";

export const ListContext = createContext();

export default function TeamListTab({teams, setTeams, teamSize, currSite}){
	const isSmallerThan_1419 = useMediaQuery({ maxWidth: 1419 });
	const isSmallerThan_680 = useMediaQuery({ maxWidth: 680 });
	const className = "team-list-tab " + (isSmallerThan_1419 ? "team-list-mobile" : "");
	//console.log(setTeams);
	
	const context = useContext(SiteContext);
	const teamCount = teams.length ;
	
	function blurClick(e){
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
		if(e.target.className === "team-list-tab-blur") context.setShowTeams(false);
		console.log(e.target.className);
	}
	
	const value = {
		teamSize, currSite
	}
	
	return(
		<ListContext.Provider value={value}>	
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
				<Section teams={teams} setTeams={setTeams}/>
			</div>
		</ListContext.Provider>
	)
}