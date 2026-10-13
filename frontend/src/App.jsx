import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Login from './pages/Login'
import Register from './pages/Register'
import Applications from './pages/Applications'
import AddApplications from './pages/AddApplications'
import { useAuth } from './auth'
import AdminApplications from './pages/AdminApplications'


const Protected = ({ children }) => {
  const { token } = useAuth()
  if (!token) return <Navigate to='/login' />
  return children
}

function App() {
  return (
    <>
      <Header />
      <main className='page'>
        <Routes>
          <Route path='/' element={<Navigate to='/applications' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/applications' element={<Protected><Applications /></Protected>} />
          <Route path='/applications/new' element={<Protected><AddApplications /></Protected>} />
          <Route path='/admin' element={<Protected><AdminApplications /></Protected>} />
        </Routes>
      </main>
    </>
  )
}

export default App
