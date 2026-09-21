document.addEventListener('DOMContentLoaded', () =>{
  initCart();
  highlightActivePage();
  setupButtonEffects();
  setupMenuButtons();
});

function initCart(){
    const itemsCountSpan = document.getElementById('items-count');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartBtn = document.querySelector('.cart-btn');

    let currentCount = parseInt(localStorage.getItem('items-count')) || 0;
    if(itemsCountSpan) 
        itemsCountSpan.textContent = currentCount;

    window.toggleCartGrid = function() {
        if (cartSidebar) {
            cartSidebar.classList.toggle('active');
        }
    };

    document.addEventListener('click', (event) => {
        if (cartSidebar && cartSidebar.classList.contains('active')) {
            
            if (!cartSidebar.contains(event.target) && !cartBtn.contains(event.target)) {
                window.toggleCartGrid();
            }
        }
    });
}



