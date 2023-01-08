import "../App.css"
import "./Generadores.css"

const firstuppercase = str => str.charAt(0).toUpperCase() + str.slice(1)
const Generadores = ({user, printUser, getUser}) => {
    // var user = getUser()
    function comprarGenerador(id){
        user = getUser()
        let gen = user.gens[id]
        if (user.cookies >= gen.precio){
            user.cookies -= gen.precio
            gen.cant += 1
            user.cps += gen.cps
            gen.precio += Math.floor(gen.precio / 100 * 20)
            document.getElementById(`${gen.nombre}-precio`).innerHTML = `🍪${gen.precio}`
            user.gens[id] = gen
            printUser(user)
            activarInfo(id)
            
        }else{
            console.log("no hay plata")
        }
    }

    function activarInfo(id){
        user = getUser()
        let gen = user.gens[id]
        document.getElementById("info-generador").classList.remove("d-none")
        document.getElementById("info-generador").innerHTML = `
        <div class='row'>
            <div class='col-3'>
                <img class="img-info-generador" src="/img/prod/${gen.img}" alt={gen.nombre} />
            </div>
            <div class='col-3' style="margin-top: 0.3rem;">
                <h3>${firstuppercase(gen.nombre)}</h3>
            </div>
        </div>
        <div class='row'>
            <div class='col-12'>
                <ul>
                    <li> Cada ${gen.nombre} produce <b>${gen.cps}</b> por segundo </li>
                    <li> <b>${gen.cant}</b> ${gen.nombrePl} produciendo <b>${gen.cps * gen.cant}</b> cookies en total </li>
                </ul>
            </div>
        </div>
        `

    }
    function desactivarInfo(id) {
        document.getElementById("info-generador").classList.add("d-none")
    }
    document.addEventListener('mousemove', function(e) {
        let body = document.getElementById('info-generador-container');
        let infoGenerador = document.getElementById('info-generador');
        let right = document.getElementById("g-cursor").offsetLeft
        let size = document.getElementById("g-cursor").style.blockSize
        let left = e.offsetX;
        // let top = e.offsetY;
        let top = e.y;
        // circle.style.left = left + 'px';

        infoGenerador.style.left = right - 394 + 'px';
        infoGenerador.style.top = top + 'px';
    });
    return (<>
        <div className='info-generador-container' id='info-generador-container'>
            <section className="info-generador d-none" id="info-generador"></section>
        </div>
        <section className="lista-generadores" id="lista-generadores">
        {
            user.gens.map(gen => (
                <div key={gen.id} className="generador" id={`g-${gen.nombre}`}
                    onClick={() => comprarGenerador(gen.id)}
                    onMouseEnter={() => activarInfo(gen.id)}
                    onMouseLeave={() => desactivarInfo(gen.id)}>
                    <img className="img-generador" src={`/img/prod/${gen.img}`} alt={gen.nombre} />
                    <div>
                        <p>{firstuppercase(gen.nombre)}</p>
                        <p id={`${gen.nombre}-precio`}>🍪{gen.precio}</p>
                    </div>
                </div>
            ))
        }
        </section>
    </>)
}

export default Generadores