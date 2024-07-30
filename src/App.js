import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Auth from './Components/Auth';
import Hello from './Components/Hello';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/hello" element={<Hello />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

