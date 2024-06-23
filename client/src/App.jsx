import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import About from './pages/about'
import Profile from './pages/profile'
import Navbar from './components/navbar'
import PrivateRoute from './components/privateRoute'

function App() {

  return (
    <>
      <BrowserRouter >
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signIn' element={<SignIn />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/about' element={<About />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
