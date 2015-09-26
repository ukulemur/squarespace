#congressional votes on defund pp

#435 members of congress, speaker doesn't vote (Boehner)
#85 women in congress, 22 voted aye, 62 nay

pp <- read.table(file = "~/Downloads/congress_votes_114-2015_h505(2).csv", header = TRUE, sep = ",")

#colnames[1] "state"    "district" "vote"     "party"    "sex"

#plot dividing yes and no by sex
pp$sex <- ifelse(pp$sex == 'f', "Female",
                 ifelse(pp$sex == 'm', "Male", NA))
ggplot(data = pp,
       aes(x = vote)) +
  geom_bar(aes(fill = factor(sex))) +
  ggtitle("Vote Distribution for Defunding Planned Parenthood")

#subset of females and females who voted no
f_no <- subset(pp, sex %in% 'f' & vote %in% "No")
f <- subset(pp, sex %in% 'f')

#percentage of each state that voted a certain way
#0 equals doesnt support pp, 1 means does support
map <- pp
map$state <- as.character(map$state)
map$vote <- ifelse(map$vote == 'Aye', 0,
                   ifelse(map$vote == 'No', 1, NA))
map <- map[complete.cases(map$vote), ]
map2 <- aggregate(vote ~ state, data = map, mean)
map2$vote <- round(x = map2$vote, digits = 2)

#scatterplot showing the business
require("ggplot2")
p <- ggplot(map2, aes(state, vote))
p + geom_point()

#merge with abbrev file to add state, reorder, export
abbrev <- read.csv("~/projects/pp_votes/state_abbrev.csv")
final <- merge(x = map2, y = abbrev, by = "state")
final <- final[,c(3,2)]


