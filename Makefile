MONGODB_DATA=/home/price-crawler/mongodb
MONGODB_DUMP=mongodump --db price_crawler --out $(MONGODB_DATA)/
MONGODB_RESTORE=mongorestore --db price_crawler $(MONGODB_DATA)/price_crawler
MONGODB_RUN=docker run --name mongo -v $(MONGODB_DATA):/data/db -d mongo:3.2.6 mongod --smallfiles
WEBSITE_RUN=docker run -d -p 3000:3000 --link mongo --name website website
ROBOT_RUN=docker run -d --link mongo --name robot robot

image-website:
	docker build -t website ./website

image-robot:
	docker build -t robot ./robot
	
run-price-crawler: image-website image-robot 
	$(MONGODB_RUN)
	$(ROBOT_RUN)
	$(WEBSITE_RUN)

run-website:
	$(WEBSITE_RUN)

run-mongo:
	$(MONGODB_RUN)

run-robot:
	$(ROBOT_RUN)

mongo-dump:
	docker exec -d mongo $(MONGODB_DUMP)

mongo-restore:
	docker exec -d mongo $(MONGODB_RESTORE)
	
stop:
	docker rm -f robot
	docker rm -f website
	docker rm -f mongo

restart: stop run-price-crawler
