FROM debian:bullseye-slim

WORKDIR /usr/src

RUN apt-get -y update && \
  mkdir -p /usr/share/man/man1 && \
  mkdir -p /usr/share/man/man7 && \
  apt-get install -y sqitch libdbd-pg-perl postgresql-client && \
  rm -rf /var/lib/apt/lists/* /var/log/dpkg.log /var/cache/apt/archives/

COPY deploy/ ./deploy/
COPY revert/ ./revert/
COPY verify/ ./verify/
COPY sqitch.plan .
COPY sqitch.conf .
COPY run-deployment.sh run-deployment.sh

RUN chmod +x ./run-deployment.sh

CMD /usr/src/run-deployment.sh

