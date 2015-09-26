#infant mortality by region 
#download "multipurpose table in CSV format" from who

library("ggplot2")

inf_region <- read.csv("~/Downloads/xmart (3).csv", header = TRUE)
inf_region

names(inf_region)[3] <- "Mortality.Rate"
names(inf_region)[4] <- "Number.of.Deaths"
inf_region$Mortality.Rate <- as.numeric(substr(inf_region$Mortality.Rate, 1, 5))
inf_region$Number.of.Deaths <- as.numeric(substr(inf_region$Number.of.Deaths, 1, 4))

head(inf_region)
inf2 <- aggregate(data = inf_region, Mortality.Rate~WHO.region,"mean")
inf2

ggplot(data = inf_region,
       aes(x = Year,
           y = Mortality.Rate,
           fill = WHO.region)) +
  geom_bar(stat = 'identity') +
  ylab(NULL) + xlab(NULL)

