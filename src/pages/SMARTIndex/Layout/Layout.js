import { Outlet } from "react-router-dom";
import "./../../../style/_common/layout.css";

const Layout = () => {
  return (
    <div className="wrap">
      <header>
        <div>
          <h2>SMART Index</h2>
          <p>Stock Market Thermometer</p>
        </div>
      </header>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
