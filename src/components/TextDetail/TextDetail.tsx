import React from 'react'
import styles from './TextDetail.module.css'
interface TextDetailsProps {
    label: string;
    answerLabel: string | React.ReactNode;
    className?: string;
}

const TextDetail = ({ label, answerLabel, className }: TextDetailsProps) => {
    return (
        <div className={`${styles.textDetail}  ${className}`}>
            <div className={styles.textDetailLabel}>
                {label}
            </div>
            <div className={styles.textDetailAnswer}>
                {answerLabel}
            </div>
        </div>

    )
}

export default TextDetail