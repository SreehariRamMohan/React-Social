#### Instructions for running:

1) Create a .env file in the backend/ folder. Store your mongodb cloud atlas credentials here in the variable ATLAS_URI. 

2) npm install in root directory and backend/ directory to install dependencies. 

3) Run: npm start from root directory. 

4) run: nodemon server from backend/ 

5) navigate to localhost: 5000 in browser. Server endpoints are being served from localhost: 1080. 

#### Features 
* Post messages to a global message board. Write comments on other users posts. Each post is time/date stamped.
* bcrypt hashing & salting algorithm for secure storage of passwords in MongoDB server.
* Redux central state management for easy future updates + Redux state synced with MongoDB using Redux-Thunk async action updates.


#### Libraries 
* Redux, React-Redux, Redux-Thunk => for local & async state management
* Axios, Express => for server side API calls
* React-Router => for navigation
* Mongoose, MongoDB => for database integration
* bcrypt js => to securely hash & salt passwords

##### License
* Special thanks to Icons 8 for the profile picture icons. You can find the icons I used [here](https://icons8.com/icon/pack/profile/color)

