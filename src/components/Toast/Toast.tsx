// src/components/Toast/Toast.tsx
import React, { useEffect } from 'react'
import { useUI } from '../../hooks/useUi'
import Button from '../ui/Button/Button'

type ToastType = 'success' | 'error' | 'info' | 'warning' | null

const ICONS_BY_TYPE: Record<Exclude<ToastType, null>, string> = {
    success: 'ki-duotone ki-check fs-2 text-success me-3',
    error: 'ki-duotone ki-cross fs-2 text-danger me-3',
    info: 'ki-duotone ki-information-5 fs-2 text-info me-3',
    warning: 'ki-duotone ki-warning fs-2 text-warning me-3',
}

const TITLES_BY_TYPE: Record<Exclude<ToastType, null>, string> = {
    success: 'Éxito',
    error: 'Error',
    info: 'Información',
    warning: 'Advertencia',
}

export interface ToastOptions {
    title?: string
    message: string
    iconClass?: string
    delay?: number
    type?: ToastType
    requireConfirmation?: boolean  // <-- nuevo flag
}

const Toast: React.FC = () => {
    const { toastVisible, toastOptions, hideToast } = useUI()

    useEffect(() => {
        if (!toastVisible || !toastOptions) return

        // solo auto-dismiss si NO requiere confirmación
        if (!toastOptions.requireConfirmation) {
            const timer = setTimeout(() => {
                hideToast()
            }, toastOptions.delay ?? 4000)
            return () => clearTimeout(timer)
        }
    }, [toastVisible, toastOptions, hideToast])

    if (!toastVisible || !toastOptions) return null

    let displayTitle = toastOptions.title ?? ''
    let displayIconClass = toastOptions.iconClass ?? ''

    if (toastOptions.type) {
        displayTitle = TITLES_BY_TYPE[toastOptions.type]
        displayIconClass = ICONS_BY_TYPE[toastOptions.type]
    }

    return (
        <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                minWidth: '250px',
                zIndex: 9999,
            }}
        >
            <div className="toast-header">
                {displayIconClass && (
                    <i className={displayIconClass}>
                        <span className="path1"></span>
                        <span className="path2"></span>
                    </i>
                )}
                <strong className="me-auto ms-1">{displayTitle}</strong>
                {/* siempre dejo la X */}
                {/* <button
                    type="button"
                    className="btn-close"
                    onClick={() => hideToast()}
                    aria-label="Close"
                /> */}
            </div>
            <div className="toast-body">{toastOptions.message}</div>
            {toastOptions.requireConfirmation && (
                <div className="toast-footer text-end p-2">
                    <Button
                        // className="btn btn-primary btn-sm"
                        onClick={() => hideToast()}
                    >
                        OK
                    </Button>
                </div>
            )}
        </div>
    )
}

export default Toast
