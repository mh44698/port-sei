import React from 'react';
import { Link } from 'react-router-dom';


function Projects() {
  console.log()
  

  return (
    <div className="wrapper">
  <div>
      <h3>Live examples</h3>
      <a href="https://objective-goldwasser-ce50f3.netlify.com" target="popup"> 
      <p> JAVAScript REACT - Bulls vs Bears (API's Financial Data) (and this Page is built on REACT)</p>
      </a>
      <a href="https://mh44698.github.io/firstproject.io/" target="popup">
      <p> JAVAScript Vanilla - Hangman (API's Random Word API Data)</p>
      </a>
      <br></br>
      <h3>Code Examples</h3>

      <Link to="/RscriptDB2">
      <p> Rscript - Pulling data from DB2 merging 4 dataframes and exporting to excel (Live Order bank) Script Only, JD Order Fulfillment</p>
      </Link>
      
      <Link to="/RscriptMongoDB">
      <p> Rscript - Pulling data from a Mongo DB to show incomplete Quotes that haven't finalized the purchase process, JD Order Management</p>
      </Link>
      
      <Link to="/RscriptStockData">
      <p> Rscript - Pulling all S&P 500 stocks with historicals and merging with the data scraped options, and given a reasonable output for decision making, Person Use</p>
      </Link>

      <Link to="/PythonBasic">
      <p> Python Script - Scrapping basic data from a text file</p>
      </Link>
      
      <Link to="/PythonBasicSQL">
      <p> Python Script - putting basic data in a sql server</p>
      </Link>
      
      <Link to="/PythonBasicJSON">
      <p> Python Script - appending data to a json file</p>
      </Link>

  </div>
</div>
  );
};

export default Projects;