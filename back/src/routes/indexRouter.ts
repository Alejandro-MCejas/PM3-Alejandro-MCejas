import { Router } from "express";
import userRouter from "./usersRoutes";
import appointmentRouter from "./appointmentsRoutes";
import { getAppointmentSpecificMiddleware } from "../middlewares/appointmentMiddleware";

const router: Router = Router();


router.use(getAppointmentSpecificMiddleware)
router.use("/users", userRouter);
router.use("/appointments", appointmentRouter);


export default router