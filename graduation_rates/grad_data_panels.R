#ggplot with three panels, sep by race, colored by male/female, over time

require("grid")
require('gridExtra')
require("gdata")
require('ggplot2')

grad_data <- read.xls('~/Downloads/tabn326.10.xls')
colnames(grad_data)[1] <- 'Group'

head(grad_data)

#grad within 6 years, males, all institutions
data1 <- grad_data[278:287,1:5] #males
data2 <- grad_data[333:342,1:5] #females

#add sex
data1$sex <- 'M'
data2$sex <- 'F'

#bind, take out NA's, clean group
data3 <- rbind(data1,data2)
data3 <- with(data3, data3[!is.na(Total), ])
data3$Group <- substr(data3$Group,3,6)
data3 <- subset(data3, select = -Total)

#reshape
colnames(data3)[2:4] <- c('r_1','r_2','r_3')
data4<-reshape(data3, 
                  varying=c('r_1',"r_2","r_3"), 
                  direction="long", sep="_")
data4$id <- NULL 
#reassigning race
data4$time <- ifelse(data4$time == 1, 'WHITE',
                ifelse(data4$time == 2, 'BLACK',
                  ifelse(data4$time == 3, 'HISPANIC', 'NA')))
colnames(data4)[1:4] <- c('Year','Sex','Race','Percent')

plot <- (ggplot(data4, aes(Year, Percent, colour = Sex)) + 
geom_point() +
facet_grid(. ~ Race) +
theme(axis.text.x = element_text(angle = 45)) +
ggtitle('PERCENTAGE OF STUDENTS GRADUATING COLLEGE WITHIN SIX YEARS'))


