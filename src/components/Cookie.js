import "./Cookie.css"
const Cookie = ({ click }) => { // { getUser, printUser }
    // var user = getUser()
    // function click() {
    //     user = getUser()
    //     user.cookies += user.click
    //     printUser(user)
    // }
    return (
        <img className="cookie-img" src="/favicon.ico" draggable="false" alt="cookie" onClick={click} id="cookie-img" />
    )
}
export default Cookie