import "./App.css";
import { Routes, Route } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';

// pages
import { Login } from "./pages/Login";
import { Register } from "./pages/Register"
import { RegisterCel } from "./pages/RegisterCel"
import { RegisterDocuments } from "./pages/RegisterDocuments"
import { RegisterSuccess } from "./pages/RegisterSuccess"
import { Home } from "./pages/Home"
import { Profile } from "./pages/Profile"
import { Ratings } from './pages/Ratings';
import { OrderNotes } from './pages/OrderNotes';
import { MonitoringOrder } from "./pages/MonitoringOrder"
import { ConfirmOrder } from "./pages/ConfirmOrder"

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="register-cel" element={<RegisterCel />} />
        <Route path="register-doc" element={<RegisterDocuments />} />
        <Route path="register-suc" element={<RegisterSuccess />} />
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="ratings/:id" element={<Ratings />} />
        <Route path="order-notes/:id" element={<OrderNotes />} />
        <Route path="monitoring-order/:id" element={<MonitoringOrder />} />
        <Route path="confirm-order" element={<ConfirmOrder />} />
        <Route path="debug" element={<div style={{ padding: 20 }}>Debug OK</div>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
