import './Game.css';
import Cookie from './components/Cookie';
import Counter from './components/Counter';
import "./App.css"
import Generadores from './sections/Generadores';
// import Generador from "../components/Generador"
const firstuppercase = str => str.charAt(0).toUpperCase() + str.slice(1)
const Game = ({global, user, defaultUser}) => {

    const _usePut = async(data, request) => {
        await fetch("http://localhost:3001" + request, {
        method: "PUT",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
    }
    const _useGet = async(request) => {
        const response = await fetch("http://localhost:3001" + request)
        const json = await response.json()
        return json
    }
    function reset() {
        _usePut(defaultUser, "/user")
        window.location.reload(true)
    }
    function printUser(usuario) {
        document.getElementById('user').value = JSON.stringify(usuario)
        usuario = JSON.parse(document.getElementById('user').value)
        document.title = `${usuario.cookies} 🍪 - Cookie Cliker :v`
        document.getElementById("cookies-count").innerHTML = "Galletitas: " + usuario.cookies
        document.getElementById("cps-count").innerHTML = "CPS: " + usuario.cps
    }
    function getUser() {
        return JSON.parse(document.getElementById('user').value)
    }
    setTimeout(() => {
        document.getElementById('start').click()
    }, 1000)
    // setInterval(() => {
    //     document.getElementById('user').value = JSON.stringify(user)
    // }, 100)
    var interval
    function start() {
        if(!interval) {
            document.getElementById('user').value = JSON.stringify(defaultUser)
            interval = true
            _useGet("/user").then(rsp => user = rsp)
            .then(printUser(user))
            .then(interval = setInterval(tick, global.tickms))
        }
    }
    var ticks = 0
    function tick() {
        ticks += 1
        if (ticks > 1) user = getUser()
        user.cookies += user.cps
        printUser(user)
        // for (let gen of generadores) gen.prod += gen.CPS * gen.cant
    }
    function click() {
        user = getUser()
        user.cookies += user.click
        printUser(user)
    }
    
    return (
        <div className='row app-container'>
            <div className="col-3 cookie-container">
                <button id='start' onClick={start} className="btn btn-primary d-none">Start</button>
                <button id='save' onClick={() => _usePut(user, "/user")} className="btn btn-primary">Guardar</button>
                <button id='reset' onClick={reset} className="btn btn-primary">Reiniciar</button>
                <Counter />
                <Cookie click={click} /> {/* getUser={getUser} printUser={printUser} */}
            </div>
            <div className='col-6'></div>
            <div className="col-3 tienda-container">
                <section className="lista-powerups" id="lista-powerups"></section>
                <Generadores user={user} getUser={getUser} printUser={printUser} id="tienda"/>
            </div>
            
        </div>
    )
}
export default Game;