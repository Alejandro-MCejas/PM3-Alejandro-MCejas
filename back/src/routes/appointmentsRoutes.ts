import { Router } from "express";
import { getAppointmentsController, getAppointmentSpecificController, createAppointmentController, updateAppointmentController } from "../controllers/appointmentsController";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAppointmentsController);
appointmentRouter.get("/:id", getAppointmentSpecificController);
appointmentRouter.post("/schedule", createAppointmentController);
appointmentRouter.put("/cancel/:id", updateAppointmentController);


export default appointmentRouter;
