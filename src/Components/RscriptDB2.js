import React from 'react';
// import { Link } from 'react-router-dom';


function RscriptDB2(){
    console.log("Prjocts.js")

  return (
    <div className="wrapper">
  
  <div className="python-code">
      <p>Script - Pulling data from DB2 merging 4 dataframes and exporting to excel (Live Order bank) Script Only, JD Order Fulfillment</p>
      <pre>{`
      ###################################  Instructions
      # 
      # 1. Download R Cran from    http://cran.us.r-project.org/
      # 2. Download R Studio from  http://www.rstudio.com/ide/download/
      # 3. Download RODBC by typing  install.packages("RODBC", lib="/my/own/R-packages/") 
      # 4. Download gdata by typing  install.packages("gdata", lib="/my/own/R-packages/") 
      # 5. Download reshape by typing  install.packages("reshape", lib="/my/own/R-packages/")
      # 6. Configure ODBC Passwork on SYSTEM DSN DB211
      # 7. Configure ODBC Passwork on SYSTEM DSN DB221
      # 8. Open this file in RStudio and Press CNTRL + SHIFT + ENTER together
      # 
      ################################## Begin Code Execution
      library(RODBC)
      library(gdata)
      library(reshape)
      ###################################  MISC DATA SETS
      channel <- odbcConnect("db211")
      PLNMKT<-sqlQuery(channel,
                       "SELECT BR_SUB_PLAN_MARKET.BRANCH_CODE, BR_SUB_PLAN_MARKET.PLAN_MKT_CODE
                       FROM UDXDAA.BR_SUB_PLAN_MARKET BR_SUB_PLAN_MARKET
                       WHERE (BR_SUB_PLAN_MARKET.PLAN_MKT_CODE='P3')")
      
      channel <- odbcConnect("db211")
      ESTBASE<-sqlQuery(channel,"SELECT DRDBP01.CCG_XRF_GROUPINGS.RPT_GROUPING_CODE, CCGB.SUB_GROUPING_CODE
                        FROM DRDBP01.CCG_XRF_GROUPINGS CCG_XRF_GROUPINGS, DRDBP01.CCG_XRF_GROUPINGS CCGB, DRDBP01.CCG_XRF_GRP_DESC X
                        WHERE (DRDBP01.CCG_XRF_GROUPINGS.SUB_GROUPING_CODE=CCGB.RPT_GROUPING_CODE) AND (X.RPT_GROUPING_CODE=DRDBP01.CCG_XRF_GROUPINGS.SUB_GROUPING_CODE) AND (DRDBP01.CCG_XRF_GROUPINGS.RPT_GRP_CODE_TYPE='G') AND (DRDBP01.CCG_XRF_GROUPINGS.MAINTENANCE_UNIT='90') AND (DRDBP01.CCG_XRF_GROUPINGS.SUB_MAINT_UNIT='90') AND (X.MAINTENANCE_UNIT='90') AND (X.RPT_GRP_CODE_TYPE='G') AND (X.APPL_DISTRIBUTION In ('Y','S')) AND (CCGB.RPT_GRP_CODE_TYPE='G') AND (CCGB.MAINTENANCE_UNIT='90') AND (CCGB.SUB_GRP_CODE_TYPE='B') AND (CCGB.SUB_MAINT_UNIT='90')")
      colnames(ESTBASE)[2]<-"BASE_MACHINE_CODE"
      ESTBASE<-unique(ESTBASE)
      ESTBASE$BASE_MACHINE_CODE<-trim(ESTBASE$BASE_MACHINE_CODE)
      
      channel <- odbcConnect("db211")
      HSIM<-sqlQuery(channel,"SELECT SIM_REPORTS.XRF_CODE, SIM_REPORTS.SEQ_CODE
                     FROM A90OFCP.CG_COMP_FX_PS CG_COMP_FX_PS, DRDBP01.SIM_REPORTS SIM_REPORTS
                     WHERE CG_COMP_FX_PS.PLAN_MKT_CODE = SIM_REPORTS.PLAN_MKT_CODE AND CG_COMP_FX_PS.SEQ_CODE = SIM_REPORTS.SEQ_CODE AND ((CG_COMP_FX_PS.AGGREGATE_FLAG<>'Y') AND (SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3') AND (CG_COMP_FX_PS.COMP_LEVEL='1') AND (CG_COMP_FX_PS.AGGREGATE_GRAND_FLAG<>'Y') OR (CG_COMP_FX_PS.AGGREGATE_FLAG Is Null) AND (SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3') AND (CG_COMP_FX_PS.COMP_LEVEL='1') AND (CG_COMP_FX_PS.AGGREGATE_GRAND_FLAG<>'Y') OR (CG_COMP_FX_PS.AGGREGATE_FLAG<>'Y') AND (SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3') AND (CG_COMP_FX_PS.COMP_LEVEL='1') AND (CG_COMP_FX_PS.AGGREGATE_GRAND_FLAG Is Null) OR (CG_COMP_FX_PS.AGGREGATE_FLAG Is Null) AND (SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3') AND (CG_COMP_FX_PS.COMP_LEVEL='1') AND (CG_COMP_FX_PS.AGGREGATE_GRAND_FLAG Is Null))")
      
      channel <- odbcConnect("db211")
      AGGSIM<-sqlQuery(channel,"SELECT SIM_REPORTS.XRF_CODE, SIM_REPORTS.SEQ_CODE
                       FROM A90OFCP.CG_COMP_FX_PS CG_COMP_FX_PS, DRDBP01.SIM_REPORTS SIM_REPORTS
                       WHERE CG_COMP_FX_PS.PLAN_MKT_CODE = SIM_REPORTS.PLAN_MKT_CODE AND CG_COMP_FX_PS.SEQ_CODE = SIM_REPORTS.SEQ_CODE AND ((CG_COMP_FX_PS.AGGREGATE_FLAG='Y') AND (SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3'))")
      
      channel <- odbcConnect("db211")
      FACSIM<-sqlQuery(channel,"SELECT SIM_REPORTS.XRF_CODE, SIM_REPORTS.SEQ_CODE
                       FROM A90OFCP.CG_COMP_FX_PS CG_COMP_FX_PS, DRDBP01.SIM_REPORTS SIM_REPORTS
                       WHERE CG_COMP_FX_PS.PLAN_MKT_CODE = SIM_REPORTS.PLAN_MKT_CODE AND CG_COMP_FX_PS.SEQ_CODE = SIM_REPORTS.SEQ_CODE AND ((SIM_REPORTS.REPORT_NAME='COMPOSITE') AND (SIM_REPORTS.PLAN_MKT_CODE='P3') AND (CG_COMP_FX_PS.COMP_LEVEL='2'))")
      
      
      channel <- odbcConnect("db211")
      RECCALENDAR<-sqlQuery(channel,"SELECT REC_FISCALDATES.CALENDAR_DATE, REC_FISCALDATES.FISCAL_YEAR, REC_FISCALDATES.FISCAL_MONTH, REC_FISCALDATES.FISCAL_WEEK
                            FROM UDXDAA.REC_FISCALDATES REC_FISCALDATES")
      colnames(RECCALENDAR)[1]<-"DATE"
      
      ########################################  Orders  Pace Start
      channel <- odbcConnect("db211")
      MACHORDERORD<-sqlQuery(channel, "SELECT CG_MACH_ORDERS.ORDERING_UNIT_CODE, CG_MACH_ORDERS.SALES_ORDER_NUMBER, CG_MACH_ORDERS.INVENTORY_SOURCE, CG_MACH_ORDERS.ORDER_ENTRY_DATE, CG_MACH_ORDERS.BASE_MACHINE_CODE, CG_MACH_ORDERS.ORDER_INVOICE_DATE
                             FROM DRDBP01.CG_MACH_ORDERS CG_MACH_ORDERS")
      ##WHERE (CG_MACH_ORDERS.DATE_SHIPPED Is Not Null)")
      colnames(MACHORDERORD)[1]<-"BRANCH_CODE"
      MACHORDERORD<-merge(x = MACHORDERORD, y = PLNMKT,by="BRANCH_CODE")
      MACHORDERORD$BASE_MACHINE_CODE<-trim(MACHORDERORD$BASE_MACHINE_CODE)
      MACHORDERORD<-merge(x = MACHORDERORD, y = ESTBASE, by="BASE_MACHINE_CODE")
      MACHORDERORD<-unique(MACHORDERORD)
      
      j=as.data.frame(unique(MACHORDERORD$INVENTORY_SOURCE))
      for(i in 1:dim(j)[1])
      {  
        
        try(fac<-(j[i,1]), silent=TRUE)
        try(fac<-as.character(j[i,1]), silent=TRUE)
        try(fac<-trim(fac), silent=TRUE)
        
        try(if(nchar(as.character(fac))==1) {fac<-paste(fac,"X",sep="")}, silent=TRUE)
        
        facdata<-paste("SELECT CG_INVC_",fac,"_HST.UNIT_CODE, CG_INVC_",fac,"_HST.ORDER_NUMBER, CG_INVC_",fac,"_HST.INVENTORY_SOURCE, CG_INVC_",fac,"_HST.ORDER_ENTRY_DATE, CG_INVC_",fac,"_HST.INVOICE_DATE, CG_INVC_",fac,"_HST.BASE_MACHINE_CODE FROM UDXDAA.CG_INVC_",fac,"_HST CG_INVC_",fac,"_HST WHERE (CG_INVC_",fac,"_HST.SHIP_DATE>{d '2011-01-01'})",sep="")
        
        channel <- odbcConnect("db221")
        try(PCI<-sqlQuery(channel, facdata), silent=TRUE)
        if (i==1){otemp<-(PCI)} else 
          try({otemp<-rbind(otemp,PCI)}, silent=TRUE)
        cat("PCI added to OTemp ", i, "\n")
      }
      
      colnames(otemp)[1]<-"BRANCH_CODE"
      otemp<-merge(x = otemp, y = PLNMKT,by="BRANCH_CODE")
      otemp$BASE_MACHINE_CODE<-trim(otemp$BASE_MACHINE_CODE)
      otemp<-merge(x = otemp, y = ESTBASE, by="BASE_MACHINE_CODE")
      otemp<-unique(otemp)
      colnames(otemp) <- colnames(MACHORDERORD)
      MACHORDERORD<-rbind(MACHORDERORD,otemp)
      MACHORDERORDL<-MACHORDERORD
      
      colnames(MACHORDERORD)[5]<-"DATE"
      MACHORDERORD<-merge(MACHORDERORD, RECCALENDAR, by="DATE")
      colnames(MACHORDERORD)[8]<-"XRF_CODE"
      
      # Levels we forecast for
      MACHORDERORDh<-merge(MACHORDERORD, HSIM, by="XRF_CODE")
      MACHORDERORDh$SEQ_CODE<-as.character(MACHORDERORDh$SEQ_CODE)
      trim <- as.data.frame(paste(trim(MACHORDERORDh[,12]),MACHORDERORDh[,9],MACHORDERORDh[,11],sep = ""))
      MACHORDERORDh<-as.data.frame(table(trim))
      # Levels we forecast for
      
      # Factory Levels
      MACHORDERORDf<-merge(MACHORDERORD, FACSIM, by="XRF_CODE")
      MACHORDERORDf$SEQ_CODE<-as.character(MACHORDERORDf$SEQ_CODE)
      trim <- as.data.frame(paste(trim(MACHORDERORDf[,12]),MACHORDERORDf[,9],MACHORDERORDf[,11],sep = ""))
      MACHORDERORDf<-as.data.frame(table(trim))
      # Factory Levels
      
      # Aggregate Levels
      MACHORDERORDa<-merge(MACHORDERORD, AGGSIM, by="XRF_CODE")
      MACHORDERORDa$SEQ_CODE<-as.character(MACHORDERORDa$SEQ_CODE)
      trim <- as.data.frame(paste(trim(MACHORDERORDa[,12]),MACHORDERORDa[,9],MACHORDERORDa[,11],sep = ""))
      MACHORDERORDa<-as.data.frame(table(trim))
      # Aggregate Levels
      vvorderpace<-rbind(MACHORDERORDh,MACHORDERORDf,MACHORDERORDa)
      vvorderpace$trim<-trim(vvorderpace$trim)
      ########################################  Orders  Pace Stop
      
      ########################################  Days from Order to Invoice
      MACHORDERORDL$DIFF<-(MACHORDERORDL$ORDER_INVOICE_DATE  - MACHORDERORDL$ORDER_ENTRY_DATE)
      
      colnames(MACHORDERORDL)[5]<-"DATE"
      MACHORDERORDL1<-merge(MACHORDERORDL, RECCALENDAR, by="DATE")
      colnames(MACHORDERORDL1)[8]<-"XRF_CODE"
      
      # Levels we forecast for
      MACHORDERORDL2<-merge(MACHORDERORDL1, HSIM, by="XRF_CODE")
      MACHORDERORDL2$SEQ_CODE<-as.character(MACHORDERORDL2$SEQ_CODE)
      MACHORDERORDL2[14] <- as.data.frame(paste(trim(MACHORDERORDL2[,13]),MACHORDERORDL2[,10],MACHORDERORDL2[,11],sep = ""))
      colnames(MACHORDERORDL2)[14]<-"TRIM"
      MACHORDERORDL2 <- aggregate(MACHORDERORDL2$DIFF, by=list(MACHORDERORDL2$TRIM), FUN=mean, na.rm=TRUE)
      
      
      # Levels we forecast for
      
      # Factory Levels
      MACHORDERORDL3<-merge(MACHORDERORDL1, FACSIM, by="XRF_CODE")
      MACHORDERORDL3$SEQ_CODE<-as.character(MACHORDERORDL3$SEQ_CODE)
      MACHORDERORDL3[14] <- as.data.frame(paste(trim(MACHORDERORDL3[,13]),MACHORDERORDL3[,10],MACHORDERORDL3[,11],sep = ""))
      colnames(MACHORDERORDL3)[14]<-"TRIM"
      MACHORDERORDL3 <- aggregate(MACHORDERORDL3$DIFF, by=list(MACHORDERORDL3$TRIM), FUN=mean, na.rm=TRUE)
      # Factory Levels
      
      # Aggregate Levels
      MACHORDERORDL4<-merge(MACHORDERORDL1, AGGSIM, by="XRF_CODE")
      MACHORDERORDL4$SEQ_CODE<-as.character(MACHORDERORDL4$SEQ_CODE)
      MACHORDERORDL4[14] <- as.data.frame(paste(trim(MACHORDERORDL4[,13]),MACHORDERORDL4[,10],MACHORDERORDL4[,11],sep = ""))
      colnames(MACHORDERORDL4)[14]<-"TRIM"
      MACHORDERORDL4 <- aggregate(MACHORDERORDL4$DIFF, by=list(MACHORDERORDL4$TRIM), FUN=mean, na.rm=TRUE)
      # Aggregate Levels
      
      MACHORDERORDL1<-rbind(MACHORDERORDL2,MACHORDERORDL3,MACHORDERORDL4)

      ######################################## Order Bank 1/2  Mach Orders
      channel <- odbcConnect("db211")
      MACHORDERShipped<-sqlQuery(channel, "SELECT CG_MACH_ORDERS.ORDERING_UNIT_CODE, CG_MACH_ORDERS.SALES_ORDER_NUMBER, CG_MACH_ORDERS.INVENTORY_SOURCE, CG_MACH_ORDERS.SHIP_UNIT_CONTROL, CG_MACH_ORDERS.BASE_MACHINE_CODE
                                 FROM DRDBP01.CG_MACH_ORDERS CG_MACH_ORDERS")
      # WHERE (CG_MACH_ORDERS.DATE_SHIPPED Is Not Null)")
      MACHORDERShipped <- unique(MACHORDERShipped)
      colnames(MACHORDERShipped)[1]<-"BRANCH_CODE"
      MACHORDERShipped<-merge(x = MACHORDERShipped, y = PLNMKT,by="BRANCH_CODE")
      MACHORDERShipped$BASE_MACHINE_CODE<-trim(MACHORDERShipped$BASE_MACHINE_CODE)
      MACHORDERShipped<-merge(x = MACHORDERShipped, y = ESTBASE, by="BASE_MACHINE_CODE")
      MACHORDERShipped<-unique(MACHORDERShipped)
      colnames(MACHORDERShipped)[7]<-"XRF_CODE"
      
      # Levels we forecast for
      MACHORDERShippedh<-merge(MACHORDERShipped, HSIM, by="XRF_CODE")
      MACHORDERShippedh$SEQ_CODE<-as.character(MACHORDERShippedh$SEQ_CODE)
      colnames(MACHORDERShippedh)[6]<-"DATE"
      MACHORDERShippedh<-merge(MACHORDERShippedh, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERShippedh[,8]),MACHORDERShippedh[,9],MACHORDERShippedh[,10],sep = ""))
      vvorderbankh<-as.data.frame(table(trim))
      # Levels we forecast for
      
      # Factory Levels
      MACHORDERShippedf<-merge(MACHORDERShipped, FACSIM, by="XRF_CODE")
      MACHORDERShippedf$SEQ_CODE<-as.character(MACHORDERShippedf$SEQ_CODE)
      colnames(MACHORDERShippedf)[6]<-"DATE"
      MACHORDERShippedf<-merge(MACHORDERShippedf, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERShippedf[,8]),MACHORDERShippedf[,9],MACHORDERShippedf[,10],sep = ""))
      vvorderbankf<-as.data.frame(table(trim))
      # Factory Levels
      
      # Aggregate Levels
      MACHORDERShippeda<-merge(MACHORDERShipped, AGGSIM, by="XRF_CODE")
      MACHORDERShippeda$SEQ_CODE<-as.character(MACHORDERShippeda$SEQ_CODE)
      colnames(MACHORDERShippeda)[6]<-"DATE"
      MACHORDERShippeda<-merge(MACHORDERShippeda, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERShippeda[,8]),MACHORDERShippeda[,9],MACHORDERShippeda[,10],sep = ""))
      vvorderbanka<-as.data.frame(table(trim))
      # Aggregate Levels
      vvorderbank<-rbind(vvorderbankh,vvorderbankf,vvorderbanka)
      vvorderbank$trim<-as.character(trim(vvorderbank$trim))
      
      ######################################## Order Bank 1/2  Mach Orders
      ######################################## Order Bank UnSourced
      channel <- odbcConnect("db211")
      MACHORDERSUnSourced<-sqlQuery(channel, "SELECT CG_UNSOURCED_ORDS.BASE_MACHINE_CODE, CG_UNSOURCED_ORDS.MODEL_NUMBER, CG_UNSOURCED_ORDS.CUSTOMER_ORD_DATE, CG_UNSOURCED_ORDS.DETAIL_MACH_CODE, CG_UNSOURCED_ORDS.EARLY_SHIP_IND, CG_UNSOURCED_ORDS.INVENTORY_SOURCE, CG_UNSOURCED_ORDS.INVENTORY_SRC_LOC, CG_UNSOURCED_ORDS.ORDER_CALENDAR, CG_UNSOURCED_ORDS.ORDER_ENTRY_DATE, CG_UNSOURCED_ORDS.ORDER_KIND, CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE, CG_UNSOURCED_ORDS.RETAIL_SOLD_ORDER, CG_UNSOURCED_ORDS.SALES_ORDER_NUMBER
      FROM DRDBP01.CG_UNSOURCED_ORDS CG_UNSOURCED_ORDS
      WHERE (CG_UNSOURCED_ORDS.ORDER_ENTRY_DATE>{d '2012-11-01'}) AND (CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE='20' Or CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE='2L' Or CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE='30' Or CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE='24' Or CG_UNSOURCED_ORDS.ORDERING_UNIT_CODE='4M') AND (CG_UNSOURCED_ORDS.BASE_MACHINE_CODE Is Not Null)")
      
      # WHERE (CG_MACH_ORDERS.DATE_SHIPPED Is Not Null)")
      MACHORDERSUnSourced <- unique(MACHORDERSUnSourced)
      colnames(MACHORDERSUnSourced)[11]<-"BRANCH_CODE"
      MACHORDERSUnSourced<-merge(x = MACHORDERSUnSourced, y = PLNMKT,by="BRANCH_CODE")
      MACHORDERSUnSourced$BASE_MACHINE_CODE<-trim(MACHORDERSUnSourced$BASE_MACHINE_CODE)
      MACHORDERSUnSourced<-merge(x = MACHORDERSUnSourced, y = ESTBASE, by="BASE_MACHINE_CODE")
      MACHORDERSUnSourced<-unique(MACHORDERSUnSourced)
      colnames(MACHORDERSUnSourced)[15]<-"XRF_CODE"
      
      # Levels we forecast for
      MACHORDERSUnSourcedh<-merge(MACHORDERSUnSourced, HSIM, by="XRF_CODE")
      MACHORDERSUnSourcedh$SEQ_CODE<-as.character(MACHORDERSUnSourcedh$SEQ_CODE)
      colnames(MACHORDERSUnSourcedh)[11]<-"DATE"
      MACHORDERSUnSourcedh<-merge(MACHORDERSUnSourcedh, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERSUnSourcedh[,16]),MACHORDERSUnSourcedh[,17],MACHORDERSUnSourcedh[,19],sep = ""))
      MACHORDERSUnSourcedh<-as.data.frame(table(trim))
      # Levels we forecast for
      
      # Factory Levels
      MACHORDERSUnSourcedf<-merge(MACHORDERSUnSourced, FACSIM, by="XRF_CODE")
      MACHORDERSUnSourcedf$SEQ_CODE<-as.character(MACHORDERSUnSourcedf$SEQ_CODE)
      colnames(MACHORDERSUnSourcedf)[11]<-"DATE"
      MACHORDERSUnSourcedf<-merge(MACHORDERSUnSourcedf, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERSUnSourcedf[,16]),MACHORDERSUnSourcedf[,17],MACHORDERSUnSourcedf[,19],sep = ""))
      MACHORDERSUnSourcedf<-as.data.frame(table(trim))
      # Factory Levels
      
      # Aggregate Levels
      MACHORDERSUnSourceda<-merge(MACHORDERSUnSourced, AGGSIM, by="XRF_CODE")
      MACHORDERSUnSourceda$SEQ_CODE<-as.character(MACHORDERSUnSourceda$SEQ_CODE)
      colnames(MACHORDERSUnSourceda)[11]<-"DATE"
      MACHORDERSUnSourceda<-merge(MACHORDERSUnSourceda, RECCALENDAR, by="DATE")
      trim <- as.data.frame(paste(trim(MACHORDERSUnSourceda[,16]),MACHORDERSUnSourceda[,17],MACHORDERSUnSourceda[,19],sep = ""))
      MACHORDERSUnSourceda<-as.data.frame(table(trim))
      # Aggregate Levels
      MACHORDERSUnS<-rbind(MACHORDERSUnSourcedh,MACHORDERSUnSourcedf,MACHORDERSUnSourceda)
      #vvorderbank$trim<-as.character(trim(vvorderbank$trim))

      write.csv(vvorderbank,'c:/vvorderbank.csv',row.names=FALSE)
      write.csv(vvorderpace,'c:/vvorderpace.csv',row.names=FALSE)
      write.csv(MACHORDERORDL1,'c:/MACHORDERORDL1.csv',row.names=FALSE)
      write.csv(MACHORDERSUnS,'c:/UnSourced.csv',row.names=FALSE)
      #leshwrite.csv(MACHORDERORDL2,'c:/MACHORDERORDL2.csv',row.names=FALSE)
      ######################The End
      
      
      `}</pre>

  </div>
</div>
  );
}

export default RscriptDB2;