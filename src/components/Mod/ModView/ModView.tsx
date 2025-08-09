// src/components/ModView/ModView.tsx
import React from 'react'
import PageHeader from '../../PageHeader/PageHeader'
import TextDetail from '../../TextDetail/TextDetail';
import Tabs from '../../ui/Tabs/Tabs'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button/Button'
import styles from './ModView.module.css' // importa aquí el CSS con tus skeletons
import { useThemeMode } from '../../../_metronic/partials'

interface ModViewProps {
  pageHeaderData: {
    title: string,
    linkTitle: string,
    subtitle: string,
  },
  mod: {
    single: string,
  },
  detailsLabels: {
    label: string,
    answerLabel?: string,
  }[],
  secondCard?: boolean,
  secondCardTabs?: {
    id: number | string,
    label: string,
    content: React.ReactNode,
  }[],
  loading: boolean,
  className?: string,
  secondCardClassName?: string,
}

const ModView = ({
  pageHeaderData,
  mod,
  detailsLabels,
  secondCard = true,
  secondCardTabs = [],
  loading,
  className,
  secondCardClassName,
}: ModViewProps) => {
  const navigate = useNavigate()
  const { mode } = useThemeMode()

  const SKELETON_LINES = 6

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <section style={{
        marginTop: 16,
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <PageHeader
          title={pageHeaderData.title}
          linkTitle={pageHeaderData.linkTitle}
          subtitle={pageHeaderData.subtitle}
        />
      </section>

      <section className="d-flex flex-column flex-lg-row gap-4 pt-4">

        <div className={`card lg:max-w-[400px] ${className}`} style={{ minWidth: 398 }}>
          <div className=" border-0 pt-6 pb-0" style={{ paddingBottom: 0, paddingLeft: 16 }}>
            {loading
              ? <div className={mode === 'dark' ? styles.darkSkeleton : styles.skeleton} style={{ width: '60%', height: '1.5rem' }} />
              : <h3>Detalle de {mod.single.toLowerCase()}</h3>
            }
          </div>
          <div className="card-body">
            {loading

              ? Array.from({ length: SKELETON_LINES }).map((_, i) => (
                <div key={i} className={mode === 'dark' ? styles.darkSkeleton : styles.skeleton} style={{ height: '1rem', marginBottom: '0.75rem' }} />
              ))
              : (
                <section style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: '1rem',
                }}>
                  {detailsLabels.map((label, i) => (
                    <TextDetail
                      key={i}
                      label={label.label}
                      answerLabel={label.answerLabel ?? '-'}
                      className={styles.textDetail}
                    />
                  ))}
                </section>
              )
            }
          </div>
        </div>

        {secondCard && (
          <div className="flex-grow-1 w-100">
            {loading
              ? (
                <div className={`card ${secondCardClassName}`}>
                  <div className=" border-0 pt-6">
                    <div className={mode === 'dark' ? styles.darkSkeleton : styles.skeleton} style={{ width: '40%', height: '1.5rem' }} />
                  </div>
                  <div className="card-body">
                    {/* un bloque grande de placeholder */}
                    <div className={mode === 'dark' ? styles.darkSkeleton : styles.skeleton} style={{ width: '100%', height: '200px' }} />
                  </div>
                </div>
              )
              : (
                <Tabs
                  className="flex-grow-1 w-100"
                  tabs={secondCardTabs}
                />
              )
            }
          </div>
        )}
      </section>
    </div>
  )
}

export default ModView
