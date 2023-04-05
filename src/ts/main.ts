import playerCard from "@/components/player-card/player-card";
import customSelectors from "@/lib/custom-selectors";
import waitForDOM from "@/lib/wait-for-dom";

waitForDOM().then(() => {
	//common
	customSelectors();

	//singletons
	playerCard();
});