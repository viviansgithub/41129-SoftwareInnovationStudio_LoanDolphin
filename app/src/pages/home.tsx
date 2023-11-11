import "./home.css";
import { Button } from "common/ui/button";
import icon1 from './icon1.png';
import icon2 from './icon2.png';
import icon3 from './icon3.png';

export const HomePage = () => {
  return (
    <div>
      <div className="background-image"></div>
      <div className="main-content">
        <div className="heading">
          Empower Your Loan Application with AI Insights
        </div>

        <div className="services">
          <p>
            <img src={icon1} alt="Icon 1"></img> <div></div> Comprehensive Data
            Analysis
          </p>
          <p>
            <img src={icon2} alt="Icon 2"></img> <div></div>Personalised
            Recommendations
          </p>
          <p>
            <img src={icon3} alt="Icon 3"></img> <div></div> Enhanced Security
            Measures
          </p>
        </div>

        <Button variant="primary" to="/loan-form">
          Get Started
        </Button>
      </div>

      <footer className="footer"></footer>
    </div>
  );
};

export default HomePage;
