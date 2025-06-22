import React from 'react';
import styles from './Schedule.module.scss';
import { connect } from 'react-redux';
import type { RootState } from '../store/store';
import type { Dispatch } from 'redux';
import getCurrentRow from '../utils/getCurrentRow';
import getRecord from '../utils/getRecord';
import RecordForm from '../RecordForm/RecordForm';
import { type TRecords, setCurrentCell, addRecord } from '../slice/scheduleSlice';
import ScheduleTableBody from '../ScheduleTable/ScheduleTableBody';
import Modal from '../Modal/Modal';

interface IScheduleTableProps {
    date: string,
    timeSlots: string[];
    doctors: string[];
    records: TRecords[];
    setCurrentCell: (payload: { time: string; doctor: string }) => void;
    addRecord: (payload: TRecords) => void;
}

class Schedule extends React.Component<IScheduleTableProps> {

    interval!: ReturnType<typeof setInterval>;
    
    state = {
        currentSlot: getCurrentRow(),
        isModalOpen: false,
        selectedSlot: '',
        selectedDoctor: '',
    }
    
    onCellClick = (time: string, doctor: string) => {
        alert(`Запись к ${doctor} в ${time}`);
    };

    openModal = (time: string, doctor: string) => {
        this.setState({
            isModalOpen: true,
            selectedSlot: time,
            selectedDoctor: doctor,
        });
        this.props.setCurrentCell({ time, doctor });
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
        this.props.setCurrentCell({ time: '', doctor: '' });
    };

    onSave = () => { }

    handleCloseModal = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && this.state.isModalOpen) {
            this.setState({ isModalOpen: false });
        }
    }

    handleSubmitRecord = (record: TRecords) => {
        this.props.addRecord(record);
        this.closeModal();
    };

    componentDidMount(): void {
        this.interval = setInterval(() => {
            this.setState({ currentSlot: getCurrentRow() })
        }, 60_000);
        document.addEventListener('keydown', this.handleCloseModal);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { date, timeSlots, doctors, records, } = this.props;

        return (
            <div className={styles.wrapper}>
                <h3>Расписание, {date}</h3>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th className={styles.header}>Время</th>
                            {doctors.map((doctor, i) => (
                                <th key={i} className={styles.header}>
                                    {doctor}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <ScheduleTableBody
                        key={this.props.records.length}
                        timeSlots={timeSlots}
                        doctors={doctors}
                        currentSlot={this.state.currentSlot}
                        records={records}
                        onCellClick={this.openModal}
                    />
                </table>

                <Modal
                    visible={this.state.isModalOpen}
                    time={this.state.selectedSlot}
                    doctor={this.state.selectedDoctor}
                    onClose={this.closeModal}>
                    <RecordForm
                        doctor={this.state.selectedDoctor}
                        slot={this.state.selectedSlot}
                        date={this.props.date}
                        record={getRecord({
                            time: this.state.selectedSlot,
                            doctor: this.state.selectedDoctor,
                            records: this.props.records,
                        })}
                        onSubmit={this.handleSubmitRecord}
                    />
                </Modal>
            </div>


        );
    }
}

const mapStateToProps = (state: RootState) => ({
    date: state.schedule.date,
    timeSlots: state.schedule.timeSlots,
    doctors: state.schedule.doctors,
    records: state.schedule.records,
    currentCell: state.schedule.currentCell,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCurrentCell: (payload: { time: string; doctor: string }) =>
    dispatch(setCurrentCell(payload)),
    addRecord: (payload: TRecords) => dispatch(addRecord(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Schedule);