window.onload = function () {
	//menu click event

	const bgOverlay = document.querySelector(".bg-overlay");
	const dropdownMenu = document.querySelector(".dropdown-menu");
	const menu = document.querySelector(".menu");
	const bodyWidth = document.documentElement.clientWidth;
	const bodyHeight = document.body.scrollHeight;

	bgOverlay.style.width = bodyWidth + "px";
	bgOverlay.style.height = bodyHeight + "px";

	menu.addEventListener("click", () => {
		bgOverlay.classList.toggle("active");
		dropdownMenu.classList.toggle("active");
	});
	bgOverlay.addEventListener("click", () => {
		bgOverlay.classList.remove("active");
		dropdownMenu.classList.remove("active");
	});

	//filter event
	const categoryBtn = document.querySelector(".filter-btns");
	const categoryItems = document.querySelectorAll(".filter-items .item");
	const categoryItemsBox = document.querySelector(".filter-items");
	categoryBtn.addEventListener("click", (e) => {
		const filter = e.target.dataset.filter;
		// console.log(filter);

		if (filter == null) {
			return;
		}

		const active = document.querySelector(".category-btn.selected");
		active.classList.remove("selected");

		const target =
			e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
		target.classList.add("selected");

		categoryItemsBox.classList.add("anim-out");

		setTimeout(() => {
			categoryItems.forEach((item) => {
				if (filter === "*" || filter === item.dataset.type) {
					item.classList.remove("unselected");
				} else {
					item.classList.add("unselected");
				}
				categoryItemsBox.classList.remove("anim-out");
				categoryItemsBox.classList.add("anim-in");
			}, 300);
		});
	});
};
