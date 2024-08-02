import { AppointmentModel, UserModel } from "../config/data-source";
import AppointmentDto from "../dto/AppointmentDto";
import { Appointment } from "../entities/Appointment";
import { AppointmentStatus } from "../enums/AppointmentStatus";
// import IAppointment from "../interfaces/IAppointment";


// const arrOfAppointments: IAppointment[] = []


export const getAppointmentsService = async (): Promise<Appointment[]> => {
    const appointments = await AppointmentModel.find({order: { id: "ASC"}, relations: ["user"] })
    return appointments
}

export const getAppointmentSpecificService = async (id: number): Promise<Appointment | null> => {
    const appointment = await AppointmentModel.findOne({
        where: { id },
        relations: ["user"]
    })
    return appointment
}

export const createAppointmentService = async (appointment: AppointmentDto): Promise<Appointment | string> => {
    const user = await UserModel.findOneBy({ id: appointment.userId })
    if (!user) {
        return "Usuario no encontrado"
    }

    const newAppointment = await AppointmentModel.create({ ...appointment, user: user })
    await AppointmentModel.save(newAppointment)
    return newAppointment
}

export const updateAppointmentService = async (id: number): Promise<Appointment | null > => {
    const appointment = await AppointmentModel.findOneBy({ id })

    if(appointment) {
        appointment.status = AppointmentStatus.CANCELLED
        await AppointmentModel.save(appointment)
        return appointment
    }

    return null

}
