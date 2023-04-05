import PlayerCard from "@/components/player-card/player-card.component";
import Component from "@/lib/component";
import { CustomSelector } from "@/lib/custom-selectors";
import { Player } from "@/models/player-card.models";


/**
 * A custom selectbox that switches the visible player card. Created when the
 * selectbox value changes
 */
export default class PlayerCardSelector extends Component {
	constructor(
		entryNode: HTMLElement,
		public playerCard: PlayerCard
	) {
		super(entryNode);
	}

	create(props: {
		players: Player[]
	}) {
		this.setHtml(`
			<div class="player-card-selector">
				<select class="selector">
					${props.players.map(player => `<option value="${player.player.id}">${player.player.name.first} ${player.player.name.last}</option>`).join("")}
				</select>
			</div>
		`);

		const selector = this.node.querySelector<HTMLSelectElement>(".selector");
		if (selector === null) throw new Error("Failed to find generated selector element!");

		//whenever selector changes, render the newly selected player
		selector.addEventListener("change", () => {
			//get the selected option
			const selectedPlayer = selector.selectedOptions[0];
			if (selectedPlayer === undefined) return;

			//find the corresponding player
			const playerId = selectedPlayer.value;
			const player = props.players.find(player => player.player.id === parseInt(playerId));
			if (player === undefined) throw new Error("Failed to find a player for the provided id!");

			//display this player
			this.playerCard.create({ player });
		});

		new CustomSelector(selector);
	}
}