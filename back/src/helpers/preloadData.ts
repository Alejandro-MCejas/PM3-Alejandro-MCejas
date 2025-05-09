import { AppDataSource, AppointmentModel, CredentialModel, UserModel } from "../config/data-source";
import { User } from "../entities/User";
import { AppointmentStatus } from "../enums/AppointmentStatus";

// Modificaciones aca

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
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        status: AppointmentStatus.ACTIVE
    },
    {
        date: "15/07/2024",
        time: "10:00",
        status: AppointmentStatus.ACTIVE
    },
]

const formatDate = (date: string): Date => {
    const [day, month, year] = date.split("/").map(Number)
    return new Date(year, month - 1, day)
}

// export const clearDataBase = async () => {
//     await AppDataSource.manager.transaction(async (transactionalEntityManager) => {
//         await transactionalEntityManager.delete(Appointment, {})
//         await transactionalEntityManager.delete(User, {})
//         await transactionalEntityManager.delete(Credential, {})
//         console.log("Base de datos limpiada");
        
//     })
// }

export const preloadUserData = async () => {

    const existingUsers = await UserModel.find({ order: { id: "ASC" } })

    if (existingUsers.length) {
        console.log("No se ha creado la precarga de USUARIOS porque ya existen");
        return existingUsers
        
    }

    const createdUsers: User[] = []

    await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

        for await (const user of preloadUsers) {
            const formattedDate = formatDate(user.birthdate)

            const newCredential = await transactionalEntityManager.save(CredentialModel.create({
                username: user.username,
                password: user.password
            }))



            const newUser = UserModel.create({
                ...user,
                birthdate: formattedDate,
                credentials: newCredential
            })

            const savedUser = await transactionalEntityManager.save(newUser)
            createdUsers.push(savedUser)
        }
        console.log("Se ha creado la precarga de datos de USUARIOS con exito");

    })

    return createdUsers
}


export const preloadAppointmentsData = async (users: User[]) => {

    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    try {
        const appointments = await AppointmentModel.find()
        if (appointments.length) return console.log("No se ha creado la precarga de APPOINTMENTS porque ya existen");


        await queryRunner.startTransaction()

        const promises = preloadAppointments.map(async (appointment, i) => {
            const formattedDate = formatDate(appointment.date)

            const user = users[i]

            if (!user) throw Error("Usuario no encontrado")
            
            const newAppointment = await AppointmentModel.create({...appointment, date: formattedDate, user})

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

}

