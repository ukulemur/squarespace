#mental health

mh <- read.csv("~/Downloads/xmart (10).csv", header = TRUE)
head(mh)
mh <- na.omit(mh)
meta <- read.csv("~/Downloads/countries_meta_data.csv")

new <- merge(mh, meta, by = 'Country')
new <- subset(x = new, select = c(Psychiatrists, Nurses, Social.workers, Psychologists, WORLD_BANK_INCOME_GROUP))

a <- aggregate(data = new, Psychiatrists ~ WORLD_BANK_INCOME_GROUP, FUN = mean)
b <- aggregate(data = new, Nurses ~ WORLD_BANK_INCOME_GROUP, FUN = mean)
c <- aggregate(data = new, Social.workers ~ WORLD_BANK_INCOME_GROUP, FUN = mean)
d <- aggregate(data = new, Psychologists ~ WORLD_BANK_INCOME_GROUP, FUN = mean)

final <- cbind(a,b,c,d)
final <- final[ , unique(colnames(final))]
names(final)[1] <- "Wealth Category"
final <- format(final, digits = 1)
write.csv(x = final, "meta.csv")



