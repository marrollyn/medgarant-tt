import React from "react";
import styles from "./ScheduleTableBody.module.scss";
import getRecord from "../utils/getRecord";
import type { TRecords } from "../slice/scheduleSlice";

interface IScheduleTableProps {
    timeSlots: string[];
    doctors: string[];
    records: TRecords[];
    currentSlot: string;
    onCellClick: (time: string, doctor: string) => void;
}

export default class ScheduleTableBody extends React.Component<IScheduleTableProps> {
    render() {
        const { timeSlots, doctors, records, currentSlot, onCellClick } =
            this.props;

        return (
            <tbody>
                {timeSlots.map((time, index) => {
                    const isEven = index % 2 === 1;
                    return (
                        <tr key={index} className={isEven ? styles.evenRow : undefined}>
                            <td
                                className={
                                    time === currentSlot
                                        ? `${styles.cell} ${styles.current}`
                                        : styles.cell
                                }
                            >
                                {time}
                            </td>
                            {doctors.map((doctor) => {
                                const record = getRecord({ time, doctor, records });
                                const cellKey = `${time}-${doctor}`;
                                return (
                                    <td
                                        key={cellKey}
                                        onClick={() => onCellClick(time, doctor)}
                                        className={
                                            time === currentSlot
                                                ? `${styles.cell} ${styles.current}`
                                                : styles.cell
                                        }
                                    >
                                        {record && (
                                            <>
                                                <p>ФИО: {record.patient.name}</p>
                                                <p>ТЕЛ.: {record.patient.phone}</p>
                                                <p>ЖАЛОБЫ / ИНФО: {record.description}</p>
                                                <p></p>
                                            </>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        );
    }
}

