type CustomSelectorOption = {
	elmt: HTMLElement,
	originalElmt: HTMLOptionElement,
	value: string | null
}

/** 
 * A custom selectbox that styles better than the standard one
 * 
 * Underneath, it still uses a standard selectbox which gets updated alongside this
 * one, so formdata still works
 */
export default class CustomSelector {
	private opened = false;
	private options: CustomSelectorOption[] = [];
	private selectedOption: CustomSelectorOption | null = null;

	private elmt: HTMLElement;
	private selectedOptionElmt: HTMLElement;
	private optionListElmt: HTMLElement;

	private transitionDuration: number;

	private windowClick: (ev: MouseEvent) => void;

	constructor(
		private originalSelectElmt: HTMLSelectElement
	) {
		this.elmt = this.generate.elmt();

		//put attributes currently on the selectbox onto the containing elmt
		for (const attribute of this.originalSelectElmt.attributes) {
			this.elmt.setAttribute(attribute.name, attribute.value);
			this.originalSelectElmt.removeAttribute(attribute.name);
		}

		//and then replace the selectbox with this containing elmt
		this.originalSelectElmt.replaceWith(this.elmt);
		this.elmt.appendChild(this.originalSelectElmt);

		//generate the custom elements
		this.optionListElmt = this.generate.optionList();
		this.selectedOptionElmt = this.generate.selectedBox();

		//generate the custom option elements using the original options
		const originalOptionElmts = Array.from(this.originalSelectElmt.options);
		for (const option of originalOptionElmts.map(originalOptionElmt => this.generate.option(originalOptionElmt))) this.addOption(option);

		//if it exists, select the originally selected option
		const originalSelectedOption = originalOptionElmts.find(optionElmt => optionElmt.selected);
		if (originalSelectedOption !== undefined) {
			const selectedOption = this.options.find(option => option.value === originalSelectedOption.value);
			if (selectedOption === undefined) throw new Error("Failed to get default selected option from select box!");
			this.selectOption(selectedOption);
		}

		//custom elements are ready: add them to the DOM now
		this.elmt.appendChild(this.selectedOptionElmt);
		this.elmt.appendChild(this.optionListElmt);

		//get the calculated transition duration for the options menu after adding to the DOM
		this.transitionDuration = parseFloat(getComputedStyle(this.optionListElmt).transitionDuration) * 1000;

		//close when clicking off
		this.windowClick = ((ev: MouseEvent) => {
			const target = ev.target as HTMLElement;
			if (target === this.selectedOptionElmt || !this.opened || this.elmt.contains(target)) return;
			this.close();
		});
		window.addEventListener("click", this.windowClick);
	}

	open() {
		this.opened = true;
		this.elmt.classList.add("opened");
	}

	close() {
		this.opened = false;
		this.elmt.classList.remove("opened");
	}

	toggle() {
		if (this.opened) {
			this.close();
		} else {
			this.open();
		}
	}

	addOption(option: CustomSelectorOption) {
		this.options.push(option);
		this.optionListElmt.appendChild(option.elmt);
	}

	removeOption(option: CustomSelectorOption) {
		this.options.splice(this.options.indexOf(option), 1);
		this.optionListElmt.removeChild(option.elmt);
	}

	selectOption(option: CustomSelectorOption) {
		//add new option text to the selected option box
		const selectedOptionTextNode = this.selectedOptionElmt.childNodes[0];
		if (selectedOptionTextNode === undefined) throw new Error("Error trying to set selected item text content!");
		selectedOptionTextNode.textContent = option.elmt.textContent;

		//update original select box
		this.originalSelectElmt.selectedIndex = -1;
		option.originalElmt.selected = true;
		this.originalSelectElmt.dispatchEvent(new Event("change"));

		//update the selected option
		const previouslySelectedOption = this.selectedOption;
		this.selectedOption = option;

		this.close();

		setTimeout(() => {
			//show previous option to the list, and hide the new one
			if (this.selectedOption === null) return;

			this.selectedOption.elmt.classList.add("selected");
			if (previouslySelectedOption !== null) previouslySelectedOption.elmt.classList.remove("selected");

		}, this.transitionDuration);
	}

	/**
	 * Removes event listeners that are **not** attached to elements generated by this
	 * class
	 */
	destroy() {
		window.removeEventListener("click", this.windowClick);
	}

	private generate = {
		elmt: (): HTMLElement => {
			const elmt = document.createElement("div");
			return elmt;
		},
		selectedBox: (): HTMLElement => {
			const selectedBox = document.createElement("span");
			selectedBox.classList.add("selected-option");
			selectedBox.textContent = "Please select...";
			const icon = document.createElement("i");
			icon.classList.add("fa-solid", "fa-chevron-down");
			selectedBox.appendChild(icon);
			selectedBox.addEventListener("click", this.toggle.bind(this));
			return selectedBox;
		},
		optionList: (): HTMLElement => {
			const optionList = document.createElement("ul");
			optionList.classList.add("options");
			return optionList;
		},
		option: (originalElmt: HTMLOptionElement): CustomSelectorOption => {
			const elmt = document.createElement("li");
			elmt.textContent = originalElmt.textContent;
			elmt.classList.add("option");
			const option: CustomSelectorOption = { elmt, originalElmt, value: originalElmt.value };
			option.elmt.addEventListener("click", this.selectOption.bind(this, option));
			return option;
		}
	}
}