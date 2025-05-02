import "dotenv/config"

export const keepServerAwake = () => {
    const url = process.env.SERVER_URL

    if(!url){
        console.log("SERVER_URL no esta configurado")
        return;
    }

    setInterval(async () => {
        try {
            const res = await fetch(url)
            console.log("Servidor activo", res.status)
        } catch (error: any) {
            console.error("Error al mantener el servidor activo", error.message)
        }
    }, 14 * 60 * 1000)

}