import "./Cookie.css"

const Cookie = ({ getUser, printUser }) => { // { getUser, printUser }
    var animationTimeout
    function click() {
        var user = getUser()
        user.cookies += user.click
        printUser(user)
    }
    setTimeout(() => {
        document.getElementById('cookie-img').onclick = click
    }, 1000);
    function mouseOver(){
        document.getElementById("cookie-img").style.animationPlayState = "running";
        document.getElementById("cookie-img").classList.add("animate__pulse")
    }
    function mouseLeave(){
        // document.getElementById("cookie-img").classList.remove("animate__pulse")
        document.getElementById("cookie-img").style.animationPlayState = "paused";
    }
    return (
        <img className="cookie-img animate__animated" src="/favicon.ico" draggable="false" alt="cookie" id="cookie-img"
        onMouseLeave={mouseLeave}
        onMouseOver={mouseOver}
        />
    )
}
export default Cookie