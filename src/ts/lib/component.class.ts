/**
 * Represents a custom component. Contains useful props/methods to help create
 * dynamic html elements.
 */
export default abstract class Component {
	node: HTMLElement;
	appended = false;

	constructor(
		public entryNode: HTMLElement
	) {
		this.node = document.createElement("div");
		this.node.classList.add("component");
	}

	setHtml(html: string) {
		this.node.innerHTML = html;
		if (!this.appended) {
			this.entryNode.appendChild(this.node);
			this.appended = true;
		}
	}

	create(_props: any) { } //TODO ---> look up how to fix this

	destroy() { //TODO ---> remove event listeners?
		this.setHtml(""); //potentially unnecessary
		this.entryNode.removeChild(this.node);
		this.appended = false;
	}
}