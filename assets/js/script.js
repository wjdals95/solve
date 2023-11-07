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

	//cart event
	const cart = document.querySelector(".cart");
	const cartBgOverlay = document.querySelector(".cart-details-pop .bg-overlay");
	const cartDetails = document.querySelector(".cart-details-pop .cart-details");
	const cartClose = document.querySelector(".cart-details .close");

	cart.addEventListener("click", (e) => {
		cartBgOverlay.classList.add("active");
		cartDetails.classList.add("show");
		body.classList.add("scrollLock");
		window.scrollTo(0, 0);
		e.preventDefault();
	});
	cartClose.addEventListener("click", () => {
		cartBgOverlay.classList.remove("active");
		cartDetails.classList.remove("show");
		body.classList.remove("scrollLock");
	});
	cartBgOverlay.addEventListener("click", () => {
		cartBgOverlay.classList.remove("active");
		cartDetails.classList.remove("show");
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
		body.classList.remove("scrollLock");
	});
	shopClose.addEventListener("click", () => {
		shopBgOverlay.classList.remove("active");
		shopDetailsBox.classList.remove("show");
		body.classList.remove("scrollLock");
	});

	const minus = document.querySelector(".minus img");
	const plus = document.querySelector(".plus img");
	const numValue = document.querySelector(".num-value");

	window.addEventListener("click", (e) => {
		if (e.target == plus) {
			++numValue.value;
		}
		if (e.target == minus) {
			if (numValue.value > 1) {
				--numValue.value;
			} else {
				numValue.value = 1;
			}
			// console.log(numValue.value);
		}
	});

	// Cart Working JS
	if (document.readyState == "loading") {
		document.addEventListener("DOMContentLoaded", ready);
	} else {
		ready();
	}

	// Making Function
	function ready() {
		// Remove Items From Cart
		var removeCartButtons = document.getElementsByClassName("remove");
		console.log(removeCartButtons);
		for (let i = 0; i < removeCartButtons.length; i++) {
			var button = removeCartButtons[i];
			button.addEventListener("click", removeCartItem);
		}
		// Quantity Changes
		var quantityInputs = document.getElementsByClassName("cart-num");
		for (let i = 0; i < quantityInputs.length; i++) {
			var input = quantityInputs[i];
			input.addEventListener("change", quantityChanged);
		}
		// Add To Cart
		var addCart = document.getElementsByClassName("add-cart");
		for (let i = 0; i < addCart.length; i++) {
			var button = addCart[i];
			button.addEventListener("click", addCartClicked);
		}
		// Buy Button Work
		document
			.getElementsByClassName("btn-buy")[0]
			.addEventListener("click", buyButtonClicked);
	}
	//Remove Items From Cart
	function removeCartItem(event) {
		var buttonClicked = event.target.parentElement;
		buttonClicked.parentElement.remove();
		updateTotal();
	}
	// Quantity Changes
	function quantityChanged(event) {
		var input = event.target;
		if (isNaN(input.value) || input.value <= 0) {
			input.value = 1;
		}
		updateTotal();
	}
	//Add To Cart
	function addCartClicked(event) {
		var button = event.target;
		var shopProducts = button.parentElement;
		var title =
			shopProducts.parentElement.getElementsByClassName("product-title")[0]
				.innerText;
		var price =
			shopProducts.parentElement.getElementsByClassName("product-price")[0]
				.innerText;
		var productImg =
			shopProducts.parentElement.parentElement.getElementsByClassName(
				"product-img"
			)[0].src;
			var productNum = shopProducts.getElementsByClassName("num-value")[0].value;
		addProductToCart(title, price, productImg, productNum);
		updateTotal();
	}
	function addProductToCart(title, price, productImg, productNum) {
		var cartShopBox = document.createElement("div");
		cartShopBox.classList.add("cart-product");
		var cartItems = document.getElementsByClassName("cart-products")[0];
		var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
		for (let i = 0; i < cartItemsNames.length; i++) {
			if (cartItemsNames[i].innerText == title) {
				alert("You have already add this item to cart");
				return;
			}
		}
		var cartBoxContent = `
                <img src="${productImg}" alt="">
								<div class="cart-text-box">
									<div class="cart-title">
										<h5 class="cart-product-title">${title}</h5>
										<h6 class="cart-price">${price}</h6>
									</div>
									<button class="remove">remove</button>
								</div>
								<input type="number" value="${productNum}" class="cart-num"></input>`;
		cartShopBox.innerHTML = cartBoxContent;
		cartItems.append(cartShopBox);
		cartShopBox
			.getElementsByClassName("remove")[0]
			.addEventListener("click", removeCartItem);
		cartShopBox
			.getElementsByClassName("cart-num")[0]
			.addEventListener("change", quantityChanged);
	}
	// Buy Button
	function buyButtonClicked() {
		alert("Your Order is placed");
		var cartContent = document.getElementsByClassName("cart-products")[0];
		while (cartContent.hasChildNodes()) {
			cartContent.removeChild(cartContent.firstChild);
		}
		updateTotal();
	}
	// Update Total
	function updateTotal() {
		var cartContent = document.getElementsByClassName("cart-products")[0];
		var cartBoxes = document.getElementsByClassName("cart-product");
		var total = 0;
		for (let i = 0; i < cartBoxes.length; i++) {
			var cartBox = cartBoxes[i];
			var priceElement = cartBox.getElementsByClassName("cart-price")[0];
			var quantityElement = cartBox.getElementsByClassName("cart-num")[0];
			var price = parseFloat(priceElement.innerText.replace("$", ""));
			var quantity = quantityElement.value;
			total = total + price * quantity;
		}
		// If Price Contain Some Cents Value
		total = Math.round(total * 100) / 100;

		document.getElementsByClassName("total-price")[0].innerText = "$ " + total + " USD";
	}
};
