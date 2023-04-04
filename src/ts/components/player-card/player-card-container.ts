import PlayerCardSelector from "@/components/player-card/player-card-selector.component";
import PlayerCard from "@/components/player-card/player-card.component";
import Component from "@/lib/component.class";
import { Player } from "@/models/player-card.models";

/**
 * A container component for the card selector component, and for the card component
 */
export default class PlayerCardContainer extends Component {
	selector: PlayerCardSelector | null = null;
	player: PlayerCard | null = null;

	create(props: {
		selector: {
			players: Player[]
		}
	}) {
		this.setHtml(`<div class="player-card-container"></div>`);

		const container = this.node.querySelector<HTMLElement>(".player-card-container");
		if (container === null) throw new Error("Failed to find generated player card container!");

		this.player = new PlayerCard(container);
		this.selector = new PlayerCardSelector(container, this.player);
		this.selector.create(props.selector);
	}

	destroy() {
		super.destroy();

		this.selector = null;
		this.player = null;
	}
}