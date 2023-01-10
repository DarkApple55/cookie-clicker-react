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
            document.getElementById(`${gen.nombre}-precio`).innerHTML = gen.precio
            document.getElementById(gen.nombre + 'gen-cant').innerHTML = gen.cant
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
        <input class="d-none" value=${id} id="info-gen-id">
        <div class='row' style="padding-right: 0.5rem; padding-bottom: 1rem;">
            <div class='col-3'>
                <img class="img-info-generador" src="/img/prod/${gen.img}" alt=${gen.nombre} />
            </div>
            <div class='col-9' style="margin-top: 0.3rem;">
                <div class="row">
                    <div class="col-9"><h3>${firstuppercase(gen.nombre)}</h3></div>
                    <div class="col-3 gen-precio info-precio"><img src="/favicon.ico" class="cookie-icon"/><span id="${gen.nombre}-info-precio"}>${gen.precio}</span></div>
                </div>
                <span><i>${gen.desc}</i></span>
            </div>
        </div>
        <div class='row'>
            <div class='col-12'>
                <ul>
                    <li> Cada ${gen.nombre} produce <b>${gen.cps}</b> galletitas por segundo </li>
                    <li> <b>${gen.cant}</b> ${gen.nombrePl} produciendo <b>${gen.cps * gen.cant}</b> cookies por segundo </li>
                    <li> Producción total de ${gen.nombrePl}: <b><span id="info-gen-prod">${Math.ceil(gen.prod)}</span></b> </li>
                    <li> %<b><span id="info-gen-total">0</span></b> del total </li>
                </ul>
            </div>
        </div>
        `
    }
    function desactivarInfo() {document.getElementById("info-generador").classList.add("d-none")}

    document.addEventListener('mousemove', function(e) {
        let infoGenerador = document.getElementById('info-generador');
        let right = document.getElementById("g-cursor").offsetLeft
        let top = e.y;
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
                        <p className="gen-precio"><img src="/favicon.ico" className="cookie-icon" alt="cookie"/><span id={`${gen.nombre}-precio`}>{gen.precio}</span></p>
                    </div>
                    <div className="gen-cant precio" id={gen.nombre + "gen-cant"}>{gen.cant}</div>
                </div>
            ))
        }
        </section>
    </>)
}

export default Generadores