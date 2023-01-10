import "./App.css"
import './Game.css';
import Cookie from './components/Cookie';
import Counter from './components/Counter';
import Generadores from './sections/Generadores';
import PowerUps from "./sections/Powerups";

// const firstuppercase = str => str.charAt(0).toUpperCase() + str.slice(1)
const Game = ({global, user, defaultUser}) => {

    const _usePut = async(data, request, reload = false) => {
        await fetch("http://localhost:3001" + request, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
        if (reload) window.location.reload(true)
    }
    const _useGet = async(request) => {
        const response = await fetch("http://localhost:3001" + request)
        const json = await response.json()
        return json
    }
    const reset =() => _usePut(defaultUser, "/user", true)
    function setComprable(id, optional = false){
        if (optional) {
            document.getElementById(id)?.classList.add('gen-verde')
            document.getElementById(id)?.classList.remove('gen-rojo') 
        } else {
            document.getElementById(id).classList.add('gen-verde')
            document.getElementById(id).classList.remove('gen-rojo') 
        }
    }
    function setNoComprable(id, required = false){
        if (required) {
            document.getElementById(id)?.classList.add('gen-rojo') 
            document.getElementById(id)?.classList.remove('gen-verde')
        } else {
            document.getElementById(id).classList.add('gen-rojo') 
            document.getElementById(id).classList.remove('gen-verde')
        }
        
    }
    const getUser = () => JSON.parse(document.getElementById('user').value)
    function printUser(usuario) {
        document.getElementById('user').value = JSON.stringify(usuario)
        usuario = JSON.parse(document.getElementById('user').value)
        document.title = `${Math.floor(usuario.cookies)} 🍪 - Cookie Cliker :v`   
        document.getElementById("cookies-count").innerHTML = Math.floor(usuario.cookies) + " galletitas"     
        document.getElementById("cps-count").innerHTML = "Por segundo: " + usuario.cps
        document.getElementById("click-count").innerHTML = "Click: " + usuario.click
        if (document.getElementById("info-gen-id")) {
            let genid = document.getElementById("info-gen-id").value
            document.getElementById("info-gen-prod").innerHTML = Math.ceil(usuario.gens[genid].prod)
            if (usuario.gens[genid].prod !== 0) {
                document.getElementById("info-gen-total").innerHTML = Math.round(usuario.gens[genid].prod / usuario.total * 100)
            }
        }
        for (let gen of user.gens) {
            if (usuario.cookies >= gen.precio) {
                setComprable(gen.nombre + "-precio")
                setComprable(gen.nombre + "-info-precio", true)
            }
            if (usuario.cookies < gen.precio) {
                setNoComprable(gen.nombre + "-precio")
                setNoComprable(gen.nombre + "-info-precio", true)
            }
        }
        for (let powerup of user.powerUps){
            if (usuario.cookies >= powerup.precio) setComprable(powerup.id + "-precio", true)
            if (usuario.cookies < powerup.precio) setNoComprable(powerup.id + "-precio", true)
        }
    }
    
    setTimeout(() => {document.getElementById('start').click()}, 1000)
    var interval
    function start() {
        if(!interval) {
            document.getElementById('user').value = JSON.stringify(defaultUser)
            interval = true
            _useGet("/user").then(rsp => user = rsp)
            .then(printUser(user))
            .then(interval = setInterval(tick, global.tickms))
            .then(() => {
                for (let powerup of user.powerUps){
                    if (powerup.owned) document.getElementById('p-' + powerup.id).classList.add('d-none')
                }
                document.getElementById("lista-powerups").classList.remove("d-none")
            })
        }
    }
    var ticks = 0
    function tick() {
        ticks += 1
        if (ticks > 1) user = getUser()
        user.cookies += user.cps / (1000 / global.tickms)
        user.gens.map(gen => gen.prod += gen.cps / (1000 / global.tickms) * gen.cant )
        user.total += user.cps / (1000 / global.tickms)
        printUser(user)
    }
    
    return (
        <div className='row app-container'>
            <div className="col-3 cookie-container">
                <button id='start' onClick={start} className="d-none">Start</button>
                <button id='save' onClick={() => _usePut(user, "/user")} className="btn btn-primary">Guardar</button>
                <button id='reset' onClick={reset} className="btn btn-primary">Reiniciar</button>   
                <Counter />
                <Cookie getUser={getUser} printUser={printUser} />
            </div>
            <div className='col-6'></div>
            <div className="col-3 tienda-container">
                <PowerUps user={user} getUser={getUser} printUser={printUser} />
                <Generadores user={user} getUser={getUser} printUser={printUser} />
            </div>
        </div>
    )
}
export default Game;