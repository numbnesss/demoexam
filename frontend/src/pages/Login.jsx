import { useState } from "react";
import { useAuth } from "../auth";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api";


export default function Login() {
    const [form, setForm] = useState({
        username: '', password: ''
    })
    const [errors, setErrors] = useState({})
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await request('/login', 'POST', form)
            login(data.token, data.is_staff)
            navigate(data.is_staff ? '/admin' : '/applications')
        } catch (err) {
            setErrors(err.errors || {})
        }
    }

    return (
        <section className="auth">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor="username">Логин</label>
                <input type="text" name="username" id="username" onChange={handleChange} value={form.username} data-testid="login-login" />
                <span className="errField">{errors.username}</span>

                <label htmlFor="password">Пароль</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={form.password} data-testid="login-password" />
                <span className="errField">{errors.password}</span>

                <button type="submit" data-testid="login-submit" >Войти</button>
            </form>
            <Link to='/register'>Еще не зарегистрированы? Регистрация</Link>
        </section>
    )
}