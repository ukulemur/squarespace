new <- my_data

new$sourcelastcig <- ifelse(new$sourcelastcig == 1, 'Carton',
                  ifelse(new$sourcelastcig == 2, 'Pack',
                  ifelse(new$sourcelastcig == 3, 'Loosie',
                  ifelse(new$sourcelastcig == 4, 'Bummed', 
                  ifelse(new$sourcelastcig == 5, 'Rolled', NA)))))
                                
new <- new[complete.cases(new$sourcelastcig), ]

d <- ggplot(aes(x = sourcelastcig),
  data = new)
d + geom_bar() 