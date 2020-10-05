const itemsContainer = document.getElementById('items')
import data from './data.js'
// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
//     // create a new div element and give it a class name
//     let newDiv = document.createElement('div');
//     newDiv.className = 'item'

//     // create an image element
//     let img = document.createElement('img');
//     // this will change each time we go through the loop. Can you explain why?
//     img.src = data[i].image
//     img.width = 300
//     img.height = 300
//     // Add the image to the div
//     newDiv.appendChild(img)
//     console.log(img)
// }

// for (let i=0; i<data.length; ++i) {
//     let newDiv = document.createElement('div');
//       newDiv.className = 'item'
//     // display the image
//     let img = document.createElement('img');
//     img.src = data[i].image
//     img.width = 300
//     img.height = 300
//     newDiv.appendChild(img)
  
//     let desc = document.createElement('P')
//     desc.innerText =data[i].desc
//     newDiv.appendChild(desc)
//     let price = document.createElement('P')
//     price.innerText = data[i].price
//     newDiv.appendChild(price)
  
//     let button = document.createElement('button')
//     button.id = data[i].name
  
//     // creates a custom attribute called data-price.
//     // That will hold the price for each element in the button
//     button.dataset.price = data[i].price
//     button.innerHTML = "Add to Cart"
//     newDiv.appendChild(button)
//     // put new div inside items container
//     itemsContainer.appendChild(newDiv)
//   }

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')

console.log(itemList)
itemList.innerHTML = '<li> Hello World</li>'

const cart = []

const obj = {}
       // add Item 




function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name ) {
            cart[i].qty += 1
            showItems()
            return
        }
    }
    const item = { name: name, price: price, qty: 1 }
    cart.push(item)
}


function showItems() {
  const qty = getQty()
  cartQty.innerHTML = `You have ${qty} items in your cart!`
  let itemStr = ''
  for (let i = 0; i < cart.length; i += 1) {
      const {name, price, qty} = cart[i]

      console.log(`-${cart[i].name} $${cart[i].price} x ${cart[i].qty}`)
      itemStr += `<li>${name} $${price} x ${qty} = ${qty * price} 
      <button class="remove" data-name="${name}">Remove</button>
      <button class="add-one" data-name="${name}"> + </button>
      <button class="remove-one" data-name="${name}"> - </button>
      <input class= "update" type="number" min="0" data-name="${name}">
      </li>`
  }
  itemList.innerHTML = itemStr
  const total = getTotal()
  cartTotal.innerHTML = `Your total in cart: $${getTotal()}`
}
      // ------------------------------------------------------
      // get a total
function getTotal () {
  let total = 0
  for (let i =0; i <cart.length; i += 1) {
      total += cart[i].price * cart[i].qty
  }
  return total.toFixed(2)
}
      // ------------------------------------------------------
      // get quanity
function getQty() {
  let qty = 0
  for (let i = 0; i < cart.length; i += 1) {
      qty += cart[i].qty
  }
  return qty
}
      // ------------------------------------------------------

        // remove an item
function removeItem(name, qty = 0) {
  for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
          if (qty > 0) {
              cart[i].qty -= qty
          }
          if (cart[i].qty === 0 || qty === 0 ) {
              cart.splice(i, 1)
          }
          showItems()
          return
      }
  }
}
function updateCart(name,qty) {
  for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
          if (qty< 1) {
              removeItem(name)
              return
          }
      }
      cart[i].qty = qty
      showItems()
      return
  }
}
      // ------------------------------------------------------
itemList.onchange = function(e) {
  if (e.target.classList.contains('update')) {
      const name = e.target.dataset.name
      const qty = parseInt(e.target.value)
      updateCart(name, qty)
  }
}

itemList.onclick = function(e) {
  console.log("clickedList")
  console.log(e.target)
  if (e.target &&e.target.classList.contains('remove')) {
      const name = e.target.dataset.name
      removeItem(name)
  } else if (e.target &&e.target.classList.contains('add-one')) {
      const name = e.target.dataset.name
      addItem(name, 1)
  } else if (e.target &&e.target.classList.contains('remove-one')) {
      const name = e.target.dataset.name 
      removeItem(name, 1)
  }
}

for (let i=0; i<data.length; ++i) {
  // creates new div element and assigns class name
  let newDiv = document.createElement('div');
  newDiv.className = 'item'

  // creates image element
  let img = document.createElement('img');
  let price = document.createElement('p');
  let desc = document.createElement('p');
  let button = document.createElement('button');
  desc.innerHTML = data[i].desc
  price.innerHTML = data[i].price
  button.id = data[i].name
  // changs each time it goes through the loop. 
  img.src = data[i].image
  img.width = 300
  img.height = 300
  button.dataset.price = data[i].price
  button.innerHTML = "Add to Cart"
 
  // Adds image to the div
  newDiv.appendChild(img)
  newDiv.appendChild(desc)
  newDiv.appendChild(price)
  newDiv.appendChild(button)
  document.querySelector('#items').appendChild(newDiv)
}
const all_items_button = Array.from(document.querySelectorAll('button'))
console.log(all_items_button)

all_items_button.forEach(elt => elt.addEventListener('click', () => {
  addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
  showItems()
}))
