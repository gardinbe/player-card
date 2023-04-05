import LoaderComponent from "@/components/common/loader.component";
import PlayerCardContainer from "@/components/player-card/player-card-container.component";
import delay from "@/lib/delay";
import { PlayerData } from "@/models/player-card.models";

export default async () => {
	const entryNode = document.getElementById("player-card-entry-node");
	if (entryNode === null) throw new Error("Failed to find player card entry point!");

	//define components
	const loader = new LoaderComponent(entryNode);
	const playerCardContainer = new PlayerCardContainer(entryNode);

	//create the loader
	loader.create({ fullscreen: true });

	//read player data from json
	const data = await getPlayerData();
	const players = data.players;

	//destroy the loader
	loader.destroy();

	//create the player card container. note that the first player is rendered when the page loads: selectboxes will select the first option by default
	playerCardContainer.create({
		selector: {
			players
		}
	});
}

/**
 * Fetch player data from API
 * @returns Promise for a PlayerData object
 */
const getPlayerData = async (): Promise<PlayerData> => {
	const res = await fetch("/static/data/player-stats.json").then(res => {
		if (!res.ok) throw new Error("Response was not OK!");
		return res;
	}).catch(e => {
		throw new Error(`Failed to retrieve player data! - ${e}`);
	});
	await delay(1500);
	return await res.json();
}