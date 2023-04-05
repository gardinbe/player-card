import PlayerCardSelectedPlayerComponent from "@/components/player-card/player-card-selected-player.component";
import Component from "@/lib/component";
import CustomSelector from "@/lib/custom-selector";
import { Player } from "@/models/player-card.models";

/**
 * A custom selectbox that switches the visible player card. Created when the
 * selectbox value changes
 */
export default class PlayerCardSelectorComponent extends Component {
	private selector: CustomSelector | null = null;

	constructor(
		entryNode: HTMLElement,
		private selectedPlayerComponent: PlayerCardSelectedPlayerComponent
	) {
		super(entryNode);
	}

	render(props: { players: Player[] }) {
		this.destroy(); //lot of effort to avoid having to do this

		this.setHtml(`
			<div class="player-card--selector">
				<select class="selector">
					${props.players.map(player => `<option value="${player.player.id}">${player.player.name.first} ${player.player.name.last}</option>`).join("")}
				</select>
			</div>
		`);

		const selector = this.getElmt<HTMLSelectElement>(".selector");
		this.selector = new CustomSelector(selector);

		//whenever selector changes, render the newly selected player
		selector.addEventListener("change", () => {
			//get the selected option
			const selectedPlayer = selector.selectedOptions[0];
			if (selectedPlayer === undefined) return;

			//find the corresponding player
			const playerId = selectedPlayer.value;
			const player = props.players.find(player => player.player.id === parseInt(playerId));
			if (player === undefined) throw new Error("Failed to find a player for the provided id!");

			//render this player
			this.selectedPlayerComponent.render({ player });
		});

		//render the first player
		//technically might not be necessary, as selectbox selects the first available option by default, and this fires a change event
		const firstPlayer = props.players[0];
		if (firstPlayer !== undefined) this.selectedPlayerComponent.render({ player: firstPlayer });

		this.markAsRendered();
	}

	destroy() {
		//destroy the custom selector
		if (this.selector !== null) {
			this.selector.destroy();
			this.selector = null;
		}

		super.destroy();
	}
}