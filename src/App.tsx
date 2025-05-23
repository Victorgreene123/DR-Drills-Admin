

import { BrowserRouter as Router , Routes , Route } from 'react-router-dom'
import './App.css'
import RootLayout from './components/layouts/rootLayout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* <Route index element={<Home />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
