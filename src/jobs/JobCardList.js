import React from "react";
import JobCard from "./JobCard";
import Pagination from "../Pagination";

function JobCardList({ jobs, apply, currentPage, onPageChange, jobsPerPage }) {
    console.debug("JobCardList", "jobs", jobs);

    const startIndex = (currentPage - 1) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;

    // Extract the subset of jobs to display on the current page
    const jobsToShow = jobs.slice(startIndex, endIndex);
  
    return (
        <div className="JobCardList">
          {jobsToShow.slice(startIndex, endIndex).map(job => (
              <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  salary={job.salary}
                  equity={job.equity}
                  companyName={job.companyName}
              />
          ))}
        </div>
    );
}

export default JobCardList;
