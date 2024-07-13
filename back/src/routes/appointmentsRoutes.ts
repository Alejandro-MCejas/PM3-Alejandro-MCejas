import { Router } from "express";
import { getAppointmentsController, getAppointmentSpecificController, createAppointmentController, updateAppointmentController } from "../controllers/appointmentsController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAppointmentsController);
appointmentRouter.get("/appointment", getAppointmentSpecificController);
appointmentRouter.post("/schedule", createAppointmentController);
appointmentRouter.put("/cancel", updateAppointmentController);


export default appointmentRouter;
