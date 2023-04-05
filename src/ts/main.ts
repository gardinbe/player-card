import waitForDOM from "@/lib/wait-for-dom";
import createPlayerCard from "@/player-card";

waitForDOM().then(() => {
	//components
	createPlayerCard();
});