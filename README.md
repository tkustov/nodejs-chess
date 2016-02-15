Before anything: run `npm install` inside project directory

## Build

To build client code execute: `npm run build`

## Starting project

* Run server `npm start`
* Run client `npm run client`

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
