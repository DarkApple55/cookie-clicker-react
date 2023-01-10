import "./Counter.css"
import "../App.css"

const Counter = () => {
    return (
        <div className="cookies-count-container">
            <p className="cookies-count-text unselectable" id="cookies-count">0 galletitas</p>
            <p className="cookies-count-text" id="cps-count">Por segundo: 0</p>
            <p className="cookies-count-text" id="click-count">Click: 0</p>
        </div>
    )
}
export default Counter