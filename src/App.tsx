import Home from "./components/Home";
import Form from "./components/Form";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Users from "./components/Users";
import Accessory from "./components/Accessory";
import Authentication from "./components/Authentication";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "./styles/Form.css";
import "./styles/Navbar.css";
import { useEffect, useState } from "react";

function App() {
  const [animate, setAnimate] = useState<boolean>(false);
  const [showHeaderFooter, setSHF] = useState<boolean>(true);

  return (
    <Router>
      {/* LocationWrapper handles animation on route change */}
      <LocationWrapper setAnimate={setAnimate} setSHF={setSHF} />

      <div className="bd">
        {/* Accessory components */}
        {/* <Accessory {...{ invert: "false", animate }} />
        <Accessory {...{ invert: "true", animate }} /> */}

        {/* Navbar */}
        {showHeaderFooter && <Navbar />}

        {/* Main content routes */}
        { (
          <main style={{ flex: !showHeaderFooter ? "1" : "0.85" }}>
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/home" element={<Home />} />
              <Route path="/form" element={<Form />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path="/signup" element={<Authentication />}></Route> */}
            </Routes>
          </main>
        )}

        {/* Footer */}
        { showHeaderFooter && <Footer />}
      </div>
    </Router>
  );
}

// LocationWrapper handles location change and animation
const LocationWrapper = ({
  setAnimate,
  setSHF,
}: {
  setAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  setSHF: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const location = useLocation();
  const [prevURL, setPrevURL] = useState(location.pathname);

  useEffect(() => {
    if (prevURL === location.pathname) return;
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 1000);
    setPrevURL(location.pathname);
  }, [location]);

  useEffect(() => {
    const noAnimatePaths = ["/signup","/"];
    setSHF(!noAnimatePaths.includes(location.pathname));
  }, [location.pathname]);

  return null;
};

export default App;
