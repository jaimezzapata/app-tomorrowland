
import { HashRouter, Routes, Route } from 'react-router-dom';
import { PinProvider } from './context/PinContext';
import { Home } from './components/Home';
import { MySchedule } from './components/MySchedule';
import './App.css';

function App() {
  return (
    <PinProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-schedule" element={<MySchedule />} />
        </Routes>
      </HashRouter>
    </PinProvider>
  );
}

export default App;

