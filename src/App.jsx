import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';
import Homepage from './pages/Homepage';
import RootLayout from './Layouts/RootLayout';
import Dashboard from './pages/DashBoard';
import Review from './pages/Review';
import Authenticate from './pages/Authenticate';

function App() {

  return (
      <Routes>
        <Route path='/' element={< Homepage />} />
        <Route path='/credentials' element={< Authenticate />} />
        <Route path='/auth' element={< RootLayout />} >
          <Route index element={< Dashboard />} />
          <Route path='dashboard' element={< Dashboard />} />
          <Route path='profile' element={< Profile />} />
          <Route path='review' element={< Review />} />
        </Route>
      </Routes>
  )
}

export default App
