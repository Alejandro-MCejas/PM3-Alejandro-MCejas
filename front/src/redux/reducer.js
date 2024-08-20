import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    userAppointments: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload
        },

        setUserAppointments: (state, action)=>{
            state.userAppointments = action.payload
        },

        clearUser: (state)=>{
            state.user = null
            state.userAppointments = []
        },

        cancelAppointment: (state, action)=>{
            const appointmentId = action.payload
            const appointment = state.userAppointments.find(app => app.id === appointmentId)
            if(appointment){
                appointment.status = "cancelled"
            }
        },

        createAppointment: (state, action) => {
            if (!state.userAppointments) {
                state.userAppointments = []; 
            }
            state.userAppointments.push(action.payload);
        }
    }
})

export const {setUser, setUserAppointments, clearUser, cancelAppointment, createAppointment} = userSlice.actions
