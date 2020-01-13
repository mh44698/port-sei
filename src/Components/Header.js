import React from 'react';
// import { Link } from 'react-router-dom';



function Header(){
    console.log("Prjocts.js")

  return (
 <nav>
       <ul className="nav-links">
            {/* <Link style={navStyle} to="/">
               <li>Home</li>
           </Link>

           <Link style={navStyle} to="/StockWinners">
               <li>Bullish Stocks</li>
           </Link>

           <Link style={navStyle} to="/StockLosers">
               <li>Bearish Stocks</li>
           </Link>

           <Link style={navStyle} to="/MajorIndexes">
               <li>Major Indexes</li>
           </Link> */}
            <h1>Header</h1>
       </ul>
   </nav>
  );
}

export default Header;