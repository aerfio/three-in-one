RUNNING_IMAGES=$(shell docker ps -q)

.PHONY: build
build:
	docker build -t three-in-one .

.PHONY: run-background
run-background:
	docker container run --publish 8000:8000 --detach three-in-one

.PHONY: docker-kill-running
docker-kill-running:
	@docker kill $(RUNNING_IMAGES)