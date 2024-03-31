import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../JoblyApi";
import JobCardList from "../jobs/JobCardList";
import "./CompanyDetail.css";

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10; 

  useEffect(() => {
    async function fetchCompanyDetails() {
      const companyData = await JoblyApi.getCompany(handle);
      setCompany(companyData);
    }

    fetchCompanyDetails();
  }, [handle]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CompanyDetail">
      <h2 className="company-title">{company.name}</h2>
      <p className="company-description">Description: {company.description}</p>
      <p className="company-description">Number of Employees: {company.jobs.length}</p>
      <JobCardList
        jobs={company.jobs}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        jobsPerPage={jobsPerPage}
      />
    </div>
  );
}

export default CompanyDetail;






