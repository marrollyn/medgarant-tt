import { createSlice } from "@reduxjs/toolkit";
import getCurrentDate from "../utils/getCurrentDate";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TRecords = {
    timeSlot: string;
    doctor: string;
    description: string;
    patient: {
        name: string;
        phone: string;
    };
}

type TInitialState = {
    date: string,
    timeSlots: string[];
    doctors: string[];
    currentCell: {
        time: string;
        doctor: string;
    };
    records: TRecords[];
    loading: boolean;
    error: string | null;
}

const timeSlots = [
    '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
];

const doctors = [
    'Доктор 1', 'Доктор 2', 'Доктор 3', 'Доктор 4',
    'Доктор 5', 'Доктор 6', 'Доктор 7', 'Доктор 8',
];

const initialState: TInitialState = {
    date: getCurrentDate(),
    timeSlots: timeSlots,
    doctors: doctors,
    currentCell: {
        time: '',
        doctor: '',
    },
    records: [
        {
            timeSlot: '11:00',
            doctor: 'Доктор 5',
            description: 'тестовая запись',
            patient: {
                name: 'тестовый пациент',
                phone: '55555555',
            },
        }],
    loading: false,
    error: null,
};

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setCurrentCell(state, action: PayloadAction<{ time: string; doctor: string }>) {
            state.currentCell = action.payload;
        },
        addRecord(state, action: PayloadAction<TRecords>) {
            const { doctor, timeSlot } = action.payload;
            const index = state.records.findIndex(
                (r) => r.doctor === doctor && r.timeSlot === timeSlot
            );
            if (index >= 0) {
                state.records[index] = action.payload;
            } else {
                state.records.push(action.payload);
            }
        }
    },
    selectors: {},
})

export const scheduleReducer = scheduleSlice.reducer;
export const { addRecord, setCurrentCell } = scheduleSlice.actions;