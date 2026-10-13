import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [isStaff, setIsStaff] = useState(localStorage.getItem('is_staff') === 'true')

    const login = (token, isStaff) => {
        localStorage.setItem('token', token)
        localStorage.setItem('is_staff', isStaff)
        setToken(token)
        setIsStaff(isStaff)
    }

    const logout = () => {
        localStorage.clear()
        setToken(null)
        setIsStaff(false)
    }

    return (
        <AuthContext.Provider value={{ token, isStaff, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}