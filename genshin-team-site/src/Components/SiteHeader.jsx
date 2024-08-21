import MediaQuery from 'react-responsive';
import { SiteContext } from "../App"
import { useContext } from "react";

export default function SiteHeader({currentSite}){
	const context = useContext(SiteContext);
	const className = "teams-toggle teams-toggle-" + context.showTeams;
	
	return(
		<div className="site-header">
			<div className="site-header-left">
				<MediaQuery maxWidth={1419}>
				  <div className={className} onClick={() => {context.setShowTeams(() => !context.showTeams);
				  context.setModalActive(false); context.saveTeam({notifyUser:false, switchTeams:false})}}>
					Teams
				  </div>
				</MediaQuery>
				{currentSite}
			</div>
			<div className="site-header-right">
				<a href="/" style={{"float":"right", "position":"relative"}}>Home</a>
			</div>
		</div>
	);
}