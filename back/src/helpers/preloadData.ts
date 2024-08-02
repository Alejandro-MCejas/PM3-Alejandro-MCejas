import { AppDataSource, AppointmentModel, CredentialModel, UserModel } from "../config/data-source";
import { AppointmentStatus } from "../enums/AppointmentStatus";



const preloadUsers = [
    {
        name: "Alejandro Cejas",
        email: "ale@gmail.com",
        birthdate: "22/01/2003",
        nDni: 44657092,
        username: "ale22",
        password: "admin"
    },
    {
        name: "Agustina Blanco",
        email: "agus@gmail.com",
        birthdate: "10/05/2002",
        nDni: 44077794,
        username: "agus10",
        password: "admin"
    },
    {
        name: "Maria Sofia Brandalisse",
        email: "sofi@gmail.com",
        birthdate: "05/09/1989",
        nDni: 32846237,
        username: "sofi05",
        password: "admin"
    }
]

const preloadAppointments = [
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 1,
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 2,
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 3,
        status: AppointmentStatus.ACTIVE
    },
]

export const preloadUserData = async () => {
    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
        const users = await UserModel.find()


        if (users.length) return console.log("No se hizo la precarga de USUARIOS porque ya existen");

        for await (const user of preloadUsers) {
            const newCredential = await transactionalEntityManager.save(CredentialModel.create({
                username: user.username,
                password: user.password
            }))





            const newUser = UserModel.create({
                ...user,
                credentials: newCredential
            })
            
            await transactionalEntityManager.save(newUser)
        }
        console.log("Se ha creado la precarga de datos de USUARIOS con exito");

    })
}


export const preloadAppointmentsData = async () => {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    try {
        const appointments = await AppointmentModel.find()
        if (appointments.length) return console.log("No se ha creado la precarga de APPOINTMENTS porque ya existen");


        await queryRunner.startTransaction()

        const promises = preloadAppointments.map(async (appointment) => {
            const newAppointment = await AppointmentModel.create(appointment)
            await queryRunner.manager.save(newAppointment)
            const user = await UserModel.findOneBy({ id: appointment.userId })
            if (!user) throw Error("Usuario no encontrado")
            newAppointment.user = user
            await queryRunner.manager.save(newAppointment)

        })

        await Promise.all(promises)
        await queryRunner.commitTransaction()
        console.log("Se ha creado la precarga de datos de APPOINTMENTS con exito");

    } catch (error) {
        console.log(error)
        await queryRunner.rollbackTransaction()
    } finally {
        console.log("Ha finalizado la transacción");
        await queryRunner.release()
    }












    // try {
    //     AppDataSource.manager.transaction(async (transactionalEntityManager) => {

    //         const appointments = await AppointmentModel.find()

    //         if(appointments.length) return console.log("No se ha creado la precarga de APPOINTMENTS porque ya existen");

    //         for await (const appointment of preloadAppointments) {
    //             const newAppointment = await AppointmentModel.create(appointment)
    //             await transactionalEntityManager.save(newAppointment)
    //             const user = await UserModel.findOneBy({ id: appointment.userId })
    //             if (user) {
    //                 newAppointment.user = user
    //                 transactionalEntityManager.save(newAppointment)
    //             }
    //             else {
    //                 throw Error("Usuario no encontrado")
    //             }
    //         }

    //         console.log("Se ha creado la precarga de datos de APPOINTMENTS con exito");

    //     })

    // }
    // catch (error) {
    //     console.log(error)
    // }

}

