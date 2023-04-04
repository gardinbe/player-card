import customSelectors from "@/components/common/custom-selectors";
import playerCard from "@/components/player-card/player-card";
import waitForDOM from "@/lib/waitForDOM";

waitForDOM().then(() => {
	//common
	customSelectors();

	//singletons
	playerCard();
});