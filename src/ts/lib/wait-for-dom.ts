/**
* Waits for DOM to be fully loaded
* @returns Promise that resolves when DOM is fully loaded
*/
export default async () => new Promise<void>(resolve => {
	//already loaded? noice, resolve
	if (document.readyState === "interactive" || document.readyState === "complete") return resolve();

	//not loaded? add event listener then resolve when ready
	document.addEventListener("DOMContentLoaded", function domLoadedCallback() {
		document.removeEventListener("DOMContentLoaded", domLoadedCallback);
		return resolve();
	});
});