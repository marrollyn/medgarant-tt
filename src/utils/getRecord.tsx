import type { TRecords } from "../slice/scheduleSlice";

type TGetRecord = {
    records: TRecords[];
    doctor: string;
    time: string;
};

export default function getRecord({ records, doctor, time }: TGetRecord): TRecords | null {

    const record = records.find((item) => item.doctor === doctor && item.timeSlot === time);

    if (!record) { return null }

    return record;
}
