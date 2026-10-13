import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function Header() {
    const { token, isStaff, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <header>
            <Link to='/'>Конференции.РФ</Link>
            {token && (
                <nav>
                    {isStaff ? (
                        <Link to='/admin'>Все заявки</Link>
                    ) : (
                        <>
                            <Link to='/applications'>Мои заявки</Link>
                            <Link to='/applications/new' className="newApplicationButton">Новая заявка</Link>
                        </>
                    )}
                    <button onClick={handleLogout}>Выйти</button>
                </nav>
            )}
        </header>
    )
}