#nielson tv data
2-11: 24 hours, 16 minutes.
12-17: 20 hours, 41 minutes.
18-24: 22 hours, 27 minutes.
25-34: 27 hours, 36 minutes.
35-49: 33 hours, 40 minutes.
50-64: 43 hours, 56 minutes.
65-plus: 50 hours, 34 minutes.

require(ggplot2)

niel <- data.frame(age = factor(c('02-11','12-17','18-24','25-34','35-49','50-64','65-plus')), hours = c(24, 21, 22, 28, 33, 44, 50))
niel

ggplot(data = niel, 
        aes(factor(age), hours, fill = hours)) +
  geom_bar(stat = 'identity', width = .85) + 
  ylab("Hours") + xlab(NULL)


