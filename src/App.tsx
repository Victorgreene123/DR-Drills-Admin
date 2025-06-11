

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css'
import RootLayout from './components/layouts/rootLayout'
import Quizzes from './pages/Quizzes';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="quizzes" element={<Quizzes />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
