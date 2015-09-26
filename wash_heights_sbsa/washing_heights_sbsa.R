require("sas7bdat")
require("ggplot2")
my_data <- read.sas7bdat("~/Downloads/chs2013_public.sas7bdat", debug=FALSE)
new <- my_data

colnames(my_data)

wh <- my_data[my_data[ , "uhf"] == 301, ]



