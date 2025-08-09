import React, { useState } from 'react';
import Input from '../Input/Input';
import styles from './TagsInput.module.css';
import { KTIcon } from '../../../_metronic/helpers';

interface TagsInputProps {
    label: string;
    name: string;
    value: string[];
    onChange: (list: string[]) => void;
    error?: string;
    required?: boolean;
    style?: React.CSSProperties;
}

const TagsInput: React.FC<TagsInputProps> = ({
    label, name, value, onChange, error, required, style,
}) => {
    const [text, setText] = useState('');
    const [localError, setLocalError] = useState('');

    const handleAdd = () => {
        const t = text.trim();
        if (!t) {
            setLocalError('No puede estar vacío');
            return;
        }
        // Opcional: evitar duplicados
        if (value.includes(t)) {
            setLocalError('Ya añadido');
            return;
        }
        onChange([...value, t]);
        setText('');
        setLocalError('');
    };

    const handleRemove = (item: string) => {
        onChange(value.filter(x => x !== item));
    };

    return (
        <div className={styles.container} style={style}>
            <label>
                {label}{required ? ' *' : ''}
            </label>
            <div className={styles.inputRow}>
                <Input
                    type="text"
                    name={`${name}_tag`}
                    placeholder="Agregar"
                    value={text}
                    onChange={e => { setText(e.target.value); setLocalError(''); }}
                    style={{ width: '100%' }}
                    iconRight={
                        <button type="button" onClick={handleAdd} style={{ marginTop: 8 }}>
                            {" "}

                            <KTIcon
                                iconName="plus"
                                className="fs-2 text-success"
                                iconType="outline"
                            />
                        </button>
                    }
                />
                {/* <button type="button" onClick={handleAdd}>
                    {" "}

                    <KTIcon
                        iconName="plus"
                        className="fs-2 text-success"
                        iconType="outline"
                    />
                </button> */}
            </div>
            {(localError || error) && (
                <p className={styles.error}>{localError || error}</p>
            )}
            <div className={styles.tagsList}>
                {value.map(tag => (
                    <div key={tag} className={styles.tag}>
                        <span style={{ marginRight: 4 }}>{tag}</span>
                        <button type="button" onClick={() => handleRemove(tag)}>
                            {" "}
                            <KTIcon
                                iconName="trash"
                                className="fs-2 text-danger"
                                iconType="outline"
                            />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TagsInput;
