import LoaderComponent from "@/components/common/loader.component";
import PlayerCardComponent from "@/components/player-card/player-card.component";
import delay from "@/lib/delay";
import { PlayerData } from "@/models/player-card.models";

const createPlayerCard = async () => {
	const entryNode = document.getElementById("player-card-entry-node");
	if (entryNode === null) throw new Error("Failed to find player card entry point!");

	//create the loader
	const loader = new LoaderComponent(entryNode);
	loader.render({ fullscreen: true });

	//read player data from json
	const data = await getPlayerData();
	const players = data.players;

	//destroy the loader
	loader.destroy();

	//create the player card container
	const playerCard = new PlayerCardComponent(entryNode);
	playerCard.render({ players });
}
export default createPlayerCard;

/**
 * Fetch player data from API
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