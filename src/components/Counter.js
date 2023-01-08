import "./Counter.css"
import "../App.css"

const Counter = () => {
    return (
        <div className="cookies-count-container">
            <p className="cookies-count-text unselectable" id="cookies-count">Galletitas: 0</p>
            <p className="cookies-count-text" id="cps-count">CPS: 0</p>
        </div>
    )
}
export default Counter