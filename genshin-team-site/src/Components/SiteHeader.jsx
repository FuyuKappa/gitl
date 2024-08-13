//import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
//import { useState } from 'react';

export default function SiteHeader({currentSite, setShowTeams, showTeams, setModalActive, saveTeam}){
	//const [teamsShow, setTeamsShow] = useState(false);
	const className = "teams-toggle teams-toggle-" + showTeams;
	
	return(
		<div className="site-header">
			<div className="site-header-left">
				<MediaQuery maxWidth={1419}>
				  <div className={className} onClick={() => {setShowTeams(() => !showTeams);
				  setModalActive(false); saveTeam({notifyUser:false, switchTeams:false})}}>
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