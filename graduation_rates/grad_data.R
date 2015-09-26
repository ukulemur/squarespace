require("gdata")
require('plyr')
grad_data <- read.xls('~/Downloads/tabn326.10.xls')
colnames(grad_data)[1] <- 'Group'

#all races 4 years grad
sample <- grad_data[3:10,1:5]
sample$Group <- substr(sample$Group,3,6)
#sample$Type <- rep(c('all','public','nonprofit','for-profit'), each = 9)
#sample <- with(sample, sample[!is.na(Total), ])

#create column with identifier
#time1 = total, time2 = white, time3 = black, time4 = hispanic
colnames(sample)[2:5] <- c('g_1','g_2','g_3','g_4')
sample_2<-reshape(sample, 
                      varying=c('g_1',"g_2","g_3","g_4"), 
                      direction="long", sep="_")
sample_2$id <- NULL 
sample_2$time <- ifelse(sample_2$time == 1, 'total',
                       ifelse(sample_2$time == 2, 'white',
                              ifelse(sample_2$time == 3, 'black',
                                     ifelse(sample_2$time == 4, 'hispanic', 'NA'))))

colnames(sample_2)[2] <- 'race'

ggplot(data = sample_2,
                aes(x = Group, y = g, color = race)
                ) +
geom_line() +
labs(y = 'PERCENTAGE', x = 'YEAR') +
ggtitle('PERCENTAGE GRADUATING WITHIN 4 YEARS')
  

