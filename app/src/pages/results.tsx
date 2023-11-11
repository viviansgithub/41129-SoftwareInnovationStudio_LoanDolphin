import { useEffect, useState } from "react";
import { Button } from "common/ui/button";
import {
  getRecommendationsUrl,
  useFormDataFromQueryParams,
} from "common/ui/form_data.tsx";
import { useLoanEstimation, formatCurrency } from "common/ui/loan_estimation";
import { PageWrapper } from "common/ui/page_wrapper";
import "common/ui/component-wrapper.css";
import { ProgressBar } from "./progressBar";
import ConfettiExplosion from "react-confetti-explosion";

export function Results() {
  const formData = useFormDataFromQueryParams();
  const result = useLoanEstimation(formData);
  const [isExploding, setIsExploding] = useState(false);
  const [increasedAmount, setIncreasedAmount] = useState(
    result ? result.amount : 0,
  );

useEffect(() => {
  const targetAmount = result ? result.amount : 0;
  const difference = targetAmount - increasedAmount;
  const increment = difference / 5; // Remove Math.ceil to not get rounded value
  let counter = increasedAmount;

  const timer = setInterval(() => {
    counter += increment;
    if (counter >= targetAmount) {
      clearInterval(timer);
    }
    setIncreasedAmount(counter);
  }, 10);

  setIsExploding(true);

  return () => clearInterval(timer);
}, [result, increasedAmount]);

  const estimatedAmount = formatCurrency(increasedAmount);

  return (
    <PageWrapper>
      <div className="component-wrapper">
        {isExploding && <ConfettiExplosion style={{ marginLeft: "50%" }} />}
        <h2>You can borrow up to</h2>
        <h1 style={{ color: "#42A7D5" }}>{estimatedAmount}</h1>
        <ProgressBar value={result?.formattedAmount} />
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Button to="/loan-form">Recalculate</Button>
          <Button variant="primary" to={getRecommendationsUrl(formData)}>
            See Recommendations
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
}
