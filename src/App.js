import Game from './Game';
import "./index.css"
const App = () => {
    
    const global = {
        "tickms": 1000
    }
    const defaultUser = {
        "cookies": 0,
        "cps": 0,
        "click": 1,
        "gens": [
          {
            "id": 0,
            "unlocked": true,
            "nombre": "cursor",
            "nombrePl": "cursores",
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
            "img": "granja.png",
            "precio": 300,
            "cps": 12,
            "cant": 0,
            "prod": 0
          }
        ],
        "logros": [
          {}
        ]
      }
    const user = {...defaultUser}
    return (
        <div className='unselectable app-container'>
            <input id='user' defaultValue='' className='' />
            <Game global={global} user={user} defaultUser={defaultUser} />
        </div>
    )
}
export default App;