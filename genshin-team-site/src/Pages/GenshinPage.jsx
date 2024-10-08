import TeamListTab from "../Components/TeamListTab";
import TeamScreen from "../Components/TeamScreen";
import CharacterModal from "../Components/CharacterModal";
import Header from "../Components/SiteHeader";
//import "../Styles/Page/stylesGenshinIndex.css";
//import "../Styles/TeamScreen/styleGenshinTeamScreen.css"
import { SiteContext } from "../App"

import { Helmet, HelmetProvider } from "react-helmet-async";

import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from 'react-responsive';
import {GenshinCharacterData as data} from "../Data/GenshinCharacters"

export default function GenshinPage({currSite, setFromLocal}){
	const siteContext = useContext(SiteContext);
	let teams = siteContext.teams;
	let setTeams = siteContext.setTeams;
	const teamSize = 4;
	const [travelerPreference, setPreference] = useState(() => localStorage.getItem("TravelerPreference"));
	if(travelerPreference === null || travelerPreference === undefined) localStorage.setItem("TravelerPreference", "M");
	
	function switchPreference(){
			if(travelerPreference === "M"){
				setPreference("F");
				localStorage.setItem("TravelerPreference","F");
			}
			else{
				setPreference("M");
				localStorage.setItem("TravelerPreference","M");
			}
	}
	
	useEffect(() =>{
		setFromLocal();
	},[setFromLocal]);
	
	const isSmallerThan_1419 = useMediaQuery({ maxWidth: 1419 });
	function toggleTeamList(){
		if((isSmallerThan_1419 && siteContext.showTeams) || !isSmallerThan_1419) //render if showTeams is true and smaller than 1419. Render if bigger than 1419
			return <TeamListTab teams={teams} setTeams={setTeams} teamSize={teamSize} currSite={currSite}/>;
		else
			return <></>;
	}
	
	return(
		<HelmetProvider>
			<div className="body-wrapper">
				<Helmet>
					<title>Genshin Impact Team Builder</title>
					<link rel="stylesheet" type="text/css" href="../Styles/Page/stylesGenshinIndex.css" />
					<link rel="stylesheet" type="text/css" href="./Styles/TeamScreen/stylesGenshinTeamScreen.css" />
				</Helmet>
				
				<Header currentSite={currSite} switchPreference={switchPreference}/>
				<div className="content-wrapper">
					{toggleTeamList()}
					<TeamScreen teamSize={teamSize} currSite={currSite}/>
					{ siteContext.modalActive ? 
						(<CharacterModal character={siteContext.currentEditingCharacter} position={siteContext.currentEditingPosition} data={data} currSite={currSite}/>) :
						(<></>)	
					}
				</div>
			</div>
		</HelmetProvider>
	);
}