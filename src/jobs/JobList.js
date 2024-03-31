import React, { useState, useEffect } from "react";
import JobCardList from "./JobCardList";
import SearchForm from "../SearchForm";
import JoblyApi from "../JoblyApi";
import Pagination from "../Pagination";
import "../SearchForm.css";

function JobList() {
  const [jobs, setJobs] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 8; // Set the number of jobs to display per page

  useEffect(() => {
    console.debug("JobList useEffect getAllJobsOnMount");
    search();
  }, [currentPage]);

  async function search(title) {
    let jobs = await JoblyApi.getJobs(title);
    setJobs(jobs);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages based on the total number of jobs and jobs per page
  const pageCount = Math.ceil(jobs ? jobs.length / jobsPerPage : 0);

  if (!jobs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      {jobs.length ? (
        <>
          <JobCardList jobs={jobs} currentPage={currentPage} onPageChange={handlePageChange} jobsPerPage={jobsPerPage} />
          <Pagination
            pageCount={pageCount} // Pass the calculated pageCount to Pagination
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

export default JobList;


