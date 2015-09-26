install.packages("Hmisc")
require("Hmisc")

air <- read.csv("~/Downloads/Air_Quality.csv")

air <- air[, 3:9]


> colnames(air)
[1] "name"              "Measure"           "geo_type_name"    
[4] "geo_entity_id"     "geo_entity_name"   "year_description" 
[7] "data_valuemessage"

describe(air)
str(air)

air_1 <- air[1:5, ]

ggplot(data = air_1,
       aes(x = geo_entity_name,
           y = data_valuemessage)) +
  geom_bar(stat = 'identity')