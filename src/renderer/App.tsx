import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import icon from '../../assets/icon.svg';
import './App.css';
import DraggableWidget from './DraggableWidget';




export default function App() {
  return (
    <Router>
      <Routes>


        <Route path="/" element={<DraggableWidget />} />


      </Routes>
    </Router>
  );
}
