import "./Powerups.css"

const firstuppercase = str => str.charAt(0).toUpperCase() + str.slice(1)
const PowerUps = ({user, getUser, printUser}) => {
    function activarInfo(id){
        user = getUser()
        // console.log(user.powerUps[id])
        let powerup = user.powerUps[id]
        document.getElementById("info-generador").classList.remove("d-none")
        document.getElementById("info-generador").innerHTML = `
        <div class='row' style="padding-right: 0.5rem; padding-bottom: 1rem;">
            <div class='col-3'>
                <img class="img-info-generador" src="/img/powerups/${powerup.img}" alt=${powerup.img} />
            </div>
            <div class='col-9' style="margin-top: 0.3rem;">
                <div class="row">
                    <div class="col-9"><h4>${firstuppercase(powerup.nombre)}</h4></div>
                    <div class="col-3 info-precio"><img src="/favicon.ico" class="cookie-icon"/><span id=${powerup.id}-precio>${powerup.precio}</span></div>
                </div>
                <span><i>${powerup.desc}</i></span>
            </div>
        </div>
        `
    }
    function desactivarInfo() {document.getElementById("info-generador").classList.add("d-none")}
    function elegirMejora(action, u){
        if (action === "click"){
            u.gens[0].cps *= 2
            u.click *= 2
        }
        else if (action === "abuela") u.gens[1].cps *=2
        else if (action === "granja") u.gens[2].cps *=2
        return u
    }

    function comprarPowerUp(id){
        user = getUser()
        let powerup = user.powerUps[id]
        if (user.cookies >= powerup.precio && !powerup.owned){
            user.cookies -= powerup.precio
            user.powerUps[id].owned = true
            user = elegirMejora(powerup.action, user)
            document.getElementById("p-" + powerup.id).classList.add("d-none")
            printUser(user)
        }else{
            console.log("no hay plata")
        }
    }
    return(<>
        <section className="lista-powerups d-none" id="lista-powerups">
        {
            user.powerUps.map(powerup => (
                <div key={powerup.id} className="powerup" id={"p-" + powerup.id}
                onMouseEnter={() => activarInfo(powerup.id)}
                onMouseLeave={() => desactivarInfo(powerup.id)}
                onClick={() => comprarPowerUp(powerup.id)}>
                    <img src={`/img/powerups/${powerup.img}`} alt={powerup.img} />
                </div>
            ))
        }
        </section>
    </>)
}

export default PowerUps