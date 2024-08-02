import { Request, Response } from "express";
import { getAppointmentsService, getAppointmentSpecificService, createAppointmentService, updateAppointmentService } from "../services/appointmentService";
import { Appointment } from "../entities/Appointment";


export const getAppointmentsController = async (req: Request, res: Response) => {
    try {
        const appointments: Appointment[] = await getAppointmentsService();
        if(appointments.length){
            res.status(200).json(appointments);
        }
        else{
            res.status(404).json({ message: "No existen citas" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const getAppointmentSpecificController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointment: Appointment | null = await getAppointmentSpecificService(Number(id));

        if (!appointment) {
            res.status(404).json({ message: "Cita no existente" });
        }
        else {
            res.status(200).json(appointment);
        }

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const createAppointmentController = async (req: Request, res: Response) => {
    try {
        const { date, time, userId } = req.body;
        const newAppointment: Appointment | string = await createAppointmentService({ date, time, userId });
        console.log(newAppointment)
        if (typeof newAppointment === "string") {
            res.status(400).json({ message: newAppointment });
        }
        else {
            res.status(201).json({ message: "Cita creada con exito" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}

export const updateAppointmentController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const appointmentUpdated = await updateAppointmentService(Number(id));
        if (!appointmentUpdated) {
            res.status(404).json({ message: "Cita no existente" });
        }
        else {
            res.status(200).json({ message: "Turno cancelado exitosamente", appointmentUpdated });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" });
    }
}