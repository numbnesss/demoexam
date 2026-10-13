import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api";


export default function Register() {
    const [form, setForm] = useState({
        username: '', password: '', full_name: '', phone: '', email: ''
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/register', 'POST', form)
            navigate('/login')
        } catch (err) {
            setErrors(err.errors || {})
        }
    }

    return (
        <section className="auth">
            <h1>Регистрация</h1>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="username">Логин</label>
                <input type="text" name="username" id="username" onChange={handleChange} value={form.username} data-testid='reg-login' />
                <span className="errField">{errors.username}</span>

                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={form.password} data-testid='reg-password' />
                <span className="errField">{errors.password}</span>

                <label htmlFor="full_name">ФИО</label>
                <input type="text" name="full_name" id="full_name" onChange={handleChange} value={form.full_name} data-testid='reg-fullname' />
                <span className="errField">{errors.full_name}</span>

                <label htmlFor="phone">Телефон</label>
                <input type="text" name="phone" id="phone" onChange={handleChange} value={form.phone} data-testid='reg-phone' />
                <span className="errField">{errors.phone}</span>

                <label htmlFor="email">Почта</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={form.email} data-testid='reg-email' />
                <span className="errField">{errors.email}</span>

                <button type="submit" data-testid="reg-submit" >Зарегистрироваться</button>
            </form>
            <Link to='/login'>Уже зарегистрированы? Вход</Link>
        </section>
    )
}