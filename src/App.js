import Game from './Game';
import "./index.css"
const App = () => {
    
    const global = {
        "tickms": 20
    }
    const defaultUser = {
        "nombre": "Fábrica :V",
        "cookies": 1000,
        "cps": 0,
        "click": 1,
        "total": 0,
        "gens": [
          {
            "id": 0,
            "unlocked": true,
            "nombre": "cursor",
            "nombrePl": "cursores",
            "desc": "Click automático cada segundo.",
            "img": "cursor.png",
            "precio": 15,
            "cps": 1,
            "cant": 0,
            "prod": 0
          },
          {
            "id": 1,
            "unlocked": true,
            "nombre": "abuela",
            "nombrePl": "abuelas",
            "desc": "Una abuela amable para cocinar más rápido.",
            "img": "abuela.png",
            "precio": 100,
            "cps": 5,
            "cant": 0,
            "prod": 0
          },
          {
            "id": 2,
            "unlocked": true,
            "nombre": "granja",
            "nombrePl": "granjas",
            "desc": "Cultivo de galletitas a partir de semillas especiales.",
            "img": "granja.png",
            "precio": 300,
            "cps": 12,
            "cant": 0,
            "prod": 0
          }
        ],
        "powerUps": [
          {
            "id": 0,
            "owned": false,
            "nombre": "Doble click",
            "desc": "Duplica la eficiencia del click y cursores.",
            "img": "goldenclick.png",
            "precio": 100,
            "action": "click"
          },
          {
            "id": 1,
            "owned": false,
            "nombre": "Click cuádruple",
            "desc": "Duplica la eficiencia del click y cursores.",
            "img": "goldenclick.png",
            "precio": 500,
            "action": "click"
          },
          {
            "id": 2,
            "owned": false,
            "nombre": "Mejores abuelas!",
            "desc": "Duplica la eficiencia de las abuelas.",
            "img": "goldenclick.png",
            "precio": 1000,
            "action": "abuela"
          }
        ],
        "logros": [
          {}
        ]
      }
    const user = {...defaultUser}
    return (
        <div className='unselectable app-container'>
            <input id='user' defaultValue='' className='d-none' />
            <Game global={global} user={user} defaultUser={defaultUser} />
        </div>
    )
}
export default App;