#BIRTH RATES PER 1,000 FEMALES AGES 15-19, BY RACE/ETHNICITY, 1990-2013
teens <- read.csv("~/projects/d3/let_talk_about_sex/teen_birth_rate_year_race.csv")

#data from 
sex_rate <- data.frame(Year = c(1991, 1993, 1995, 1997, 1999, 2001, 2003, 2005, 2007, 2009, 2011, 2013), Rate = c(54, 53, 53, 48, 50, 46, 47, 47, 48, 46, 47, 47))

#data from http://www.cdc.gov/nchs/data/series/sr_23/sr23_031.pdf (page 22)
bc <- read.csv("~/projects/squarespace/bc_use_for_R.csv")

cbPalette <- c("#98df8a","#2ca02c","#d62728","#ff9896")

ggplot(data = bc,
       aes(x = year,
           y = percent,
           fill = METHOD)) +
  geom_bar(stat = 'identity', position = 'dodge') +
  scale_fill_manual(values=cbPalette) +
  facet_grid(. ~ sex) +
  xlab(NULL) + ylab(NULL)