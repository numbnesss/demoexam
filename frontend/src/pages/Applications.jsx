import { useEffect, useState } from "react"
import { request } from "../api"
import ReviewForm from "../components/ReviewForm"

export default function Applications() {
    const [applications, setApplications] = useState([])


    const getApplications = async () => {
        try {
            const data = await request('/applications')
            setApplications(data.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getApplications()
    }, [])


    return (
        <>
            <h1>Мои конференции</h1>
            <div data-testid="reqlist">
                {applications.length ? (
                    applications.map((ap) => (
                        <article className={`applicationCard ${ap.status}`} key={ap.id}>
                            <h2>{ap.room}</h2>
                            <p className="startDateCard">Дата: {ap.start_date}</p>
                            <p className="paymentCard">Оплата: {ap.payment_display}</p>
                            <p className="statusCard">Статус: {ap.status_display}</p>
                            <div className="reviewApplicationsCard">
                                {ap.review ? (
                                    <p>Отзыв: {ap.review}</p>
                                ) : ap.status === 'done' ? (
                                    <ReviewForm id={ap.id} onSaved={getApplications} />
                                ) : (
                                    <p>Отзыв можно оставить после завершения мероприятия</p>
                                )}
                            </div>
                        </article >
                    ))
                ) : (
                    <>Конференций еще нету...</>
                )
                }
            </div>
        </>
    )
}