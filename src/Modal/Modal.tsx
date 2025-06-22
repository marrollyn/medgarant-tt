import React from 'react';
import styles from './Modal.module.scss';

interface IModalProps {
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
    doctor: string;
    time: string;
}

export default class Modal extends React.Component<IModalProps> {

    render() {
        const { visible, onClose, children, doctor, time } = this.props;

        if (!visible) return null;

        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <button className={styles.closeBtnX} onClick={onClose}>закрыть x</button>
                    <h4 className={styles.title}>Запись на прием к {doctor} в {time}</h4>
                    <div className={styles.content}>{children}</div>
                </div>
            </div>
        );
    }
}