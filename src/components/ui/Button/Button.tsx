import React from 'react'

interface ButtonProps {
    onClick: (e?: any) => void;
    icon?: any;
    style?: React.CSSProperties;
    variant?: 'primary' | 'secondary';
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
}

const Button = ({
    onClick,
    variant,
    icon,
    style,
    className,
    disabled,
    loading,
    children
}: ButtonProps) => {
    let variantClass = variant === 'primary' ?
        ' btn-primary' :
        'btn-light-primary'

    return (
        <button
            className={className ?`${className}`: `btn me-3  ${variantClass} `}
            onClick={onClick}
            style={style}
            disabled={disabled || loading}
        >
            {loading ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {icon && <div className="me-2">{icon}</div>}
                    <div>{children}</div>
                </div>
            )}
        </button>
    )
}

export default Button