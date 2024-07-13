import { Request, Response, NextFunction } from "express";
import { getAppointmentSpecificController } from "../controllers/appointmentsController";

export const getAppointmentSpecificMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === "/appointment") {
        return getAppointmentSpecificController(req, res);
    }
    next();
}