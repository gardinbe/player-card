import Component from "@/lib/component";
import { printIf } from "@/lib/ternary-shorthands";

/**
 * A loading wheel that appears over the player card container while we wait for
 * promises to resolve
 */
export default class LoaderComponent extends Component {
	create(props: {
		fullscreen: boolean
	} = { fullscreen: false }) {
		this.setHtml(`<div class="loader-container ${printIf(props.fullscreen, "fullscreen")}"><div class="loader"></div></div>`);
	}
}