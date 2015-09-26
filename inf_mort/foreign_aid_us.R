aid <- read.csv("~/Downloads/Health.csv", header = TRUE)

aid_count <- data.frame(paste0(table(aid$Award.Transaction...Sector)), aid[ ,aid$Award.Transaction.Fiscal.Year])

table$column <- paste0("added_whatever", table[row, column])
                        
ggplot(data = aid_count,
       aes(x = Var1, y = Freq),
       fill = ) +
       theme(axis.text.x = element_text(angle = 45)) +
       geom_bar(stat = 'identity', position = 'dodge')

