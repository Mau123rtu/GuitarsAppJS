// imports
import {db} from './guitarras.js'
console.log(db)
//Variables
const container = document.querySelector('h2 + div')
const carrito = []


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
        console.log (carrito)
    
    }
}

db.forEach(guitar => {
    container.appendChild(createCard(guitar))
})


//Listeners


container.addEventListener('click', getGuitar)


