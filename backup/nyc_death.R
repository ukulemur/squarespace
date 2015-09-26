require("Hmisc")
nyc_death <- read.csv("~/Downloads/New_York_City_Leading_Causes_of_Death.csv")
> colnames(nyc_death)
[1] "Year"           "Ethnicity"      "Sex"            "Cause.of.Death"
[5] "Count"          "Percent" 
table(d2$Ethnicity)
d2 <- unique(nyc_death)

write.table(x = d2, file = "nyc_death.csv", sep = ",", quote = FALSE, row.names = FALSE)


