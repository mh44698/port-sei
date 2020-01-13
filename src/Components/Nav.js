import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
    const navStyle = {
        color: 'white'
    };

  return (
 <nav>
       <ul className="nav-links">
       <img src={"/mymug.jpg"} alt="SAP/HANA" />
       
         <Link style={navStyle} to="/">
               <p>Home</p>
           </Link>

           <Link style={navStyle} to="/Projects">
               <p>Projects</p>
           </Link>
 
           <Link style={navStyle} to="/OnlineResume">
               <p>Online Resume</p>
           </Link>

           <Link style={navStyle} to="/ContactInfo">
               <p>Contact Infomation</p>
           </Link>

       </ul>
       <div className="imgs-for-reference">
           <hr></hr>
       <img src={"/react.png"} alt="React" />
       <img src={"/HTML5.png"} alt="HTML5" />
       <img src={"/css.png"} alt="CSS" />
       <img src={"/VanillaJS.jpeg"} alt="Vanilla JavaScript" />
       <img src={"/Node.png"} alt="Node.js" />
       <img src={"/Python.jpeg"} alt="Python" />
       <img src={"/Rcran.jpeg"} alt="RStudio" /> 
       <img src={"/MongoDB.png"} alt="MongoDB" />
       <img src={"/github.jpeg"} alt="Github" />
       <img src={"/Hana.jpeg"} alt="SAP/HANA" />
       <img src={"/SQLlight.jpeg"} alt="SQLLight" />
       {/* <img src={logo} alt="Logo" /> */}
       {/* <img src={logo} alt="Logo" /> */}
       </div>
   </nav>
  );
}

export default  Nav;