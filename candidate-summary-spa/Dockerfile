FROM node:iron

# install JRE
RUN apt-get update
RUN apt-get install -y default-jre

# install unzip
RUN apt-get install -y unzip

## download & unzip sonar scanner
WORKDIR /usr/sonar
RUN curl https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-5.0.1.3006-linux.zip -o ./sonar-scanner.zip
RUN unzip ./sonar-scanner.zip

# add sonar to PATH

ENV SONAR_HOME=/usr/sonar/sonar-scanner-5.0.1.3006-linux
ENV PATH="${SONAR_HOME}/bin:${PATH}"

# set work dir for react-scripts
WORKDIR /usr/src/app

# cache node_modules
COPY .npmrc .yarnrc ./
COPY package.json package-*.json ./
COPY package.json yarn*.lock ./
COPY babel.config.json jsconfig.json ./
RUN yarn install
