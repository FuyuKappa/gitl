export default function ContainerCharacterPortrait({character}){
	return(
		<div className="container-character-portrait">
			<img src={"./Portraits/" + character + ".png"} />
			<div className="container-character-bg"></div>
		</div>
	)
}