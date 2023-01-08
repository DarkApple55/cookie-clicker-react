import './Game.css';
import Cookie from '../components/Cookie';
import Counter from '../components/Counter';
import Generador from "../components/Generador"
import { useLayoutEffect } from 'react';

const firstuppercase = str => str.charAt(0).toUpperCase() + str.slice(1)
const Game = (user, global) => {
    // var user
    // var global

    // const [update, setUpdate] = useState(0)
    async function db_get(request) {
        console.log("db_get")
        const response = await fetch("http://localhost:3001" + request)
        const json = await response.json()
        return json
    }
    async function db_put(data, request){
        await fetch("http://localhost:3001" + request, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
    }
    async function db_reset(){
        let defaultUser = await db_get("/defaultUser")
        await fetch("http://localhost:3001/user", {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(defaultUser)
        }).then(() => window.location.reload(true))
    }
    
    const setUser = _estado => {
        document.getElementById('estado').value = JSON.stringify(_estado)
        document.getElementById("cookies-count").innerHTML = "Galletitas: " + _estado.cookies
        document.getElementById("cps-count").innerHTML = "CPS: " + _estado.cps
        // let u = update + 1
        // setUpdate(u)
    }
    // const getEstado = () => JSON.parse(document.getElementById('estado').value)
    // setTimeout(start, 1000)
    useLayoutEffect(() => {
        console.log("useLayoutEffect 1")
        start()
        console.log("useLayoutEffect 2")
    }, []);
    async function start() {
        console.log("start 1")
        user = await db_get("/user")
        console.log(user)
        setUser(user)
        global = await db_get("/global")
        console.log(global)
        document.title = "0 🍪 - Cookie Cliker :v"
        // llenarGeneradores()
        setInterval(tick, global.tickms)
        console.log("start 2")
    }
    function tick() {
        if (!user) {return}
        user.cookies += user.cps
        setUser(user)
        document.title = `${user.cookies} 🍪 - Cookie Cliker :v`
        // for (let gen of generadores) gen.prod += gen.CPS * gen.cant
    }
    function click() {
        user.cookies += user.click
        setUser(user)
    }
    function comprarGenerador(event){
        console.log("Hola")
        let id = 0
        let gen = user.gens[id]
        if (user.cookies >= gen.precio){
            user.cookies -= gen.precio
            gen.cant += 1
            user.cps += gen.cps
            gen.precio += Math.floor(gen.precio / 100 * 20)
            document.getElementById(`${gen.nombre}-precio`).innerHTML = `🍪${gen.precio}`
            db_put(gen, "/user/gens/" + id)
        }else{
            // activarAlerta(`Te faltan ${gen.precio - cookies}!`)
        }
    }
    function llenarGeneradores(tick){        
        let e = <></>
        if (!user?.gens) {return e}
        console.log(user)
        for (let gen of user.gens){
            e += 
            (<div class="generador" id={`g-${gen.nombre}`} onClick={`() => comprarGenerador(${gen.id})`}>
                <img class="img-generador" src={`/img/${gen.img}`} />
                <div>
                    <p>{firstuppercase(gen.nombre)}</p>
                    <p id={`${gen.nombre}-precio`}>🍪{gen.precio}</p>
                </div>
            </div>)
        }
        return e
        // onmouseenter="infoGenerador(${gen.id})" onmouseleave="NoInfoGenerador(${gen.id})"

        // document.getElementById("lista-generadores").innerHTML = ""
        // for (let gen of user.gens){
        //     document.getElementById("lista-generadores").innerHTML += 
        //     `<div class="generador" id="g-${gen.nombre}" onclick="() => comprarGenerador(${gen.id})">
        //         <img class="img-generador" src=/img/${gen.img}>
        //         <div>
        //             <p>${firstuppercase(gen.nombre)}</p>
        //             <p id=${gen.nombre}-precio>🍪${gen.precio}</p>
        //         </div>
        //     </div>`
        // }
        
        // listaGeneradores.current = <>HOLA</>
        // document.getElementById("lista-generadores").innerHTML = <></>
        // document.getElementById("lista-generadores").innerHTML += user.gens.map(gen => {
        //     <div class="generador" id={`g-${gen.nombre}`} onClick={() => comprarGenerador(gen.id)}>
        //         <img class="img-generador" src={`/img/${gen.img}`} alt={gen.nombre} />
        //         <div>
        //             <p>{firstuppercase(gen.nombre)}</p>
        //             <p id={`${gen.nombre}-precio`}>🍪{gen.precio}</p>
        //         </div>
        //     </div>
        // })
    }
    // hacer q espere medio segundo para retornar y poner el map en el return
    
    return (
        <>            
            {/* <input id='estado' defaultValue={global.tickms} /> */}
            {/* <button onClick={start} className='d-none' id='start'></button> */}
            <input id='estado' defaultValue='' className='d-none'/>
            <div className='row app-container'>
                <div className="col-3 cookie-container">
                    <button id='save' onClick={() => db_put(user, "/user")} className="btn btn-primary">Guardar</button>
                    <button id='reset' onClick={db_reset} className="btn btn-primary">Reiniciar</button>
                    <button id='start' onClick={start} className="btn btn-primary">start </button>
                    <Counter />
                    <Cookie click={click}/>
                </div>
                <div className='col-6'></div>
                <div className="col-3 tienda-container">
                    <section className="lista-powerups" id="lista-powerups"></section>
                    <section className="lista-generadores" id="lista-generadores"> 
                    {
                        user ? user.gens.map(gen => {
                            <div class="generador" id={`g-${gen.nombre}`} onClick={() => comprarGenerador(gen.id)}>
                                <img class="img-generador" src={`/img/${gen.img}`} alt={gen.nombre} />
                                <div>
                                    <p>{firstuppercase(gen.nombre)}</p>
                                    <p id={`${gen.nombre}-precio`}>🍪{gen.precio}</p>
                                </div>
                            </div>
                        }) : <>error :</>
                    }
                    </section>
                </div>
            </div>
        </>            
    )
}
export default Game;

/*
<div><p>aaaaa</p></div>
<div><p>ssssss</p></div>
{
    user ? user.gens.map(gen => {
        <div class="generador" id={`g-${gen.nombre}`} onClick={() => comprarGenerador(gen.id)}>
            <img class="img-generador" src={`/img/${gen.img}`} alt={gen.nombre} />
            <div>
                <p>{firstuppercase(gen.nombre)}</p>
                <p id={`${gen.nombre}-precio`}>🍪{gen.precio}</p>
            </div>
        </div>
    }) : <></>
}
*/