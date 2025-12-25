import { BrowserRouter as Router , Routes , Route,  } from 'react-router-dom'
import './App.css'
import RootLayout from './components/layouts/rootLayout'
import Quizzes from './pages/Quizzes';
import Dashboard from './pages/Dashboard';
import ViewQuizBlockScreen from './pages/ViewQuizBlockScreen';
import AnalyticsPage from './pages/Analytics';
import Users from './pages/Users';
import Subscription from './pages/Subscriptions';
import Campaigns from './pages/Campaigns';
import Lectures from './pages/Lectures';
import Settings from './pages/Settings';
import { AuthProvider} from './context/authcontext';
import Login from './pages/Login';
import Entry from './pages/entry';
import ProtectedRoute from './components/ProtectedRoute';
import ViewLectureBlockScreen from './pages/ViewLectureBlock';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/ResetPassword';
import MobileBlocker from './components/MobileBlocker';
// import { useEffect } from 'react';

function App() {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path='/login' element={<MobileBlocker><Login /></MobileBlocker>} />
        <Route path='/forgot-password' element={<MobileBlocker><ForgotPassword /></MobileBlocker>} />
        <Route path='/reset-password' element={<MobileBlocker><ResetPassword /></MobileBlocker>} />

        <Route element={<ProtectedRoute />} >
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Entry />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="quizzes" element={<Quizzes />}/>
          <Route path="quizzes/:id" element={<ViewQuizBlockScreen />}/>
          <Route path='users' element={<Users />} />
          <Route path = "subscriptions" element = {<Subscription />} /> 
          <Route path="analytics" element={<AnalyticsPage />} />   
          <Route path ="campaigns" element= {<Campaigns />} /> 
          <Route path="lectures" element={<Lectures />} /> 
          <Route path="lectures/:id" element={<ViewLectureBlockScreen />}/>
          <Route path="settings" element={<Settings />} />                

         </Route>
         </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
  
}

export default App;
