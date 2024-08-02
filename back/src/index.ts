import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { preloadAppointmentsData, preloadUserData } from "./helpers/preloadData"


const initializeApp = async () => {
    await AppDataSource.initialize()
        .then(res => {
            console.log("Base de datos conectada")
        })

    await preloadUserData()
    await preloadAppointmentsData()

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto: ${PORT}`);
    })
}

initializeApp()



// try {

//     AppDataSource.initialize()
//         .then(res => {
//             console.log("Base de datos conectada")
//             app.listen(PORT, () => {
//                 console.log(`Servidor escuchando en el puerto ${PORT}`);
//             })
//         })

// } catch (error) {
//     console.log(error)
// }


