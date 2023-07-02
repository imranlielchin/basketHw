
let startShopping = document.querySelector('.shopping');

let cars = [
    {
        id: 1,
        nname: 'Toyota',
        price: 48000,
    },
    {
        id: 2,
        nname: 'BMW',
        price: 650000,
    },
    {
        id: 3,
        nname: 'Jaguar',
        price: 80000,
    },
    {
        id: 4,
        nname: 'Bentley',
        price: 555000,
    }

];



let endShopping = document.querySelector('.end_shopping');


let list = document.querySelector('.list');





let body = document.querySelector('body');


let total = document.querySelector('.total')


let quantity = document.querySelector('.count');

startShopping.addEventListener('click', () => {
    body.classList.add('active');
})

endShopping.addEventListener('click', () => {
    body.classList.remove('active');
})


let listCards = [];
let listCard = document.querySelector('.list_card')
function startApp() {
    cars.forEach((item, key) => {
        let newRes = document.createElement('div');
        newRes.classList.add('item');
        newRes.innerHTML = `
        <div class = "title">${item.nname}</div>
        <div class = "price">${item.price}</div>
        <button onclick = "addToBasket(${key})">Add To Basket </button>
        `
        list.appendChild(newRes);
    })
}
startApp();

function addToBasket(key) {
    localStorage.setItem("data",JSON.stringify(cars[key]))
    if (listCards[key] == null) {
        listCards[key] = cars[key];
        listCards[key].quantity = 1
    }
    updateCard();
}

function updateCard() {
    
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;

    listCards.forEach((value, key) => {

        totalPrice = totalPrice + value.price
        count = count + value.quantity

        if (value !== null) {
            let newRes = document.createElement('li')
            newRes.innerHTML = `
            <div>${value.nname}</div>
            <div>${value.price}</div>
            <div>${value.quantity}</div>
            <div>
                <button onclick="changeQuantity(${key},${value.quantity - 1})">-</button>
                <div class="count">${value.quantity}</div>
                <button onclick="changeQuantity(${key},${value.quantity + 1})">+</button>
            </div>

            `
            listCard.appendChild(newRes)
        }
    })

    total.innerText = totalPrice;
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * cars[key].price
    }
    updateCard();

}