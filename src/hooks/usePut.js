const usePut = async(data, request) => {

    await fetch("http://localhost:3001" + request, {
        method: "PUT",
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
    })
}

export default usePut