import { useState } from "react"
import { request } from "../api"
import { useNavigate } from "react-router-dom"

const ROOMS = [
    'Большой конференц-зал',
    'Малый конференц-зал',
    'Переговорная комната',
    'Зал для презентаций',
]

export default function AddApplications() {

    const [form, setForm] = useState({
        room: '', start_date: '', payment: ''
    })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await request('/applications', 'POST', form)
            navigate('/applications')
        } catch (err) {
            setErrors(err.errors || {})
        }
    }

    return (
        <section className="auth">
            <form onSubmit={handleSubmit}>
                <h1>Новая заявка</h1>
                <label>Помещение</label>
                <select name="room" value={form.room} onChange={handleChange}>
                    <option value=''>Выберите помещение</option>
                    {ROOMS.map((room) => (
                        <option key={room} value={room}>{room}</option>
                    ))}
                </select>
                <span className="errField">{errors.room}</span>

                <label>Дата начала</label>
                <input type="date" value={form.start_date} name="start_date" onChange={handleChange} data-testid="req-date" />
                <span className="errField">{errors.start_date}</span>

                <label>Способ оплаты</label>
                <select onChange={handleChange} value={form.payment} name="payment" data-testid="req-payment">
                    <option value=''>Выберите способ оплаты</option>
                    <option value='sbp'>Переводом по СБП</option>
                    <option value='cash'>Наличными(при очном посещении)</option>
                </select>
                <span className="errField">{errors.payment}</span>

                <button type="submit" data-testid="req-submit">Отправить</button>
            </form>
        </section>
    )
}