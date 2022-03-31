# ankuoo_web_app

----

## Prerequisites
- You need a mongodb server to connect with the app, you can insert your mongodb address in .env file, you should also initiate mongodb at the startup of machine.
- The plug need to be flashed with this firmware: https://drive.google.com/drive/folders/1HWl-QiYM2u8lW9TAv1M6Kr9DPkj1_wRG?usp=sharing
- You need npm installed on the server

----
## How to install

First of all, initialize the db, remember to change the url of your mongodb, you can use this command:

`npm run db`

You can run the server with this command, the server will run on port 3000, you can change it on file index.js:

`npm start`

Remember to change the ip in script.py, in my case i setted the plug with 192.168.1.85, but you can change it.

----

## In version 3.0
- Better code, not yandere
- Delete all bootsrap, i prefer work with css
- A better layout  with a navbar
- Maybe an admin panel to check in a more specific way the behaviour of plug
- I will include Mongodb Atlas
- Possibly i will use react, so i can recreate it with react native
