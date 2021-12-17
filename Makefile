SOURCE_FILES := $(shell find src/ -type f -print)
PROD_HOST := lettuce.thekks.net

.PHONY: clean server deploy-prod deploy-staging

out: $(SOURCE_FILES)
	funnel4
	mkdir -p out/archive/2021
	tar -C out/archive/2021 -xf archive/2021.tar.gz
	touch out # To make the timestamp workout

server: out
	cd out && python -m http.server

deploy-staging: out
	rsync -zvr --delete out/ $(PROD_HOST):/web-staging/shuhaowu.com

deploy-prod: out
	rsync -zvr --delete out/ $(PROD_HOST):/web/shuhaowu.com

clean:
	rm -r out
