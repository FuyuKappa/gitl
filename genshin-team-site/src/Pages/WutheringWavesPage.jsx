import TeamListTab from "../Components/TeamListTab";
import TeamScreen from "../Components/TeamScreen";
import CharacterModal from "../Components/CharacterModal";
import Header from "../Components/SiteHeader";
import { SiteContext } from "../App"
import { createContext, useEffect, useContext } from "react";
import { useMediaQuery } from 'react-responsive';

export const UserContext = createContext();

export default function WutheringWavesPage({currSite, setFromLocal}){
	const siteContext = useContext(SiteContext);
	let teams = siteContext.teams;
	let setTeams = siteContext.setTeams;
	console.log(teams);
	useEffect(() =>{
		setFromLocal();
	},[setFromLocal]);
	
	const isSmallerThan_1419 = useMediaQuery({ maxWidth: 1419 });
	function toggleTeamList(){
		if((isSmallerThan_1419 && siteContext.showTeams) || !isSmallerThan_1419) //render if showTeams is true and smaller than 1419. Render if bigger than 1419
			return <TeamListTab teams={teams} setTeams={setTeams}/>;
		else
			return <></>;
	}
	
	return(
			<div className="body-wrapper">
				<Header currentSite={currSite} />
				<div className="content-wrapper">
					{toggleTeamList()}
					<TeamScreen currentTeam={siteContext.team}/>
					{ siteContext.modalActive ? 
						(<CharacterModal character={siteContext.currentEditingCharacter} position={siteContext.currentEditingPosition}/>) :
						(<></>)	
					}
				</div>
			</div>
	);
}