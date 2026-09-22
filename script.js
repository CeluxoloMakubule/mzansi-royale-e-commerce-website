/*menu search */
const menuSearch = document.getElementById("menu-search");
const menuItems = document.querySelectorAll(".menu-item");

if(menuSearch)
{

    menuSearch.addEventListener("input",function()
	{
		const searchValue = this.value.toLowerCase().trim();

		menuItems.forEach(item => {

			const itemName = item.querySelector("h3")?.textContent.toLowerCase() || "";  

			const itemDescription = item.querySelector(".description")?.textContent.toLowerCase() || "";

			const matches = itemName.includes(searchValue) || itemDescription.includes(searchValue);

			if(matches)
			{
				item.style.display ="flex";
			}
			else
			{

				 item.style.display="none";
			}
		});
	});

}

//cart functionality//
let cart = JSON.parse(localStorage.getItem("mzansiRoyaleCart")) ||[];

const cartSidebar = document.getElementById("cart-sidebar"); 
const cartItemsContainer = document.getElementById("cart-items-container"); 
const cartTotalPrice = document.getElementById("cart-total-price"); 
const itemsCount = document.getElementById("items-count");
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

function saveCart() { 
	localStorage.setItem( "mzansiRoyaleCart", JSON.stringify(cart) ); 
	}
//Adding item to the cart//
addToCartButtons.forEach(button => { 
	button.addEventListener("click", () => { 
		const name = button.dataset.name; 
		const price = parseFloat(button.dataset.price); 
		 
		const existingItem = cart.find( item => item.name === name ); 
		if (existingItem) {
			 existingItem.quantity++; 
		} else 
			{ 
				cart.push({ name: name, price: price, quantity: 1 });
			}
			saveCart();
			updateCart();	
			cartSidebar.classList.add("active"); 
	});
 });

 //updating cart display//
 function updateCart() { 
	cartItemsContainer.innerHTML = ""; 
	if (cart.length === 0) { 
		cartItemsContainer.innerHTML = ` <p class="empty-message"> Your cart is empty. </p> `; 
		cartTotalPrice.textContent = "R 0.00"; 
		itemsCount.textContent = "0"; 
		return; 
	}

	let total = 0; 
	let totalItems = 0;

	cart.forEach((item, index) => {
		 const itemTotal = item.price * item.quantity; 
		 total += itemTotal; 
		 totalItems += item.quantity; 
		 const cartItem = document.createElement("div"); 
		 cartItem.classList.add("cart-item-row");

		 cartItem.innerHTML = ` <div class="cart-item-details"> 
		    <strong>${item.name}</strong> 
		    <p> R ${item.price.toFixed(2)} </p> 
		        <div class="quantity-controls"> 
		            <button class="quantity-btn" onclick="changeQuantity(${index}, -1)"> - </button> 
		            <span>${item.quantity}</span> 
		            <button class="quantity-btn" onclick="changeQuantity(${index}, 1)"> + </button> 
		        </div> 
		    </div>


			<div class="cart-item-right"> 
			    <strong> R ${itemTotal.toFixed(2)} </strong> 
				<button class="remove-btn" onclick="removeFromCart(${index})"> Remove </button>
			</div> `; 
			cartItemsContainer.appendChild(cartItem); 
		});

		cartTotalPrice.textContent = `R ${total.toFixed(2)}`; 
		itemsCount.textContent = totalItems;
	 }

	 //Quantity//
	 function changeQuantity(index, amount) { 
		cart[index].quantity += amount; 
		if (cart[index].quantity <= 0) { 
			cart.splice(index, 1);
			 } 
			 saveCart(); 
			 updateCart(); 
		}


        //removing an item//
		function removeFromCart(index){
			cart.splice(index,1);
			saveCart();
			updateCart();
		}

		//Openning and Closing the cart//
		function toggleCartGrid(){
			cartSidebar.classList.toggle("active");
		}

		//Checking out//
		function setupCheckout() { 
			if (cart.length === 0) 
			{ 
			  alert( "Your cart is empty.Add an item before checking out." ); 
			  return; 
			}

			let total =0;
			let orderSummary = "YOUR ORDER\n\n";
            cart.forEach(item => { 
				const itemTotal = item.price * item.quantity; 
				total += itemTotal; 
				orderSummary += `${item.name} x ${item.quantity} ` + `- R ${itemTotal.toFixed(2)}\n`; 
			});

			orderSummary += `\nTOTAL: R ${total.toFixed(2)}`;

          alert(orderSummary);

		 const confirmOrder = confirm( "Would you like to confirm your order?" ); 
		 if (confirmOrder) { 
			alert( "Thank you for ordering from Mzansi Royale!\n\n" + "Your order is being Prepared." );
			cart = []; localStorage.removeItem( "mzansiRoyaleCart" );
			updateCart();
			cartSidebar.classList.remove("active"); 
			} 
		} 

		updateCart();


//COMPLAINTS / SUGGESTIONS FORM//

const contactForm = document.querySelector(".complaints-form form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        
        event.preventDefault();

        const name = document
            .getElementById("name")
            .value
            .trim();

        const email = document
            .getElementById("email")
            .value
            .trim();

        const message = document
            .getElementById("message")
            .value
            .trim();

        if (name === "") {
            alert("Please enter your name.");
            return;
        }


     
        if (email === "") {
            alert("Please enter your email address.");
            return;
        }

        const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (message === "") {
            alert("Please enter your complaint or suggestion.");
            return;
        }

        if (message.length < 10) {
            alert(
                "Please provide a little more detail " +
                "about your complaint or suggestion."
            );
            return;
        }


        alert(
            `Thank you, ${name}!\n\n` +
            "Your complaint/suggestion has been received.\n\n" +
            "The Mzansi Royale team will get back to you soon."
        );

        contactForm.reset();

    });

}
```


