import { useState, useEffect } from "react";
import { Button } from "common/ui/button";
import { cardData } from "./recs-data";
import Card from "common/ui/card";
import "common/ui/card.css";
import "common/ui/component-wrapper.css";
import { useFormDataFromQueryParams } from "common/ui/form_data";
import { formatCurrency, useLoanEstimation } from "common/ui/loan_estimation";
import { PageWrapper } from "common/ui/page_wrapper";
import { ProgressBar } from "../progressBar";

export function PersonalisedRecommendations() {
  const formData = useFormDataFromQueryParams();
  const result = useLoanEstimation(formData);
  const [increasedAmount, setIncreasedAmount] = useState(
    result ? result.amount : 0,
  );

  useEffect(() => {
    const improvedAmount = result ? result.amount * 1.3 : 0;
    const targetAmount = result ? result.amount * 1.3 : 0; //here
    const difference = targetAmount - increasedAmount;
    const increment = difference / 50;
    let counter = increasedAmount;

    const timer = setInterval(() => {
      counter += increment;
      if (counter >= targetAmount) {
        clearInterval(timer);
      }
      setIncreasedAmount(counter);
    }, 1);

    return () => clearInterval(timer);
  }, [result, increasedAmount]);

  const estimatedImprovedAmount = formatCurrency(increasedAmount);

  const handleEmail = () => {
    const currentURL = window.location.href;
    const emailSubject = "Your LoanDolphin Results";
    const emailBody1 = `Here are your LoanDolphin results!`;
    const emailBody2 = `You are estimated to be able to loan ${result?.formattedAmount}.`;
    const emailBody3 = `Check out this link to see your loan eligibility results and tips to improve your loan amount:`;
    const emailBody4 = `${currentURL}`;

    window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody1)}%0D%0A%0D%0A${encodeURIComponent(emailBody2)}%0D%0A%0D%0A${encodeURIComponent(emailBody3)}%0D%0A%0D%0A${encodeURIComponent(emailBody4)}`;
  };

  const importantValues = cardData.filter((item) => {
    if (
      (formData.selfEmployed === 1 && item.title === "Strengthen Self-Employment Finances") ||
      (formData.educationNotGraduate === 1 && item.title === "Invest in Education") ||
      (formData.applicantIncome < 50000 && item.title === "Increase Your Income") ||
      (formData.coapplicantIncome < formData.applicantIncome && item.title === "Consider a Co-Applicant") ||
      (formData.creditHistory === 0 && item.title === "Build a Strong Credit History") ||
      (formData.propertyArea === 200 && item.title === "Evaluate Property Location")
    ) {
      return true;
    }
    return false;
  });

  const otherValues = cardData.filter((item) => {
    if (
      item.title === "Manage Existing Debt" ||
      item.title === "Shop Around for Loan Options" ||
      item.title === "Explore Government Programs" ||
      item.title === "Seek Professional Guidance" ||
      item.title === "Build a Good Relationship with the Lender"
    ) {
      return true;
    }
    return false;
  });

  const [shuffledOtherValues, setShuffledOtherValues] = useState(() => {
    const shuffled = [...otherValues];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  });

  useEffect(() => {
    // Do nothing to prevent reshuffling during component updates
  }, []);

  // Combine the important values and other values arrays
  const combinedValues = [...importantValues, ...shuffledOtherValues];

  return (
    <PageWrapper>
    <div className="container">
      <div className="component-wrapper">
        <div>
          <h2>You may be able to increase your loan amount to </h2>
          <h1 style={{ color: "#42A7D5" }}>
            {estimatedImprovedAmount}
          </h1>
        </div>
        <h2>Tips to Increasing Your Loan Eligibility:</h2>
        <div className="grid-container">
          {combinedValues.slice(0, 4).map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
          }}
        >
          <Button to="/loan-form">Recalculate</Button>
          <Button variant="primary" onClick={handleEmail}>
            Email my Results
          </Button>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
