FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

CMD [ "node", "dist/main" ]



