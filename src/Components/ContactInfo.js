import React from 'react';
// import { Link } from 'react-router-dom';


function ContactInfo(){
    console.log("Prjocts.js")

  return (
    <div className="wrapper">
  
  <div>
      <a href="https://www.linkedin.com/in/mark-holmes-04452834/" target="popup"><img src="/Linkedin.png" alt="Linkedin"></img>
      <p> linkedin</p>
      </a>
 
    
      <a href="mailto:MrkHlms1@gmail.com?Subject=Resume%20Page" target="_top"><img src="/Gmail.jpeg" alt="Email Me"></img>
      <p> MrkHlms1@gmail.com</p>
      </a>

      <img src="/Cellphone.jpeg" alt="Call/Text Me"></img>
      <p>Call/Text: 563-210-0216</p>
   
      <a href="https://github.com/mh44698/" target="popup"><img src="/github.png" alt="GitHub"></img>
      <p>My git hub repo</p>
      </a>
  </div>
</div>
  );
}

export default ContactInfo;