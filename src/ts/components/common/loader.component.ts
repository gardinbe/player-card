import Component from "@/lib/component";
import { printIf } from "@/lib/ternary-shorthands";

/**
 * A loading wheel that appears over the player card container while we wait for
 * promises to resolve
 */
export default class LoaderComponent extends Component {
	render(props: { fullscreen: boolean } = { fullscreen: false }) {
		this.destroy(); //lot of effort to avoid having to do this

		this.setHtml(/*html*/`
			<div class="loader-container ${printIf(props.fullscreen, "fullscreen")}">
				<div class="loader"></div>
			</div>
		`);

		this.markAsRendered();
	}
}