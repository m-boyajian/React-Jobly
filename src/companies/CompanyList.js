import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import JoblyApi from "../JoblyApi";
import SearchForm from "../SearchForm";
import Pagination from "../Pagination";
import "../SearchForm.css";

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 8;

  useEffect(() => {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    fetchCompanies();
  }, [currentPage]);

  async function fetchCompanies() {
    const startIndex = (currentPage - 1) * companiesPerPage;
    const endIndex = startIndex + companiesPerPage;
    const allCompanies = await JoblyApi.getCompanies();
    setCompanies(allCompanies.slice(startIndex, endIndex));
  }

  async function search(name) {
    let companies = await JoblyApi.getCompanies(name);
    setCompanies(companies);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!companies) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {companies.length ? (
        <>
          <div className="CompanyList-list">
            {companies.map((c) => (
              <CompanyCard
                key={c.handle}
                handle={c.handle}
                name={c.name}
                description={c.description}
                logoUrl={c.logoUrl}
              />
            ))}
          </div>
          <Pagination
            companiesPerPage={companiesPerPage}
            totalCompanies={companies.length} 
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default CompanyList;
