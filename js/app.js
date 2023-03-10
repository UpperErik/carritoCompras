// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners(){
    //cuando se agrega un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //vacioar carrito
    vaciarCarritoBtn.addEventListener('click', () =>{
        // console.log("vaciando carrito");
        //reiniciar el carrito
        articulosCarrito = [];
        limpiarHTML();
    })
}

// Funciones
function agregarCurso(e)    {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

//elimina el curso del carrito
function eliminarCurso(e){
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        //eliminar del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        // console.log(articulosCarrito); 
        carritoHTML(); //itereando sobre el carrito
    }
}

//leer contenido de html y extraer info
function leerDatosCurso(curso)   {
    console.log(curso);
    //creo objeto con el contenido actual
    const infoCurso = {
        imagen:curso.querySelector('img').src,
        titulo:curso.querySelector('h4').textContent,
        precio:curso.querySelector('.precio span').textContent,
        id:curso.querySelector('a').getAttribute('data-id'),
        cantidad:1
    }
    //revisando si un elemento ya existe
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    // console.log(existe);
    if(existe)  {
        // actualizo la cantidad
        const cursos = articulosCarrito.map(curso =>    {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                // retorna el obj actualizado
                return curso;
            } else  {
                // retorna el obj que no son duplicados
                return curso;
            }
        });
        articulosCarrito =  [...cursos];
    }   else    {
        // agrego al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
        }


        // console.log(infoCurso);
        console.log(articulosCarrito);

        carritoHTML();
    }
// muestra el carritp en el html

function carritoHTML()  {
//limpiar el html
limpiarHTML();

//recorre el carrito y genera el html
    articulosCarrito.forEach( curso =>  {
        // creando destructuring
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="90"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>

        `;

        contenedorCarrito.appendChild(row);
    });
}

//eliminando curos tbody
function limpiarHTML()  {
    //forma lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}