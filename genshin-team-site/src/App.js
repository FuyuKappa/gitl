import logo from './logo.svg';
import './App.css';
import TeamListTab from "./Components/TeamListTab";
import TeamScreen from "./Components/TeamScreen";
import './Styles/stylesIndex.css';

export default function App() {
  return (
		<div className="body-wrapper">
			<TeamListTab />
			<TeamScreen />
		</div>
  );
}


