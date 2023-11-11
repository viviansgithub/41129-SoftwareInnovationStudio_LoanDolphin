import React, { useState } from "react";
import { Button } from "common/ui/button";
import { useLoanEstimation } from "common/ui/loan_estimation";
import { getResultsUrl, parseFormData } from "common/ui/form_data";
import { PageWrapper } from "common/ui/page_wrapper";

export const LoanForm: React.FC = () => {
  const [formData, setFormData] = useState({
    gender: "",
    married: "",
    dependents: "",
    selfEmployed: "",
    education: "",
    applicantIncome: "",
    coApplicantIncome: "",
    loanTerm: "",
    creditHistory: "",
    propertyArea: "",
  });

  const parsedFormData = React.useMemo(
    () =>
      parseFormData({
        genderMale: (() => {
          switch (formData.gender) {
            case "Male":
              return 1;
            case "Female":
              return 0;
          }
        })(),
        married: parseYesNo(formData.married),
        dependents: formData.dependents,
        selfEmployed: parseYesNo(formData.selfEmployed),
        educationNotGraduate: formData.education === "Graduate" ? 0 : 1,
        applicantIncome: formData.applicantIncome,
        coapplicantIncome: formData.coApplicantIncome || 0,
        loanTerm: formData.loanTerm ? parseInt(formData.loanTerm) / 6 : undefined,
        creditHistory: formData.creditHistory,
        propertyArea: formData.propertyArea,
      }),
    [formData],
  );

  const result = useLoanEstimation(parsedFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <PageWrapper>
      <div className="component-wrapper">
        <div style={{ position: "relative" }}>
          <h2
            style={{
              color: "#42A7D5",
              fontSize: 44,
              fontFamily: "Kumbh Sans",
              fontWeight: "600",
            }}
          >
            Please enter your information
          </h2>
          <form onSubmit={handleSubmit} className="two-column-form">
            <div className="form-column">
              <h3>Gender:</h3>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <label>Male</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <label>Female</label>
              </div>
            </div>
            <div className="form-column">
              <h3>Applicant Income:</h3>
              $ <input
                type="text"
                name="applicantIncome"
                value={formData.applicantIncome}
                onChange={handleChange}
              />
            </div>
            <div className="form-column">
              <h3>Married:</h3>
              <div>
                <input
                  type="radio"
                  name="married"
                  value="Yes"
                  checked={formData.married === "Yes"}
                  onChange={handleChange}
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="married"
                  value="No"
                  checked={formData.married === "No"}
                  onChange={handleChange}
                />
                <label>No</label>
              </div>
            </div>
            <div className="form-column">
              <h3>Co-Applicant Income:</h3>
              $ <input
                type="text"
                name="coApplicantIncome"
                pattern="^\$?\d+(\.\d{1,2})?$" required
                value={formData.coApplicantIncome}
                onChange={handleChange}
              />
            </div>
            <div className="form-column">
              <h3>Number of Dependents:</h3>
              <select
                name="dependents" 
                value={formData.dependents}
                onChange={handleChange}
                style={{height: "22px", width: "58%"}}
              >
                <option value="" disabled selected></option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3 or more</option>
              </select>

            </div>
            <div className="form-column">
              <h3>Loan Term:</h3>
              <select
                name="loanTerm"
                value={formData.loanTerm}
                onChange={handleChange}
                style={{height: "22px", width: "58%"}}
              >
                <option value="" disabled selected></option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
                <option value="18">18 months</option>
                <option value="24">24 months</option>
                <option value="30">30 months</option>
                <option value="36">36 months</option>
              </select>
            </div>
            <div className="form-column">
              <h3>Self Employed:</h3>
              <div>
                <input
                  type="radio"
                  name="selfEmployed"
                  value="Yes"
                  checked={formData.selfEmployed === "Yes"}
                  onChange={handleChange}
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="selfEmployed"
                  value="No"
                  checked={formData.selfEmployed === "No"}
                  onChange={handleChange}
                />
                <label>No</label>
              </div>
            </div>
            <div className="form-column">
              <h3>Credit History:</h3>
              <select
                name="creditHistory"
                value={formData.creditHistory}
                onChange={handleChange}
                style={{height: "22px", width: "58%"}}
              >
                <option value="" disabled selected></option>
                <option value="0">No unpaid debt</option>
                <option value="1">Has unpaid debt</option>
              </select>
            </div>
            <div className="form-column">
              <h3>Education:</h3>
              <div>
                <input
                  type="radio"
                  name="education"
                  value="Graduate"
                  checked={formData.education === "Graduate"}
                  onChange={handleChange}
                />
                <label>Graduated University</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="education"
                  value="Undergraduate"
                  checked={formData.education === "Undergraduate"}
                  onChange={handleChange}
                />
                <label>Did Not Graduate University</label>
              </div>
            </div>
            <div className="form-column">
              <h3>Property Area:</h3>
              <select
                name="propertyArea"
                value={formData.propertyArea}
                onChange={handleChange}
                style={{height: "22px", width: "58%"}}
              >
                <option value="" disabled selected></option>
                <option value="50">Urban</option>
                <option value="100">Semi-Urban</option>
                <option value="200">Rural</option>
              </select>
            </div>
          </form>
        </div>
        <div style={{ width: 675, textAlign: "right", marginTop: 24 }}>
          <div style={{ position: "sticky", top: 20, minHeight: 54 }}>
            {result ? (
              <>
                <div>Estimate:</div>
                <strong style={{ color: "#42A7D5", fontSize: 20 }}>
                  {(result.formattedAmount)}
                </strong>{" "}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 100,
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <Button to="/">Back</Button>
          <Button
            variant="primary"
            disabled={!parsedFormData}
            to={parsedFormData && getResultsUrl(parsedFormData)}
          >
            See my results
          </Button>
        </div>
      </div>
    </PageWrapper>
  );

  function parseYesNo(val: string) {
    switch (val) {
      case "Yes":
        return 1;
      case "No":
        return 0;
    }
  }
};
