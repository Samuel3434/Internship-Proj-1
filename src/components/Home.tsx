import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
const navigate = useNavigate()
  const handlClick = ()=>{
    navigate('/signup')
  }
  return (
    <>
      <div className="home">
        <div className="text-container">
          <p>
            Welcome to -------- Discover the perfect blend of functionality and
            style. 
          </p>
        </div>
        <div className="circle1"></div>

        <div className="circle2">
          <div className="c1c">Perfect Blend</div>
        </div>

        <div className="circle3"></div>
        <div className="circle4"></div>

        <div className="log-in-circles" onClick={handlClick}>
          <div className="circle5"></div>
          <div className="circle6"></div>
          <div className="circle7"></div>
          <div className="circle8"></div>
          <div className="circle9"></div>
          <div className="circle10">
            <div className="c2c">Log In</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
