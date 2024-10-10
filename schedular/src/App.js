import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DeliveryList from './components/DeliveryList';
import DeliveryDetail from './components/DeliveryDetail';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'antd/dist/reset.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeliveryList />} />
        <Route path="/delivery/*" element={<DeliveryDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
