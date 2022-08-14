const hamburgerMenu = document.querySelector (".hamburger-div")
const hamburgerInnerMenu = document.querySelector (".hamburger-div .menu")
const cart = document.querySelector (".cart")
const heroText = document.querySelector (".hero-text")
const carouselSlide = document.querySelector (".carousel-slide")
const carouselImages = document.querySelectorAll (".carousel-slide img")
const mainImage = document.querySelector (".main-image")
const overlay = document.querySelector (".overlay-image")
const amount = document.querySelector (".amount")
const emptyCart = document.querySelector (".empty")
const cartContent = document.querySelector (".selected-products")

const hamburgerBtn = document.querySelector (".hamburger")
const cartBtn = document.querySelector (".cart-btn")
const crossBtn = document.querySelector (".cross-btn")
const crossBtn2 = document.querySelector (".cross-btn2")
const prevBtn = document.querySelector ("#prevBtn")
const nextBtn = document.querySelector ("#nextBtn")
const plus = document.querySelector (".plus")
const minus = document.querySelector (".minus")
const checkout = document.querySelector (".checkout")

let counter  = 0
let tempCount  = 0
let cartSize = 0
let size = 0

window.innerWidth < 375 ? size = window.innerWidth : size = 375

let Cart = []

function renderCart () { 
    (Cart.length != 0) ? cart.style.overflowY = "scroll" : cart.style.overflow = "hidden";
    
    let content = ""

    for (let i = 0; i  < Cart.length; i++) {
        content += `<li>
                        <div class="product-image">
                            <img src="./images/image-product-${i + 1}-thumbnail.jpg" alt="product image">
                        </div>
                            
                        <div class="details">
                            <h6 class="product-title">${Cart[i].name}</h6>
                            <span class="price-cart">$${Cart[i].price}.00 x ${Cart[i].count}</span>
                            <span class="total-price">$${parseInt(Cart[i].price) * Cart[i].count}.00</span>
                        </div>
                        
                        <button class="delete">
                            <img src="./images/icon-delete.svg" alt="delete btn" id=${i} class="deleteBtn">
                        </button>
                    </li>`
    }

    cartContent.innerHTML = content
}

document.body.addEventListener("click", event => {
    if (event.target.classList.contains("deleteBtn")) {
        let el = event.target.parentElement.parentElement

        Cart.splice (parseInt(event.target.id), 1)

        el.remove ()

        tempCount = 0

        renderAmount (0)

        cartBtn.setAttribute("data-count", --cartSize) 

        if (cartContent.textContent === "") emptyCart.classList.remove ("hidden")

        if (Cart.length === 0) cart.style.overflow = "hidden"
    }
})

const renderAmount = quantity => amount.innerHTML = quantity

plus.addEventListener ("click", () => renderAmount (++tempCount))
minus.addEventListener ("click", () => tempCount - 1 >= 0 ? renderAmount (--tempCount) : alert("Error!"))

hamburgerBtn.addEventListener ("click", () => {
    hamburgerInnerMenu.classList.remove ("hamburgerAnimation2")
    hamburgerMenu.classList.remove ("hidden")
    hamburgerInnerMenu.classList.add ("hamburgerAnimation1")
})

crossBtn.addEventListener ("click", () => {
    hamburgerInnerMenu.classList.remove ("hamburgerAnimation1")
    hamburgerInnerMenu.classList.add ("hamburgerAnimation2")
    
    setTimeout (() => hamburgerMenu.classList.add ("hidden"), 300)
})

crossBtn2.addEventListener ("click", () => {
    overlay.classList.add ("hidden")
})

mainImage.addEventListener ("click", () => {
    overlay.classList.remove ("hidden")
    overlay.classList.add ("opacityAnimationShow")

})

nextBtn.addEventListener ("click", () => {
    carouselSlide.style.transition = `transform 0.4s ease-in-out`
    counter++
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

prevBtn.addEventListener ("click", () => {
    carouselSlide.style.transition = `transform 0.4s ease-in-out`
    counter--
    carouselSlide.style.transform = `translateX(${-size * counter}px)`
})

carouselSlide.addEventListener ("transitionend", () => {
    (counter > 0) ? prevBtn.style.display = "block" : prevBtn.style.display = "none";
    (counter === carouselImages.length - 1) ? nextBtn.style.display = "none" : nextBtn.style.display = "block"
})

cartBtn.addEventListener ("click", () => {
    cart.classList.toggle ("hidden")
    cart.classList.toggle ("cartAnimation")

    if (cartSize > 0) {
        emptyCart.classList.add ("hidden")
        renderCart ()
    }
    else {
        emptyCart.classList.remove ("hidden")
        cart.style.overflow = "hidden";
    }
})

checkout.addEventListener ("click", () => {
    if (tempCount > 0) {
        Cart.push ({
            id: Cart.length + 1,
            name: document.querySelector (".product-name").textContent,
            price: document.querySelector (".price span").textContent,
            count: 0,
            total: 0
        })

        Cart[cartSize].count = tempCount

        tempCount = 0

        renderAmount (tempCount)

        checkout.textContent = "Added!"

        setTimeout (() => {
            checkout.textContent = "Add to Cart"
        }, 1000)

        cartBtn.setAttribute("data-count", ++cartSize) 
    }
    else alert ("You did not select anything!")
})
