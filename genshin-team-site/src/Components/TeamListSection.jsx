import {default as Container} from "./TeamContainer";
import {CookiesProvider, useCookies} from 'react-cookie';
import {default as NewTeamButton} from "./NewTeamButton";

export default function TeamListSection(){
	const [cookies, setCookie] = useCookies(['user']);
	
	{/*
	user enters site
		no cookies
			have to make cookies; made when adding team
		yes cookies
			read the cookies
	
	When CRUD team or character
		update cookies
	*/}
	
	function updateCookies(list){
		setCookie('user', list, { path: '/'});
		console.log(cookies)
	}
		
	return(
		<CookiesProvider>
			<div className="team-list-section">
			{/*
				//map the the teams
					//{teams.map}() => {return(teamcontainer)}
					//Add team list button (add team box)
			*/}
				<Container name={"Team 1"} id={1} characters={["Hu Tao", "Yanfei", "Yelan", "Barbara"]}/>
				<Container name={"Team 2"} id={2} characters={["Ganyu", "Hu Tao", "Yelan", "Barbara"]}/>
				<NewTeamButton addFunction={updateCookies} />
			</div>
		</CookiesProvider>
	)
}