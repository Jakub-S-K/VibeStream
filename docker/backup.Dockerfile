FROM ubuntu:22.04

RUN apt-get update && apt-get install -y cron mariadb-server

WORKDIR /docker

COPY docker/ .

RUN chmod +x /docker/*.sh

COPY /docker/crontab /etc/cron.d/

RUN chmod 0644 /etc/cron.d/crontab && crontab /etc/cron.d/crontab

ENTRYPOINT ["/docker/backup_entrypoint.sh"]