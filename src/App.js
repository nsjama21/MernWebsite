import './App.css';
import { useState } from "react"
import NewOrderPage from './pages/NewOrderPage';
import AuthPage from './pages/AuthPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from "./components/NavBar"
import { Routes, Route } from "react-router-dom"

function App() {
  const [user, setUser] = useState(null)

  return (
    <main className='App'>
      {
        user ?
          <>
            <NavBar />
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
          <AuthPage />
      }
    </main>
  );
}

export default App;
