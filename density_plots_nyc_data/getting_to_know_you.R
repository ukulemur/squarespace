#nutrition dataset nyc

require("sas7bdat")
require("ggplot2")
my_data <- read.sas7bdat("~/Downloads/chs2013_public.sas7bdat", debug=FALSE)
new <- my_data
new$sex <- ifelse(new$sex == 1, 'Male',
                  ifelse(new$sex == 2, 'Female',NA))

#DONE - 1
#bmi density plot with x int to show levels, split by male female
#Body Mass Index (BMI) based on selfreported height and weight. 
new <- new[complete.cases(new$bmi), ] #remove NA's
new$bmi <- as.numeric(new$bmi)
new$bmi <- round(new$bmi, digits = 0)
new$sex <- ifelse(new$sex == 1, 'Male',
                  ifelse(new$sex == 2, 'Female',NA))
new$sex <- factor(new$sex, levels = c('Male','Female'))

d <- ggplot(aes(x = bmi),
       data = new)
d + geom_density((aes(fill = factor(sex), alpha = .5))) + 
  geom_vline(xintercept = c(18.5,25,30), colour = "red") + 
  xlab("BMI (red lines at levels: Underweight, Healthy, Overweight, Obese)") + 
  ylab(NULL) +
  scale_alpha(guide = 'none')

#DONE - 2
#bmi seperated by how people feel about their health
#Would you say in general that your health is: 
new4 <- new[complete.cases(new$bmi), ] #remove NA's
new4$bmi <- as.numeric(new4$bmi)
new4$bmi <- round(new4$bmi, digits = 0)
new5 <- new4[!is.nan(new4$generalhealth), ] 
new5$generalhealth <- ifelse(new5$generalhealth == 1, 'Excellent',
                             ifelse(new5$generalhealth == 2, 'Very Good',
                                    ifelse(new5$generalhealth == 3, 'Good',
                                           ifelse(new5$generalhealth == 4, 'Fair',
                                                  ifelse(new5$generalhealth == 5, 'Poor', NA)))))
new5$generalhealth <- factor(new5$generalhealth, levels = c('Excellent','Very Good','Good','Fair','Poor'))
names(new5)[names(new5)=="generalhealth"]  <- "Condition"

d <- ggplot(aes(x = bmi),
            data = new5)
d + geom_density(aes(fill = factor(Condition), alpha = .1)) + 
  geom_vline(xintercept = c(18.5,25,30), color = "red") +
  scale_alpha(guide = 'none') +
  xlab("BMI (red lines at levels: Underweight, Healthy, Overweight, Obese)") +
  ylab(NULL)

#DONE - 3
#alcohol drinks per week, divided by sex
# During the past 30 days, how many days per week or per month did you have at least 1 drink of any alcoholic beverage? 
new2 <- new[complete.cases(new$daysalc30), ]

d <- ggplot(aes(x = daysalc30),
            data = new2)
d + geom_density(aes(fill = factor(sex)), alpha = .5) +
  geom_vline(xintercept = mean(new2$daysalc30), linetype = "longdash") +
  xlab("Days Per Month (dotted line is average)") +
  ylab(NULL)
  
#DONE - 4
#fruits and vegetables per day, with bike or not
#wondering about what to do with outliers in a dataset? answers that appear to be untrue
#new7 - w/o outliers new6 - with everything
new6 <- new[complete.cases(new$bikefortransport), ] #remove NA's
new6$bikefortransport <- ifelse(new6$bikefortransport == 1, 'Yes',
                  ifelse(new6$bikefortransport == 2, 'No',NA))
new7 <- new6[new6[ ,"nutrition1"] < 11, ]
table(new$nutrition1)

d <- ggplot(aes(x = nutrition1),
            data = new7)
d + geom_density((aes(fill = factor(bikefortransport), alpha = .5))) +
  xlab("Number of Fruits and Vegetables Consumed Daily") +
  ylab(NULL) +
  scale_alpha(guide = 'none')



#DONE - 5
#number of ciagrettes smoked per day by sex
new <- my_data
new8 <- new[complete.cases(new$numberperdaya), ] #remove NA's
new8 <- new8[new8[ ,"numberperdaya"] < 100, ]
new8$sex <- ifelse(new8$sex == 1, 'Male',
                   ifelse(new8$sex == 2, 'Female',NA))
table(new$numberperdaya)

d <- ggplot(aes(x = numberperdaya),
            data = new8)
d + geom_density((aes(fill = factor(sex), alpha = .5))) +
  ylab(NULL) +
  xlab("Cigarettes smoked per day (red lines at pack intervals of 20)") +
  geom_vline(xintercept = c(20,40), colour = "red") +
  scale_alpha(guide = 'none')


