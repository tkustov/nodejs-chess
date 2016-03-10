## Build

Before anything: run `npm install` inside project directory

To build whole project: `npm run build`

Client: `npm run build -- client`

Server: `npm run build -- server`

## Starting project

The next command runs project: `npm start`

## Building production version

Set environment variable `NODE_ENV` to `production`

Windows: `set NODE_ENV=production`

Unix/Linux: `NODE_ENV=production <your_command_here>`

## Configure database

Copy the file "config/mongodb-example.json" and modify it as you need:

```
cp config/mongodb-example.json <your_destination>
mongod --config <your_destination>
```
