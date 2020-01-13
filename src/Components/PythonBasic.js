import React from 'react';
// import { Link } from 'react-router-dom';


function PythonBasic(){
    console.log("Prjocts.js")

  return (
    <div className="wrapper">
  
  <div className="python-code">
      <p>Python Script - Scrapping basic data from a text file</p>
      <pre>{`
      
      #9.4 Write a program to read through the mbox-short.txt and figure out who has sent the greatest number of mail messages.
      # The program looks for 'From ' lines and takes the second word of those lines as the person who sent the mail.
      # The program creates a Python dictionary that maps the sender's mail address to a count of the number of times they appear in the file.
      # After the dictionary is produced, the program reads through the dictionary using a maximum loop to find the most prolific committer.
      
      stuff = list()
      #fh = input("Enter:")
      #if len(fname) <= 1 :
      fname = "mbox-short.txt"
      fh = open(fname)
      di = dict()
      for line in fh:
          c = line.split()
          #print(c[1])
          if line.startswith("From:"):
              line = line[6:]
              a = line.rstrip()
              di[a] = di.get(a,0) + 1
              #print(a)
      #print(di)
      largest = -1
      theword = None
      for k,v in di.items():
         # print(k,v)
          if v > largest :
              largest = v
              theword = k
      print(theword, largest)
      
      `}</pre>

  </div>
</div>
  );
}

export default PythonBasic;