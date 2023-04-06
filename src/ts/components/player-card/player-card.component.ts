import PlayerCardSelectedPlayerComponent from "@/components/player-card/player-card-selected-player.component";
import PlayerCardSelectorComponent from "@/components/player-card/player-card-selector.component";
import Component from "@/lib/component";
import { Player } from "@/models/player-card.models";

/**
 * A container component for the card selector component, and for the card component
 */
export default class PlayerCardComponent extends Component {
	render(props: { players: Player[] }) {
		this.destroy(); //lot of effort to avoid having to do this

		this.setHtml(/*html*/`
			<div class="player-card"></div>
		`);

		const container = this.getElmt(".player-card");

		//create child components
		const selectedPlayerComponent = new PlayerCardSelectedPlayerComponent(container);
		this.addChildComponent(selectedPlayerComponent);

		const playerSelectorComponent = new PlayerCardSelectorComponent(container);
		this.addChildComponent(playerSelectorComponent);

		playerSelectorComponent.render({ selectedPlayerComponent, players: props.players });

		this.markAsRendered();
	}
}