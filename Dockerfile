FROM node:14.15.5-alpine3.12

RUN apk add --no-cache bash sudo git

RUN touch /root/.bashrc | echo "PS1='w$ '" >> /root/.bashrc

RUN npm config set cache /home/node/app/.npm-cache --global

RUN npm install -g nodemon
RUN npm install -g @loopback/cli@2.3.0

RUN adduser node wheel \
    && sed -e 's;^# \(%wheel.*NOPASSWD.*\);\1;g' -i /etc/sudoers

RUN mkdir -p /home/node/app

USER node

WORKDIR /home/node/app

#
