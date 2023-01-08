const useGet = async(request) => {
    const response = await fetch("http://localhost:3001" + request)
    const json = await response.json()
    return json
}

export default useGet