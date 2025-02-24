import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from './Header';
import Sidebar from './SideBar';
import Home from './Home';
import StockTable from "./StockTable"; // Import your StockTable component

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(true);

  const OpenSidebar = () => {
    setOpenSidebarToggle((prev) => !prev);
  };

  return (
    <Router>
      <div className="grid-container">
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        {/* <Header OpenSidebar={OpenSidebar} /> */}

        {/* The routes will now control which page to display */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/StockTable" element={<StockTable />} />
          {/* Add a default route */}
          <Route path="/" element={<Home />} /> {/* Default route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
