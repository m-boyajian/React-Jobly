import React, {useContext, useState} from "react";
import UserContext from "../UserContext";

function JobCard({ id, title, salary, equity, companyName }) {
  console.debug("JobCard");
  const { hasApplied, applyToJob } = useContext(UserContext);
  const [applied, setApplied] = useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const isApplied = await hasApplied(id);
      setApplied(isApplied);
    }
    fetchData();
  }, [id, hasApplied]);  

  async function handleApply (evt) {
    console.log('Apply button clicked!');
    if(hasApplied(id)) return;
    applyToJob(id);
    setApplied(true);
  }

  return (
    <div className="JobCard card"> {applied}
    <div className="card-body">
      <h4 className="card-title">{title}</h4>
      <p>{companyName}</p>
      {salary && <div><small>Salary: {formatSalary(salary)}</small></div>}
      {equity !== undefined && <div><small>Equity: {equity}</small></div>}
      <button
          className="btn btn-danger font-weight-bold text-uppercase float-right"
          onClick={handleApply}
          disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  </div>
  );
}

function formatSalary(salary) {
  const numReverse = [];
  const salaryToString = salary.toString();

  for (let i = salaryToString.length -1; i >= 0; i--) {
    numReverse.push(salaryToString[i]);
    if (i> 0 && i % 3 ===0) numReverse.push(",");
  }
  return numReverse.reverse().join("");
}

export default JobCard;