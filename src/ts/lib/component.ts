/**
 * A custom component. Contains useful props/methods to help create dynamic
 * html elements
 */
export default abstract class Component {
	private node: HTMLElement;
	private childComponents?: Component[];
	private rendered = false;
	private hidden = false;

	constructor(
		protected entryNode: HTMLElement
	) {
		this.node = document.createElement("div");
		this.node.classList.add("component");
	}

	protected markAsRendered() {
		this.rendered = true;
	}

	/**
	 * Set the HTML contents for the component. Should be called from within
	 * `create()`
	 */
	protected setHtml(html: string) {
		if (this.rendered) throw new Error("Can't set component HTML: Component has already been rendered, and should be destroyed first!");

		this.node.innerHTML = html;
		this.entryNode.appendChild(this.node);
	}

	/**
	 * A shorthand querySelector that throws an error if the element can't be found.
	 * Should be called from within `create()`
	 */
	protected getElmt<T extends HTMLElement>(selector: string) {
		const elmt = this.node.querySelector<T>(selector);
		if (elmt === null) throw new Error("Failed to retrieve generated element!");
		return elmt;
	}

	/**
	 * Define child component(s) of this component. If a component's children isn't
	 * defined, then invoking `destroy()` may fail to destroy these children correctly
	 */
	protected addChildComponent(...components: Component[]) {
		if (this.childComponents === undefined) this.childComponents = [];
		for (const component of components) this.childComponents.push(component);
	}

	/**
	 * Render the component with the provided props (if present)
	 */
	render(_props?: {}) { }

	/**
	 * Remove the component's elements and event listeners
	 */
	destroy() {
		if (this.rendered === false) return;

		if (this.childComponents !== undefined) for (const childComponent of this.childComponents) childComponent.destroy();

		this.rendered = false;
		this.setHtml(""); //this removes event listeners
		this.entryNode.removeChild(this.node);
	}

	show() {
		this.node.style.display = "";
		this.hidden = false;
	}

	hide() {
		this.node.style.display = "none";
		this.hidden = true;
	}

	toggleVisibility() {
		if (this.hidden) {
			this.show();
		} else {
			this.hide();
		}
	}
}