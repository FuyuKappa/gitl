//import { useMediaQuery } from 'react-responsive';
import MediaQuery from 'react-responsive';
//import { useState } from 'react';

export default function SiteHeader({setShowTeams, showTeams, setModalActive}){
	//const [teamsShow, setTeamsShow] = useState(false);
	const className = "teams-toggle teams-toggle-" + showTeams;
	
	return(
		<div className="site-header">
			<MediaQuery maxWidth={1419}>
			  <div className={className} onClick={() => {setShowTeams(() => !showTeams); setModalActive(false)}}>
				Teams
			  </div>
			</MediaQuery>
			Genshin Teams
		</div>
	);
}