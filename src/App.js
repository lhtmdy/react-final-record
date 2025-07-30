import {Routes,Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/DashBoard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<Dashboard/>}>
          <Route path='products' element={<AdminProducts/>}></Route>
          <Route path='coupons' element={<AdminCoupons/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
