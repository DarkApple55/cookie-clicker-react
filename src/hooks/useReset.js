const useReset = async() => {

    let defaultUser = await db_get("/defaultUser")
    await fetch("http://localhost:3001/user", {
        method: "PUT",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(defaultUser)
    }).then(() => window.location.reload(true))
    
}

export default useReset