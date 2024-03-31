import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ name, description, logoUrl, handle }) {
  console.debug("CompanyCard", logoUrl);

  return (
    <div className="CompanyCard card">
      <div className="card-body">
        <h4 className="card-title">
          <Link to={`/companies/${handle}`}>{name}</Link>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={name}
              className="float-right ml-5"
            />
          )}
        </h4>
        <p><small>{description}</small></p>
      </div>
    </div>
  );
}

export default CompanyCard;

