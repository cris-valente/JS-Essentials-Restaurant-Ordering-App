import {menuArray} from '/data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const heroMain = document.getElementById('hero-main')
const modal = document.getElementById('modal')

document.addEventListener('click', function(e){
    if(e.target.dataset.btnId) {
        addToCartArr(e.target.dataset.btnId, e.target.dataset.btnName, parseInt(e.target.dataset.btnPrice))
    }
    else if(e.target.dataset.removeBtn){
        removeFromCart(e.target.dataset.removeBtn)
    }
    else if(e.target.id === "order-btn"){
        
        modal.classList.remove('hide')
    }
    else if(e.target.id === 'modal-close-btn'){
        modal.classList.add('hide')
    }
    
})

document.addEventListener('submit', function(e){
        e.preventDefault()
        removeFromCart()
        document.getElementById('cart').classList.add('hide')
        modal.classList.add('hide')
        cartArr = []
        renderMsg()
})

let cartArr = []

function addToCartArr(itemId, name, price){
    
    let uuid = uuidv4()
    cartArr.push({itemId, name, price, uuid})
    if (cartArr.length > 0) {
        document.getElementById('cart').classList.remove('hide')
    }
    renderCartArr()
    renderTotal()
    
}

function renderCartArr(){
    listedItems.innerHTML = ''
    return cartArr.map(function(cartItem) {
            listedItems.innerHTML += `
            <div id="${cartItem.uuid}" class="order-list-item">
                <div>
                    <h2>${cartItem.name}</h2><button 
                    class="remove-btn" 
                    data-remove-btn=${cartItem.uuid}>
                    Remove</button>
                </div>
                <div id="total-price">
                    $${cartItem.price}
                </div>
            </div>
            `
    })
}

function removeFromCart(item){
    if(item){
        cartArr = cartArr.filter(menuItem => menuItem.uuid !== item)
    }
    
    if (cartArr.length === 0) {
        document.getElementById('cart').classList.add('hide')
    }
    renderCartArr()
}

function renderTotal(){
    
    const result = cartArr.reduce(function(total, currentElement) {
        return total + currentElement.price
        }, 0)
        return document.getElementById('total-result').innerHTML = "$" + result

}
// the last thing to do:
function renderMsg(){
    document.getElementById('customer-name-in-msg').textContent = ' ' + document.getElementById('name').value
    document.getElementById('confirmation-msg').classList.remove('hide')
    
}


function renderHero(menu){
    const menuItems = menu.map(menuItem => {
    const {name, ingredients, id, price, emoji} = menuItem
    return `
    <div class="container">
        <section class="menu-item">
            <div class="item-img">
                ${emoji}
            </div>
            
            <div class="item-desc">
                <h1>${name}</h1>
                <p>${ingredients.join(', ')}</p>
                <h2>$${price}</h2>
                
            </div>
            
            <div>
                <button 
                class="add-btn" 
                data-btn-id=${id}
                data-btn-name=${name}
                data-btn-price=${price}
                >+</button>
            </div>
        </section>
    </div>
        `
    }).join('')

    const cart = `
        <div id="cart" class="cart hide">
            <div class="container">
                <div class="order-details">
                    <h3>Your order</h3>
                    
                    <div class="order-list" id=listedItems>
                    
                    </div>

                    <div id="complete-order" class="complete-order">
                        <div class="total">
                            <div>
                            <h2>Total price:</h2>
                            </div>
                            <div id="total-result">
                            
                            </div>
                        </div>
                        
                        <button 
                        id="order-btn" 
                        class="order-btn">
                        Complete order!
                        </button>
                    </div>
                </div>
            </div>
        </div>`
        
        return menuItems + cart
}
// maybe create with a function const orderArr = [name, price, quantity]

heroMain.innerHTML = renderHero(menuArray)