const tickms = 1000
const generadores = [
    {
        id: 0,
        nombre: "Cursor",
        CPS: 1,
        precio: 15,
        desc: "Un cursor que clickea por vos.",
        img: "cursor.png",
        cant: 0,
        prod: 0
    },{
        id: 1,
        nombre: "Abuela",
        CPS: 5,
        precio: 100,
        desc: "Abuela que amasa galletitas.",
        img: "abuela.png",
        cant: 0,
        prod: 0
    },{
        id: 2,
        nombre: "Cultivo",
        CPS: 15,
        precio: 350,
        desc: "Plantación de galletitas bastante efectiva.",
        img: "cultivo.png",
        cant: 0,
        prod: 0
    }
]

var cookies = 0
var CPS = 0
var click = 1

start()
function start() {
    document.title = "0 🍪 - Cookie Cliker :v"
    setInterval(tick, tickms)
    llenarGeneradores()
}

function actualizarCookies() {
    document.title = `${cookies} 🍪 - Cookie Cliker :v`
    document.getElementById("cookies-count").innerHTML = `Galletitas: ${cookies}`
    document.getElementById("cps-count").innerHTML = `CPS: ${CPS}`    
}
function tick() {
    cookies += CPS
    actualizarCookies()

    for (let gen of generadores) gen.prod += gen.CPS * gen.cant
    actualizarHtml()
}
function fclick() {
    cookies += click
    actualizarCookies()
}
function llenarGeneradores(){
    for (let gen of generadores){
        document.getElementById("lista-generadores").innerHTML += 
        `
        <div class="generador" id="g-${gen.nombre}" onmouseenter="infoGenerador(${gen.id})" onmouseleave="NoInfoGenerador(${gen.id})" onclick="comprarGenerador(${gen.id})">
            <img class="img-generador" src="/img/${gen.img}">
            <div>
                <p>${gen.nombre}</p>
                <p>💲 ${gen.precio} - 🍪 ${gen.prod}</p>
            <div/>
        </div>
        `
    }
}

var timerGenerador = -1
function infoGenerador(id){
    let gen = generadores[id]
    
    document.getElementById("info-generador").classList.remove("d-none")
    document.getElementById("info-generador").innerHTML = `
    <section class="generador-container" onmouseenter="clearTimerGenerador()" onmouseleave="NoInfoGenerador(${gen.id})">
        <p><b>Click para comprar</b></p>
        <p>${gen.desc}</p>
        <p>CPS: 🍪${gen.CPS}</p>
        <p>Precio: 💲${gen.precio}</p><br>
        <p>En propiedad: 🗂 ${gen.cant}</p>
        <p id="produccion">Producción: 🍪${gen.prod}</p>
        
    </section>
    `
}
function clearTimerGenerador(){
    clearTimeout(timerGenerador)
}
function NoInfoGenerador(){
    // document.getElementById("info-generador").classList.add("d-none")
    clearTimeout(timerGenerador)
    timerGenerador = setTimeout(() => document.getElementById("info-generador").classList.add("d-none"), 1000)
}

function comprarGenerador(id){
    let gen = generadores[id]
    if (cookies >= gen.precio){
        aumentarPrecio(id)
        cookies -= gen.precio
        gen.cant += 1
        CPS += gen.CPS
        actualizarHtml(id)
    }else{
        activarAlerta(`Te faltan ${gen.precio - cookies}!`)
    }
}

function activarAlerta(msj){
    let id = Math.random() * 10000
    document.getElementById("col-mensaje").innerHTML += `<div class="mensaje" id="${id}">${msj}</div>`
    setTimeout(() => document.getElementById(id).classList.add("d-none"), 3000)
}

function aumentarPrecio(id){
    generadores[id].precio += Math.floor(generadores[id].precio / 100 * 20)
}

function actualizarHtml(id = -1){
    document.getElementById("lista-generadores").innerHTML = ""
    llenarGeneradores()
    if (id != -1) infoGenerador(id)
}