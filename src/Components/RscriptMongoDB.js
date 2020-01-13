import React from 'react';
// import { Link } from 'react-router-dom';


function RscriptMongoDB(){
    console.log("Prjocts.js")

  return (
    <div className="wrapper">
  
  <div className="python-code">
      <p>Rscript - Pulling data from a Mongo DB to show incomplete Quotes that haven't finalized the purchase process, JD Order Management</p>
      <pre>{`
      
      ########### First Run ##########
#install.packages("mongolite")
#install.packages(RODBC)
########### Parameters ################
library(mongolite)
library(RODBC)
#channel<-odbcDriverConnect("Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=c:/IncentivesMONGO/Data/Database1.accdb")
#### Might have to switch to 32 Bit RStudio / Tools / Global options /  Change / Use 32 Bit

today<-date()
today1<-substr(today, 1, 13)
urlcert2 <- "mongodb://a905122:mktplc02@ldxx90mng54.dx.deere.com/salescenter_prod"
mongodb <- "salescenter_prod"

quotecollection <- "quote"
FRSCollection <- "finalizeRetailSale"
finalizeRetailSaleRecapData<-"finalizeRetailSaleRecapData"

# address<-paste("c:/IncentivesMONGO/Data/StatBucketPROD.csv",sep="")
# patheheavyhitter<-paste("c:/IncentivesMONGO/Data/IncentiveHeavyHitterlistPROD",today1,".csv")
# ddress2<-paste(patheheavyhitter,sep="")
address3<-paste("C:/IncentivesMONGO/Data/PFRSDetail.csv",sep="")
address4<-paste("\\\\share-internal.deere.com@SSL\\teams\\OMProgram\\Document Library\\PFRSDetail.csv",sep="")



cat("End Parameters")
########### QUOTE Counts ###########################
# Delete = False was added 2/18/2019

con<-mongo(collection = quotecollection, db = mongodb, url = urlcert2)
### Expired
ExpiredQuote1<-con$count('{"quoteStatus" : "Expired", "deleted" : false}')
ExpiredQuote2<-con$count('{"quoteStatus" : "EXPIRED", "deleted" : false}')
ExpiredQuote<-ExpiredQuote1 + ExpiredQuote2
#ActiveQuote
ActiveQuote1<-con$count('{"quoteStatus" : "Active", "deleted" : false}')
ActiveQuote2<-con$count('{"quoteStatus" : "ACTIVE", "deleted" : false}')
ActiveQuote<-ActiveQuote1 + ActiveQuote2
#Signed Quote
SignedQuote1<-con$count('{"quoteStatus" : "Signed", "deleted" : false}')
SignedQuote2<-con$count('{"quoteStatus" : "SIGNED", "deleted" : false}')
SignedQuote3<-con$count('{"quoteStatus" : "E-Sign In Progress", "deleted" : false}')
SignedQuote<-SignedQuote1 + SignedQuote2 + SignedQuote3
#Won Quote
WonQuote1<-con$count('{"quoteStatus" : "WON", "deleted" : false}')
WonQuote2<-con$count('{"quoteStatus" : "Won", "deleted" : false}')
WonQuote<-WonQuote1 + WonQuote2 
#Lost Quote
LostQuote1<-con$count('{"quoteStatus" : "LOST", "deleted" : false}')
LostQuote2<-con$count('{"quoteStatus" : "Lost", "deleted" : false}')
LostQuote<-LostQuote1 + LostQuote2 
#No Sale
BoughtUsedQuote1<-con$count('{"quoteStatus" : "Bought Used Equipment", "deleted" : false}')
NopurchaseQuote2<-con$count('{"quoteStatus" : "No Purchase", "deleted" : false}')
NoSaleOrBoughtUSed<-BoughtUsedQuote1 + NopurchaseQuote2 
#Sold
SoldQuote1<-con$count('{"quoteStatus" : "Sold", "deleted" : false}')
SoldQuote2<-con$count('{"quoteStatus" : "SOLD", "deleted" : false}')
SoldQuote<-SoldQuote1 + SoldQuote2 
#Total
TotalQuote<-con$count('{}')
Total<-NoSaleOrBoughtUSed+LostQuote+WonQuote+SignedQuote+ActiveQuote+ExpiredQuote+SoldQuote
cat("End Quote Counts")

########### Finalize Counts ###########################
Finalize<-mongo(collection = FRSCollection, db = mongodb, url = urlcert2)
TotalFinanalizedata<-Finalize$find('{}')

PREFRSDetail<-TotalFinanalizedata

FDATAcomp <- subset(TotalFinanalizedata, vmsStatus == "FRS_COMPLETE")
FRSCOMPLETE<-as.numeric(as.character(nrow(FDATAcomp)))

FDATAcomp<- subset(TotalFinanalizedata, vmsStatus == "FRS_PENDING")
FRSPEND<-as.numeric(as.character(nrow(FDATAcomp)))

FDATAcomp<- subset(TotalFinanalizedata, vmsStatus == "RRS_COMPLETE")
RRSCOMPLETE<-as.numeric(as.character(nrow(FDATAcomp)))

FDATAcomp<- subset(TotalFinanalizedata, vmsStatus == "RRS_PENDING")
RRSPEND<-as.numeric(as.character(nrow(FDATAcomp)))

PREFRSDetail<-subset(TotalFinanalizedata, vmsStatus != "FRS_COMPLETE")

cat("End Finalize Counts")
########### FRS RECAP List #########
Recap<-mongo(collection = finalizeRetailSaleRecapData, db = mongodb, url = urlcert2)
finalizeRetailSaleRecapData<-Recap$find('{}')
# $ Amount by time Periods FRS'd Successfully
#Last 7 days
now <- Sys.Date()
lstwk7<- as.Date(now)-7
Lastwk <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(lstwk7))
incentivesAmount7<-sum(as.numeric(Lastwk$incentivesAmount))*-1
#Last 14 days
lstwk14<- as.Date(now)-14
Lastwk <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(lstwk14))
incentivesAmount14<-sum(as.numeric(Lastwk$incentivesAmount))*-1
#m30days
lstmnt30<- as.Date(now)-30
Lastwk <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(lstmnt30))
incentivesAmount30<-sum(as.numeric(Lastwk$incentivesAmount))*-1
#m30to60day
lstmnt60<- as.Date(now)-60
Lastwk <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(lstmnt60))
incentivesAmount60<-sum(as.numeric(Lastwk$incentivesAmount))*-1
lst60<-as.numeric(incentivesAmount60)
incentivesAmount60<-incentivesAmount60-incentivesAmount30
#m60to90days
lstmnt90<- as.Date(now)-90
Lastwk <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(lstmnt90))
incentivesAmount90<-sum(as.numeric(Lastwk$incentivesAmount))*-1
incentivesAmount90<-incentivesAmount90-lst60
#YTD Calendar
YTD<-as.numeric(as.Date(now)-(as.Date(paste(substr(as.Date(now), 1,4),"-01-01",sep = ""))))
YTD<- as.Date(now)-YTD
YeartoDate <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(YTD))
YeartoDateCal<-sum(as.numeric(YeartoDate$incentivesAmount))*-1



# #YTD Fiscal
YTD<-as.numeric(as.Date(now)-(as.Date(paste(substr(as.Date(now), 1,4),"-01-01",sep = ""))))

# fisyear<-as.numeric(substr(as.Date(now), 1,4))
# if (substr(as.Date(now), 6,7) == (11|12))
#    fisyear<-as.numeric(substr(as.Date(now), 1,4))-1)

    
    
# YTD<- as.Date(now)-YTD
# YeartoDate <- subset(finalizeRetailSaleRecapData, as.Date(finalizedDate) > as.Date(YTD))
# YeartoDateFiscal<-sum(as.numeric(YeartoDateFiscal$incentivesAmount))*-1




#Making it pretty for the people:
Spend7<-paste("$ ",incentivesAmount7)
Spend14<-paste("$ ",incentivesAmount14)
Spend0to30<-paste("$ ",incentivesAmount30)
Spend30to60<-paste("$ ",incentivesAmount60)
Spend60to90<-paste("$ ",incentivesAmount90)
YeartoDateCal<-paste("$ ",YeartoDateCal)
cat("End FRS Recap Counts")
########### Retail Incentives List ##############
  # Get Rid of FRS DATA with no Retail incentives
FDATA<-TotalFinanalizedata
FDATA1 <- subset(FDATA, retailIncentivesList != "NULL")
#retailincen <- as.character(FDATA$retailIncentivesList)
#print(retailincen)


df <- sapply  (FDATA1$retailIncentivesList, data.frame)

dim.data.frame(df)
DF<-unclass (df)

x<-as.numeric(length(DF))
#DF[[1]][["agreementNo"]]

j<-1
df_total<-DF[[j]][["agreementNo"]]
for(j in 1:as.numeric(length(DF)))
#  for(j in 62:100)
{
   agreement <- DF[[j]][["agreementNo"]]
    df <- data.frame(agreement)
  df_total <- rbind(df_total,df)
}

df_total<-as.data.frame(df_total)
summary(df_total)
listofincentives<-unique(df_total)
getmode <- function(v) {
  uniqv <- unique(v)
  uniqv[which.max(tabulate(match(v, uniqv)))]
}
retailsummary<-getmode(df_total)
retailsummary<-tail(listofincentives,20)
cat("End Retail Incentives List")
# ########### Primary Incentive list ###############
# 
# # Get Rid of FRS DATA with no Retail incentives
# FDATAP <- subset(FDATA, primaryIncentives != "NULL")
# #retailincen <- as.character(FDATA$retailIncentivesList)
# #print(retailincen)
# 
# 
# df <- sapply  (FDATAP$primaryIncentives, data.frame)
# 
# dim.data.frame(df)
# DF<-unclass (df)
# 
# x<-as.numeric(length(DF))
# #DF[[1]][["agreementNo"]]
# 
# j<-1
# df_total<-DF[[j]][["agreementNumber"]]
# for(j in 1:as.numeric(length(DF)))
# {
#   agreement <- DF[[j]][["agreementNumber"]]
#   df <- data.frame(agreement)
#   df_total <- rbind(df_total,df)
# }
# 
# df_total<-as.data.frame(df_total)
# summary(df_total)
# listofincentives<-unique(df_total)
# getmode <- function(v) {
#   uniqv <- unique(v)
#   uniqv[which.max(tabulate(match(v, uniqv)))]
# }
# primarysummary<-getmode(df_total)
# primarysummary<-tail(primarysummary,20)
# cat("End Primary Incentives List")
# ########### Secondary Incentive List ###################
# 
# # Get Rid of FRS DATA with no Retail incentives
# FDATAS <- subset(FDATA, secondaryIncentives != "NULL")
# #retailincen <- as.character(FDATA$retailIncentivesList)
# #print(retailincen)
# 
# 
# df <- sapply  (FDATAS$secondaryIncentives, data.frame)
# 
# dim.data.frame(df)
# DF<-unclass (df)
# 
# x<-as.numeric(length(DF))
# #DF[[1]][["agreementNo"]]
# 
# j<-1
# df_total<-DF[[j]][["agreementNumber"]]
# for(j in 1:as.numeric(length(DF)))
# {
#   agreement <- DF[[j]][["agreementNumber"]]
#   df <- data.frame(agreement)
#   df_total <- rbind(df_total,df)
# }
# 
# df_total<-as.data.frame(df_total)
# summary(df_total)
# listofincentives<-unique(df_total)
# getmode <- function(v) {
#   uniqv <- unique(v)
#   uniqv[which.max(tabulate(match(v, uniqv)))]
# }
# secondarysummary<-getmode(df_total)
# secondarysummary<-tail(secondarysummary,20)
# 
# cat("End Secondary Incentives List")
# ########### Special Incentive List ###################
# 
# # Get Rid of FRS DATA with no Retail incentives
# FDATASS <- subset(FDATA, specialIncentives != "NULL")
# #retailincen <- as.character(FDATA$retailIncentivesList)
# #print(retailincen)
# 
# 
# df <- sapply  (FDATAS$specialIncentives, data.frame)
# 
# dim.data.frame(df)
# DF<-unclass (df)
# 
# x<-as.numeric(length(DF))
# #DF[[1]][["agreementNo"]]
# 
# j<-1
# df_total<-DF[[j]][["agreementNumber"]]
# for(j in 1:as.numeric(length(DF)))
# {
#   agreement <- DF[[j]][["agreementNumber"]]
#   df <- data.frame(agreement)
#   df_total <- rbind(df_total,df)
# }
# 
# df_total<-as.data.frame(df_total)
# summary(df_total)
# listofincentives<-unique(df_total)
# getmode <- function(v) {
#   uniqv <- unique(v)
#   uniqv[which.max(tabulate(match(v, uniqv)))]
# }
# specialsummary<-getmode(df_total)
# specialsummary<-tail(specialsummary,20)
# 
# 
# 
# cat("End Special Incentives List")

########### OutPut########

# ###### SQL Functions 
# channel<-odbcDriverConnect("Driver={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=c:/IncentivesMONGO/Data/Database1.accdb")
# ISP <-sqlFetch(channel,"IncentiveSpendtrendPROD", colnames = FALSE, rownames = FALSE)
# ISP$ID <- NULL
# ISP$rownames <- NULL
# ongoingspend <-as.data.frame(cbind(today,Spend7,Spend14,Spend0to30,Spend30to60,Spend60to90,YeartoDateCal))
# ISPn<- rbind(ISP,ongoingspend)
# sqlDrop(channel, "IncentiveSpendtrendPROD", errors = TRUE)
# sqlSave(channel, ISPn, tablename = "IncentiveSpendtrendPROD", append = TRUE)
# 
# 
# SBP <-sqlFetch(channel,"StatBucketPROD", colnames = FALSE, rownames = FALSE)
# SBP$Field1 <- NULL
# SBP$rownames <- NULL
# ongoing <-as.data.frame(cbind(today,ExpiredQuote,SignedQuote,ActiveQuote,WonQuote,RRSPEND,RRSCOMPLETE,FRSPEND,FRSCOMPLETE))
# SBPn<-rbind(SBP,ongoing)
# sqlDrop(channel, "StatBucketPROD", errors = TRUE)
# sqlSave(channel, SBPn, tablename = "StatBucketPROD", append = TRUE)


#########################  RRS Pending, RRS Complete, FRS Pending details

PREFRSDetail<-subset(TotalFinanalizedata, vmsStatus != "FRS_COMPLETE")
head(PREFRSDetail)
PREFRSDetail$retailIncentivesList <-NULL
PREFRSDetail$reconciliationFailedMessage<-NULL
PREFRSDetail$reconciledDeletedIncentives<-NULL
PREFRSDetail$customerName<-NULL
PREFRSDetail[,1]<-NULL
PREFRSDetail1<- as.data.frame(PREFRSDetail)
PREFRSDetail1<-cbind(today,PREFRSDetail1)


write.csv(PREFRSDetail1,address3)

address4<-paste("\\\\share-internal.deere.com\\teams\\OMProgram\\Document Library\\PFRSDetail.csv",sep="")
write.csv(PREFRSDetail1,address4)


######## Stackability Not in Prod Yet #####



#odbcClose(channel)

cat("End Output")

######## Stackability Not in Prod Yet #####
# # Heavy Hitters Output
# incentives <-cbind(retailsummary,primarysummary,secondarysummary,specialsummary)
# colnames(incentives) <- c("Retail","Primary","Secondary","Special")
# write.csv(incentives,address2)


cat("Analysis End")
######## End ###########


      
      `}</pre>

  </div>
</div>
  );
}

export default RscriptMongoDB;