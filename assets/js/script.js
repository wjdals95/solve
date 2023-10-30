window.onload = function () {
	//menu click event
	const body = document.getElementsByTagName("body")[0];
	const navBgOverlay = document.querySelector(".nav-drop .bg-overlay");
	const dropdownMenu = document.querySelector(".nav-drop .dropdown-menu");
	const menu = document.querySelector(".menu");
	const bodyWidth = document.documentElement.clientWidth;
	const bodyHeight = document.body.scrollHeight;

	navBgOverlay.style.width = bodyWidth + "px";
	navBgOverlay.style.height = bodyHeight + "px";

	menu.addEventListener("click", () => {
		navBgOverlay.classList.toggle("active");
		dropdownMenu.classList.toggle("active");
		body.classList.toggle("scrollLock");
	});
	navBgOverlay.addEventListener("click", () => {
		navBgOverlay.classList.remove("active");
		dropdownMenu.classList.remove("active");
		body.classList.remove("scrollLock");
	});

	//SHOP DETAILS CLICK EVENT
	const shopDetails = document.querySelectorAll(".content-details li a");
	const shopBgOverlay = document.querySelector(".shop-details-pop .bg-overlay");
	const shopDetailsBox = document.querySelector(
		".shop-details-pop .shop-details"
	);
	const shopClose = document.querySelector(".shop-details .close");

	for (let i = 0; i < shopDetails.length; i++) {
		shopDetails[i].addEventListener("click", (e) => {
			shopBgOverlay.classList.add("active");
			shopDetailsBox.classList.add("show");
			body.classList.add("scrollLock");
			window.scrollTo(0, 0);
			e.preventDefault();
		});
	}
	shopBgOverlay.addEventListener("click", () => {
		shopBgOverlay.classList.remove("active");
		shopDetailsBox.classList.remove("show");
		body.classList.remove('scrollLock');
	});
	shopClose.addEventListener("click", () => {
		shopBgOverlay.classList.remove("active");
		shopDetailsBox.classList.remove("show");
		body.classList.remove("scrollLock");
	});
};
