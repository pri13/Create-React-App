import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import ViewUserProfile from './components/ViewUserProfile';
import DataLoader from './components/DataLoader';
import EmailSender from './components/EmailSender';
import LoginPage from './Pages/LoginPage';
import CreateAccountPage from './Pages/CreateAccountPage';
import NavigationBar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavigationBar />
          <div>
            <Routes>
              <Route path="/" element={<PrivateRoute><UserList /></PrivateRoute> } />
              <Route path="/user/:userId" element={<PrivateRoute><UserForm /></PrivateRoute> } />
              <Route path="/view" element={<PrivateRoute><ViewUserProfile /></PrivateRoute> } />
              <Route path="/dataLoader" element={<PrivateRoute><DataLoader /></PrivateRoute> } />
              <Route path="/emailSender" element={<PrivateRoute><EmailSender /></PrivateRoute> } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-account" element={<CreateAccountPage />} />
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
