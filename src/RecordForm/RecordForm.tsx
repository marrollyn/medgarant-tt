import React from "react";
import styles from "./RecordForm.module.scss";
import type { TRecords } from "../slice/scheduleSlice";

interface IRecordFormProps {
    doctor: string;
    slot: string;
    date: string;
    record?: TRecords | null;
    onSubmit: (formData: TRecords) => void;
}

export default class RecordForm extends React.Component<IRecordFormProps> {
    state = {
        name: this.props.record?.patient.name || "",
        phone: this.props.record?.patient.phone || "",
        description: this.props.record?.description || "",
    };

    componentDidUpdate(prevProps: IRecordFormProps) {
        if (prevProps.record !== this.props.record) {
            this.setState({
                name: this.props.record?.patient.name || "",
                phone: this.props.record?.patient.phone || "",
                description: this.props.record?.description || "",
            });
        }
    }

    handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit({
            timeSlot: this.props.slot,
            doctor: this.props.doctor,
            description: this.state.description,
            patient: {
                name: this.state.name,
                phone: this.state.phone,
            },
        });
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit} id="record-form" className={styles.form}>
                <label className={styles.label}>
                    ФИО:
                    <input
                        className={styles.input}
                        name="name"
                        placeholder="Введите ФИО"
                        onChange={this.handleChange}
                        value={this.state.name}
                    />
                </label>

                <label className={styles.label}>
                    Телефон:
                    <input
                        className={styles.input}
                        type="tel"
                        name="phone"
                        placeholder="Введите номер"
                        onChange={this.handleChange}
                        value={this.state.phone}
                    />
                </label>

                <label className={styles.label}>
                    Жалобы / Информация:
                    <textarea
                        className={styles.textarea}
                        name="description"
                        placeholder="Опишите проблему"
                        onChange={this.handleChange}
                        value={this.state.description}
                    />
                </label>
                <button type="submit" className={styles.submitBtn}>
                    Сохранить
                </button>
            </form>
        );
    }
}
