import { useEffect, useState } from "react"
import { request } from "../api"


export default function AdminApplications() {
    const [applications, setApplications] = useState([])
    const [filter, setFilter] = useState('')


    const getApplications = async () => {
        try {
            const data = await request('/admin/applications')
            setApplications(data.data)
        } catch (err) {
        }
    }

    const updateStatus = async (id, status) => {
        try {
            await request(`/admin/applications/${id}`, 'PATCH', { status })
            getApplications()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getApplications()
    }, [])

    const filtered = filter ? applications.filter((ap) => ap.status === filter) : applications


    return (
        <>
            <h1>Все конференции</h1>

            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value=''>Все заявки</option>
                <option value='new'>Новые</option>
                <option value='scheduled'>Мероприятие назначено</option>
                <option value='done'>Завершенные</option>
            </select>

            {filtered.length ? (
                filtered.map((ap) => (
                    <article className={`applicationCard ${ap.status}`} key={ap.id} data-testid="admin-row" >
                        <h2>{ap.room}</h2>
                        <p className="fullNameCard">ФИО: {ap.user}</p>
                        <p className="startDateCard">Дата: {ap.start_date}</p>
                        <p className="paymentCard">Оплата: {ap.payment_display}</p>
                        <select value={ap.status} onChange={(e) => { updateStatus(ap.id, e.target.value) }}>
                            <option value='new' disabled datatestid="admin-status">Новая</option>
                            <option value='scheduled'>Мероприятие назначено</option>
                            <option value='done'>Завершено</option>
                        </select>
                        <div className="reviewApplicationsCard">
                            {ap.review ? (
                                <p>Отзыв: {ap.review}</p>
                            ) : (
                                <p>Отзыва еще нету</p>
                            )}
                        </div>
                    </article >
                ))
            ) : (
                <>Конференций еще нету...</>
            )
            }
        </>
    )
}