document.addEventListener('DOMContentLoaded', () => {

    const datos = [
        {
            id: 1,
            nombre: 'Tablet Xrey',
            precio: 54000,
            imagen: 'img/tablet.webp'
        },
        {
            id: 2,
            nombre: 'Monitor Noblex 27"',
            precio: 43000,
            imagen: 'img/Monitor.webp'
        },
        {
            id: 3,
            nombre: 'Celular Tcl 305i',
            precio: 94000,
            imagen: 'img/celular.webp'
        },
        {
            id: 4,
            nombre: 'Smartwatch Grow Home',
            precio: 65000,
            imagen: 'img/reloj.webp'
        },
        {
          id: 5,
          nombre: 'Lavarropas Columbia 10kg',
          precio: 23000,
          imagen: 'img/Lavarropas Columbia 10kg.webp'
      },
      {
          id: 6,
          nombre: 'Microondas Bgh 20lt Gris',
          precio: 24000,
          imagen: 'img/Microondas Bgh 20lt Gris.webp'
      }
    ];
    let carrito = [];
    const peso = '$';
    const items = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
    function rproductos() {
        datos.forEach((info) => {
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            const miNodoCardBody = document.createElement('div');
            miNodoCardBody.classList.add('card-body');
            const miNodoTitle = document.createElement('h5');

            miNodoTitle.classList.add('card-title');
            miNodoTitle.textContent = info.nombre;
            const miNodoImagen = document.createElement('img');
            miNodoImagen.classList.add('img-fluid');
            miNodoImagen.setAttribute('src', info.imagen);
            const miNodoPrecio = document.createElement('p');
            miNodoPrecio.classList.add('card-text');
            miNodoPrecio.textContent = `${info.precio}${peso}`;
            const miNodoBoton = document.createElement('button');
            miNodoBoton.classList.add('btn', 'btn-primary');
            miNodoBoton.textContent = '+';
            miNodoBoton.setAttribute('marcador', info.id);

            miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
            miNodoCardBody.appendChild(miNodoImagen);
            miNodoCardBody.appendChild(miNodoTitle);
            miNodoCardBody.appendChild(miNodoPrecio);
            miNodoCardBody.appendChild(miNodoBoton);

            miNodo.appendChild(miNodoCardBody);
            items.appendChild(miNodo);
        });
    }

    function anyadirProductoAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();
    }


    function renderizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = datos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${peso}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        DOMtotal.textContent = total();
    }
     function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }


    function total() {
        return carrito.reduce((total, item) => {
            const miItem = datos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }
    function vaciar() {
        carrito = [];
        renderizarCarrito();
        localStorage.clear();

    }
    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }
    function loadingLS () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }
    DOMbotonVaciar.addEventListener('click', vaciar);
    loadingLS();
    rproductos();
    renderizarCarrito();
});