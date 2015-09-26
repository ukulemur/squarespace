require('ggplot2')
require('gdata')
require('gridExtra')
require('gtable')
grad_data <- read.xls('~/Downloads/tabn326.10.xls')
colnames(grad_data)[1] <- 'Year'

#year_4
data1 <- grad_data[3:10, 1:6] #grad within 4 years white, black, hispanic, asian
data1$Year <- substr(data1$Year,3,6)
data1 <- subset(data1, select = -Total)

colnames(data1)[2:5] <- c('r_1','r_2','r_3','r_4')
data2<-reshape(data1, 
               varying=c('r_1',"r_2","r_3",'r_4'), 
               direction="long", sep="_")
data2$id <- NULL 

data2$time <- ifelse(data2$time == 1, 'WHITE',
                     ifelse(data2$time == 2, 'BLACK',
                            ifelse(data2$time == 3, 'HISPANIC', 
                                   ifelse(data2$time == 4, 'ASIAN', 'NA'))))
colnames(data2)[1:3] <- c('Year','Race','Percent') 

year_4 <- ggplot(data2,
                aes(x = Year,
                    y = Percent,
                    color = Race)) +
  geom_line(stat = 'identity', aes(group = Race)) +
  ggtitle('4 YEARS') +  
  ylim(c(0,80)) + xlab('') +
  scale_color_manual(values=c("dodgerblue4", "darkolivegreen4",
                              "darkorchid3", "goldenrod1")) +
  theme(axis.text.x = element_text(angle = 45)) +
  ylab(NULL)

#year_5
data1 <- grad_data[114:121, 1:6] #grad within 4 years white, black, hispanic, asian
data1$Year <- substr(data1$Year,1,4)
data1 <- subset(data1, select = -Total)

colnames(data1)[2:5] <- c('r_1','r_2','r_3','r_4')
data2<-reshape(data1, 
               varying=c('r_1',"r_2","r_3",'r_4'), 
               direction="long", sep="_")
data2$id <- NULL 

data2$time <- ifelse(data2$time == 1, 'WHITE',
                     ifelse(data2$time == 2, 'BLACK',
                            ifelse(data2$time == 3, 'HISPANIC', 
                                   ifelse(data2$time == 4, 'ASIAN', 'NA'))))
colnames(data2)[1:3] <- c('Year','Race','Percent')

year_5 <- ggplot(data2,
                 aes(x = Year,
                     y = Percent,
                     color = Race)) +
  geom_line(stat = 'identity', aes(group = Race)) +
  ggtitle('5 YEARS') +  
  ylim(c(0,80)) +
  scale_color_manual(values=c("dodgerblue4", "darkolivegreen4",
                              "darkorchid3", "goldenrod1")) +
  ylab('') + xlab('') +
  theme(axis.text.x = element_text(angle = 45))

#year_6
data1 <- grad_data[225:232, 1:6] #grad within 4 years white, black, hispanic, asian
data1$Year <- substr(data1$Year,1,4)
data1 <- subset(data1, select = -Total)

colnames(data1)[2:5] <- c('r_1','r_2','r_3','r_4')
data2<-reshape(data1, 
               varying=c('r_1',"r_2","r_3",'r_4'), 
               direction="long", sep="_")
data2$id <- NULL 

data2$time <- ifelse(data2$time == 1, 'WHITE',
                     ifelse(data2$time == 2, 'BLACK',
                            ifelse(data2$time == 3, 'HISPANIC', 
                                   ifelse(data2$time == 4, 'ASIAN', 'NA'))))
colnames(data2)[1:3] <- c('Year','Race','Percent')
#year 6
year_6 <- ggplot(data2,
                 aes(x = Year,
                     y = Percent,
                     color = Race)) +
  geom_line(stat = 'identity', aes(group = Race)) +
  ggtitle('6 YEARS') +  
  ylim(c(0,80)) +
  scale_color_manual(values=c("dodgerblue4", "darkolivegreen4",
                              "darkorchid3", "goldenrod1")) +
  ylab('') + xlab('') +
  theme(axis.text.x = element_text(angle = 45))

#combining plots with one legend
grid_arrange_shared_legend <- function(...) {
  plots <- list(...)
  g <- ggplotGrob(plots[[1]] + theme(legend.position="bottom",legend.direction='vertical'))$grobs
  legend <- g[[which(sapply(g, function(x) x$name) == "guide-box")]]
  lheight <- sum(legend$height)
  grid.arrange(
    do.call(arrangeGrob, lapply(plots, function(x)
      x + theme(legend.position="none"))), #has to be none
    legend,
    ncol = 1,
    heights = unit.c(unit(1, "npc") - lheight, lheight))
}

p1 <- y4
p2 <- y5
p3 <- y6
grid_arrange_shared_legend(y4, y5, y6)


