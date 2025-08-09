// src/pages/administrative-scope/admissions/AdmissionsView.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { Card, Row, Col, Image } from 'react-bootstrap'
import Tabs from '../../../../../components/ui/Tabs/Tabs'
import studentPhoto from '../../complements/kid8.png'
import TextDetail from '../../../../../components/TextDetail/TextDetail'


interface Tutor {
    name: string
    phone: string
    email: string
}

interface Student {
    id: string
    photo: string
    name: string
    age: number
    phone: string
    email: string
    tutors: Tutor[]
}

const MOCK_STUDENT: Student = {
    id: '1',
    photo: studentPhoto,
    name: 'Juan Pérez',
    age: 5,
    phone: '+591 7123-4567',
    email: 'juan.perez@ejemplo.com',
    tutors: [
        { name: 'Maria Arteaga de Perez', phone: '+591 7123-4568', email: 'ana.lopez@ejemplo.com' },
        { name: 'Tomàs Perez', phone: '+591 7123-4569', email: 'carlos.gomez@ejemplo.com' },
    ],
}




const AplicacionTabContent: React.FC = () => (
    <div className="px-3" style={{ display: "flex", flexDirection: 'column', gap: 16 }}>
        <TextDetail
            label="Nivel quen postula"
            answerLabel="Kinder"
        />
        <TextDetail
            label="Turno"
            answerLabel="Mañana"
        />
        <TextDetail
            label="Nombre completo del padre"
            answerLabel="Tomàs Perez"
        />
        <TextDetail
            label="Nombre completo del madre"
            answerLabel="Maria Arteaga de Perez"
        />
        <TextDetail
            label="Cantidad de hermanos en casa"
            answerLabel="4"
        />
        <TextDetail
            label="Cantidad de hermanos inscriptos en Kinda Golden Lion School"
            answerLabel="2"
        />
        <TextDetail
            label="Ayuda personalizada dentro del aula"
            answerLabel="No"
        />
    </div>
)
const ValoracionTabContent: React.FC = () => (
    <div className="px-3" style={{ display: "flex", flexDirection: 'column', gap: 8 }}>
        <TextDetail
            label="Postulante"
            answerLabel="Juan Pérez"
        />
        <TextDetail
            label="Edad del postulante"
            answerLabel="5"
        />
        <TextDetail
            label="Matemáticas"
            answerLabel="15 / 20"
        />
        <TextDetail
            label="Observaciones Matemáticas"
            answerLabel="Necesita refuerzo en multiplicaciones"
        />
        <TextDetail
            label="Conclusión Matemáticas"
            answerLabel="Refuerzo"
        />
        <TextDetail
            label="Docente Matemáticas"
            answerLabel="María Gómez"
        />
        <TextDetail
            label="Lenguaje"
            answerLabel="18 / 20"
        />
        <TextDetail
            label="Observaciones Lenguaje"
            answerLabel="Excelente comprensión lectora"
        />
        <TextDetail
            label="Conclusión Lenguaje"
            answerLabel="Apto"
        />
        <TextDetail
            label="Docente Lenguaje"
            answerLabel="Carlos Rivas"
        />
        <TextDetail
            label="Inglés"
            answerLabel="12 / 20"
        />
        <TextDetail
            label="Observaciones Inglés"
            answerLabel="Practicar listening"
        />
        <TextDetail
            label="Conclusión Inglés"
            answerLabel="Nivelación 1"
        />
        <TextDetail
            label="Docente Inglés"
            answerLabel="Laura Díaz"
        />

        <TextDetail
            label="Conclusión Corporal"
            answerLabel="Apto"
        />


    </div>
)













const AdmissionsView: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    // Más adelante aquí cargarás student real usando `id`
    const student = MOCK_STUDENT

    // Construimos el array de pestañas
    const tabs = [
        {
            id: 'aplicacion',
            label: 'Aplicación',
            content: (
                <div>
                    {/* TODO: contenido de Aplicación */}
                    <AplicacionTabContent />
                </div>
            ),
        },
        {
            id: 'valoracion',
            label: 'Valoración',
            content: (
                <div>
                    <ValoracionTabContent />
                </div>
            ),
        },
        {
            id: 'inscripcion',
            label: 'Inscripción',
            content: (
                <div>
                    {/* TODO: contenido de Inscripción */}
                </div>
            ),
        },
    ]

    return (
        <Row className="mt-4 gx-4">
            {/* COLUMNA IZQUIERDA */}
            <Col xl={4} lg={5} className="mb-4">
                <Card>
                    <Card.Body className="text-center">
                        <Image
                            src={student.photo}
                            style={{ borderRadius: '50%', width: 100, height: 100, objectFit: 'cover' }}

                            className="mb-3 d-flex justify-center align-items-center mx-auto"
                        />
                        <h4 className="fw-bold">{student.name}</h4>
                        <div className="text-muted">Edad: {student.age}</div>
                    </Card.Body>
                    <Card.Body>
                        <div className="mb-3">
                            <div className="fw-semibold">Teléfono</div>
                            <div className="text-gray-600">{student.phone}</div>
                        </div>
                        <div className="mb-3">
                            <div className="fw-semibold">Correo electrónico</div>
                            <div className="text-gray-600">{student.email}</div>
                        </div>
                        <div>
                            <div className="fw-semibold mb-2">Tutores</div>
                            {student.tutors.map((tutor, idx) => (
                                <div key={idx} className="mb-3">
                                    <div>{tutor.name}</div>
                                    <small className="text-gray-600 d-block">Tel: {tutor.phone}</small>
                                    <small className="text-gray-600 d-block">Email: {tutor.email}</small>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </Col>

            {/* COLUMNA DERECHA */}
            <Col xl={8} lg={8} style={{ maxHeight: 513 }}>
                <Tabs tabs={tabs} className="h-100" />
            </Col>
        </Row>
    )
}

export default AdmissionsView
