import React from 'react';
// import { Link } from 'react-router-dom';


function RscriptStockData(){
    console.log("Prjocts.js")

  return (
    <div className="wrapper">
  
  <div className="python-code">
      <p>Rscript - Pulling all S&P 500 stocks with historicals and merging with the data scraped options, and given a reasonable output for decision making, Person Use</p>
      <pre>{`
      
      library(XML)
library(stringr)
library(XLConnect)
#library(fOptions)
datez <- Sys.Date()
year <- as.numeric(substring(datez, 1, 4))
mnth <- as.numeric(substr(datez, 6, 7))
mnth <- mnth-1
tr<-1
 for(i in 1:2)
 {
  mnth<-as.numeric(mnth)
mnth<- mnth+1
if (mnth > 12)
  (year = year + 1)
if (mnth > 12)
  (mnth = mnth - 12)

mnth <- sprintf("%02d", mnth)

symbols <- read.csv("/home/mark/Share/Indexs.csv", header = F, stringsAsFactors = F)
#symbols <- read.csv("c:/share/Indexs.csv", header = F, stringsAsFactors = F)
  
  
  for(j in 1:dim(symbols)[1])
  {
  sym<-  symbols[j,1]
  u<-paste("http://finance.yahoo.com/q/op?s=",sym,"&m=",year,"-",mnth,sep="")
   
tables = readHTMLTable(u)
tablex <- tables
list1 <- tablex$yfncsumtab
list1$V1 <- NULL
alpha<-str_length(list1$V2)
list1<-cbind(datez,alpha,list1)
list1<-subset(list1, alpha == 16 | alpha == 17 | alpha == 18 | alpha == 19 | alpha == 20, drop = T)
try(list1<-list1[-1,], silent=TRUE)
row.names(list1) <- NULL
try(list1<-list1[,-2], silent=TRUE)
try(list1<-cbind(sym,list1))
try(colnames(list1) <- c("SYM","DWNLDDATE","SYMBOL","LAST","CHG","BID","ASK","VOL","OPEN INT"), silent=TRUE)
temp1 <-list1  
ab<-(list1)
try(
  if (tr==1){temp<-(temp1)} else 
{temp<-rbind(temp,ab)}, silent=TRUE)
tr<-  tr+1
cat("Option Download Complete"," ",mnth,"-",year, sym, j ,"of", dim(symbols)[1], "\n")
}
#################Putting all the results in one file.
wr<-temp
wr1<-temp
try(
  if (i==1){wr<-(wr1)} else 
  {temp<-rbind(wr1,wr)}, silent=TRUE)
}
temp<-unique(temp)
#temp1<-temp
#temp1<-apply(temp1,2,sort) 
temp<-temp[order(temp$SYM),] 
#temp1<-[order(temp1[,3], ]

Gdatez <- as.Date(Sys.Date())
file<-paste("/home/mark/Share/options.csv",sep="")
write.csv(temp,file,row.names=FALSE)

#writeWorksheetToFile(file = "/home/mark/Share/54data.xlsx", data = temp, sheet = "Options")

#today <- Sys.Date()
#today <-format(today, format="%B %d %Y")
#shtname<-paste("COptions- ",today,sep="")
#writeWorksheetToFile(file = "/home/mark/Share/54data.xlsx", data = temp, sheet = shtname)

      
      `}</pre>

  </div>
</div>
  );
}

export default RscriptStockData;