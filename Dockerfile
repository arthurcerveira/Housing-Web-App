FROM python:3

WORKDIR /usr/src/housing

# Install node
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs

# Install node packages
COPY package*.json ./
RUN npm install

# Install pip packages
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["npm", "start"]

EXPOSE 8000
