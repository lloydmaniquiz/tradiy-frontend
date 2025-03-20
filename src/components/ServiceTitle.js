import React from "react";

const ServiceTitle = () => {
  // Extracting the query parameter 'query' from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const serviceTitle = urlParams.get("query") || "Default Service"; // Fallback text if no query is found

  return (
    <div>
      <h1>{`${serviceTitle} > Fisher Decorating Services Ltd.`}</h1>
    </div>
  );
};

export default ServiceTitle;
