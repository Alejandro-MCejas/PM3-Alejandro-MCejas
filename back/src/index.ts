import app from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { clearDataBase, preloadAppointmentsData, preloadUserData } from "./helpers/preloadData"
import { keepServerAwake } from "./utils/keepServerAwake";


const initializeApp = async () => {
    await AppDataSource.initialize()
        .then(res => {
            console.log("Base de datos conectada")
        })
    
    await clearDataBase()
    await preloadUserData()
    await preloadAppointmentsData()

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto: ${PORT}`);
    })

    keepServerAwake()
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


