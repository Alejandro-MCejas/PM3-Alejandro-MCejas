import { AppDataSource, AppointmentModel, CredentialModel, UserModel } from "../config/data-source";
import { AppointmentStatus } from "../enums/AppointmentStatus";



const preloadUsers = [
    {
        name: "Lucas Fernández",
        email: "lucas.fernandez@example.com",
        birthdate: "14/08/1995",
        nDni: 39567821,
        username: "lucas95",
        password: "admin"
    },
    {
        name: "Valentina Ruiz",
        email: "valen.ruiz@example.com",
        birthdate: "27/03/2000",
        nDni: 42134567,
        username: "valen27",
        password: "admin"
    },
    {
        name: "Diego Martínez",
        email: "diego.mtz@example.com",
        birthdate: "02/11/1987",
        nDni: 30891234,
        username: "diego87",
        password: "admin"
    }
]

const preloadAppointments = [
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 8,
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 9,
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        userId: 10,
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

