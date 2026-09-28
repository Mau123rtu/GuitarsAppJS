// imports
import {db} from './guitarras.js'
console.log(db)
//Variables
const container = document.querySelector('h2 + div')
const divCarrito = document.querySelector('#carrito')
let carrito = []


//Funciones

function createCard(guitar){
    const div = document.createElement('div')
    div.classList = 'col-md-6 col-lg-4 my-4 row align-items-center'
    const html = `
    <div class="col-4">
                    <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="${guitar.nombre}">
                </div>
                <div class="col-8">
                    <h3 class="text-black fs-4 fw-bold text-uppercase">${guitar.nombre}</h3>
                    <p>${guitar.descripcion}</p>
                    <p class="fw-black text-primary fs-3">$${guitar.precio}</p>
                    <button
                    data-id="${guitar.id}" 
                        type="button"
                        class="btn btn-dark w-100 "
                    >Agregar al Carrito</button>
                </div>`  
    div.innerHTML = html
    return div
}


function getGuitar(e){
    if(e.target.classList.contains('btn')){
        const id = e.target.getAttribute('data-id')
        const idSelected = db.findIndex(g => g.id === Number(id) )
        const idIncart = carrito
         .findIndex(gInCart => gInCart.id === Number(id))
        if (idIncart === -1){                
            carrito.push({
                ...db[idSelected],
            cantidad: 1
            })

        }else{
            carrito[idIncart].cantidad++
        }
        writeStorage()
        drawCar()
        console.log (carrito)
    
    }
}


function drawCar(){
    let total = 0 
    carrito.forEach(g =>total += g.precio * g.cantidad)
    const div = document.createElement('div')
    if (carrito.length === 0){
        div.innerHTML = '<p class="text-center">El carrito esta vacio</p>'

    }else{
        let html = `<table class="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>`
        carrito.forEach(guitar => {
            html += `
            <tr data-id="${guitar.id}"> 
                        <td>
                                            <img class="img-fluid" src="./public/img/${guitar.imagen}.jpg" alt="${guitar.nombre}">
                                        </td>
                                        <td>${guitar.nombre}</td>
                                        <td class="fw-bold">
                                                $${guitar.precio}
                                        </td>
                                        <td class="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                            >
                                                -
                                            </button>
                                                ${guitar.cantidad}
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                class="btn btn-danger"
                                                type="button"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>`
        })

        html+= `
                        </tbody>
                            </table>

                            <p class="text-end">Total pagar: <span class="fw-bold">$${total}</span></p>
                            <button class="btn btn-dark w-100 mt-3 p-2">Vaciar Carrito</button>
                            `
        div.innerHTML = html
    }
    divCarrito.innerHTML = ''
    divCarrito.appendChild(div)


}

function getButtonCar(e){
    if (e.target.classList.contains('btn')){
    const button = e.target.innerHTML
       if (button.includes ('-')){
        const idIncar = e.target
        .parentElement.parentElement.getAttribute('data-id')
        const gInCar = carrito.find (g => g.id === Number(idIncar))
        console.log(gInCar)
        console.log(idIncar)
        if(gInCar.cantidad > 1)
        gInCar.cantidad--

    }else if (button.includes ('+')){
        const idIncar = e.target
        .parentElement.parentElement.getAttribute('data-id')
        const gInCar = carrito.find (g => g.id === Number(idIncar))
        gInCar.cantidad++

    }else if (button.includes ('X')){
        const idIncar = e.target
        .parentElement.parentElement.getAttribute('data-id')
        carrito = carrito.filter(g => g.id !==Number(idIncar))

     } else{
        carrito = []
     }
    writeStorage()
    drawCar()
}
}

function readStorage(){
    const data = localStorage.getItem('carrito')
    carrito = data? JSON.parse (data): []
}
function writeStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

db.forEach(guitar => {
    container.appendChild(createCard(guitar))
})


readStorage()
drawCar()



//Listeners


container.addEventListener('click', getGuitar)
divCarrito.addEventListener('click', getButtonCar)

