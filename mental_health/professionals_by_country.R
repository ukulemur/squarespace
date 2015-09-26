#mental health
#reshaping density of pysch professionals then merging with meta data for ggplot

mh <- read.csv("~/Downloads/xmart (10).csv", header = TRUE)
head(mh)
mh <- na.omit(mh)
meta <- read.csv("~/Downloads/countries_meta_data.csv")

colnames(mh)[2:5] <- c("p_1","p_2","p_3","p_4")
mh <-reshape(mh, 
               varying=c('p_1',"p_2","p_3","p_4"), 
               direction="long", sep="_")
mh$id <- NULL
mh$time <- ifelse(mh$time == 1, 'Psychiatrists',
                     ifelse(mh$time == 2, 'Nurses',
                            ifelse(mh$time == 3, 'Social.workers', 
                                   ifelse(mh$time == 4, 'Psychologists', 'NA'))))

colnames(mh)[1:3] <- c('Country','Profession','Incidence')

meta <- merge(mh, meta, by = 'Country')

ggplot(data = meta,
       aes(x = WORLD_BANK_INCOME_GROUP,
           y = Incidence,
           fill = Profession)) +
  geom_bar(stat = "identity", position = 'dodge') +
  xlab(NULL)

meta_2 <- subset(x = meta, select = c(Country, Profession, Incidence, WORLD_BANK_INCOME_GROUP))

write.csv(x = meta_2, "meta.csv")






