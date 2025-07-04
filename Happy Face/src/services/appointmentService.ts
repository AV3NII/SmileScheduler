import { AxiosResponse } from 'axios';
import { api } from './apiConfig';
import { AppointmentRequest } from '@/models/services/requests/AppointmentRequest';
import { AppointmentResponse } from '@/models/services/responses/AppointmentResponse';
import { IAppointmentService } from '@/models/services/IAppointmentService';
import { handleApiError } from './errorHandler';
import {AppointmentType} from "@/models/enums/AppointmentType.ts";
import {Doctor} from "@/models";
import {AppointmentUpdateRequest} from "@/models/services/requests/AppointmentUpdateRequest.ts";

export class AppointmentService implements IAppointmentService {
    private static _instance?: AppointmentService;

    public static get Instance() {
        return this._instance ?? (this._instance = new this());
    }


    async getFreeSlots(doctorId: number, date: string, appointmentType: AppointmentType, weekView?: boolean): Promise<string[]> {
        try {
            const response: AxiosResponse<string[]> = await api
                .get(`/api/appointments/free-slots?doctorId=${doctorId.toString()}&appointmentType=${appointmentType}&date=${date}${weekView ? `&weekView=true`: ''}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

    async fetchDoctors(): Promise<Doctor[]> {
        try {
            const response: AxiosResponse<Doctor[]> = await api.get('/api/appointments/doctors');
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }


    async createAppointment(appointmentRequest: AppointmentRequest): Promise<AppointmentResponse> {
        try {
            const response: AxiosResponse<AppointmentResponse> = await api.post('/api/appointments', appointmentRequest);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

    async getAppointment(appointmentId: number): Promise<AppointmentResponse> {
        try {
            const response: AxiosResponse<AppointmentResponse> = await api.get(`/api/appointments?appointmentId=${appointmentId.toString()}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

    async getAppointmentsForDoctor(doctorId: number, date: string, weekView?: boolean): Promise<AppointmentResponse[]> {
        try {
            const response: AxiosResponse<AppointmentResponse[]> = await api
                .get(`/api/appointments/booked?doctorId=${doctorId.toString()}&date=${date}${weekView ? `&weekView=true`: ''}`);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

    async updateAppointment(appointmentRequest: AppointmentUpdateRequest): Promise<AppointmentResponse> {
        try {
            const response: AxiosResponse<AppointmentResponse> = await api.put(`/api/appointments`, appointmentRequest);
            return response.data;
        } catch (error) {
            throw handleApiError(error);
        }
    }

    async deleteAppointment(appointmentId: number): Promise<void> {
        try {
            await api.delete(`/api/appointments/${appointmentId.toString()}`);
        } catch (error) {
            throw handleApiError(error);
        }
    }
}
