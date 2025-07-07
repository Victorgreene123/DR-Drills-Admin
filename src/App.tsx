

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css'
import RootLayout from './components/layouts/rootLayout'
import Quizzes from './pages/Quizzes';
import Dashboard from './pages/Dashboard';
import ViewQuizBlockScreen from './pages/ViewQuizBlockScreen';
import AnalyticsPage from './pages/Analytics';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="quizzes" element={<Quizzes />}/>
          <Route path="quizzes/:id" element={<ViewQuizBlockScreen />}/>
          <Route path="analytics" element={<AnalyticsPage />} />        </Route>
      </Routes>
    </Router>
  );
}

export default App;
