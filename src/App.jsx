import './App.css';
import { Route, Routes } from 'react-router-dom';
import Profile from '../src/pages/Profile';
import Homepage from '../src/pages/Homepage';
import RootLayout from '../src/Layouts/RootLayout';
import Dashboard from '../src/pages/Dashboard';
import Review from '../src/pages/Review';
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
