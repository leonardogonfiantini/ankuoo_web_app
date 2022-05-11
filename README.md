# Wifi socket webapp

This webapp permit you to control your wifi smart socket in a easy way like the original constructor apps.

### Prerequisites:
- Your device have to be flashed with this firmware: <br/> https://drive.google.com/drive/folders/1HWl-QiYM2u8lW9TAv1M6Kr9DPkj1_wRG?usp=sharing <br> You can find the code in this repository: https://github.com/ljalves/hfeasy
- Create a mongodb atlas cluster, the database is necessary for the server script to send the request from client to device
- Create a .env file inside wifi-socket/src, where you will write the mongodb url and the port for the server

### Build/install/setup:
Clone this repository, after the installation is finished, move on /wifi socket, install dependecies and build the app:
```
npm install
npm run-script build
```
Setup the environment, i suggest you to use screen:
```
npm start
node server.js
python3 socket-server.py
```

### App look

![Look1](Look1.png)
![Look2](Look2.png)


