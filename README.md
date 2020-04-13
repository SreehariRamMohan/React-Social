#### Purpose
Teaching myself core React & NodeJS web principles by creating a simple Facebook-esque Message Board.

#### Instructions for running:

1) In the root directory, create a .env file to store your public stripe API key under the variable name REACT_APP_PUBLISHABLE_KEY. Note: the REACT_APP prefix in the aforementioned variable name is required for this value to be bundled in your build files and thus accessible in your JSX. Now, create a .env file in the backend/ folder. Store your mongodb cloud atlas credentials here in the variable ATLAS_URI and your stripe private API key here with the variable name STRIPE_SECRET_KEY. Alternatively (for testing purposes) if you don't mind exposing your API keys in the codebase, you can replaces all references of process.env.* with the corresponding API key (not recommended for security reasons).

2) npm install in root directory and backend/ directory to install dependencies. 

3) Run: npm start from root directory. 

4) run: nodemon server from backend/ 

5) navigate to localhost: 5000 in browser. Server endpoints are being served from localhost: 1080. 

#### Features 
* Post messages to a global message board. Write comments on other users posts.
* Each user can customize their profile by choosing a profile picture. Displaying profile pictures next to posts & comments happens in async.
* bcrypt hashing & salting algorithm for secure storage of passwords in MongoDB server.
* Redux central state management for easy future updates + Redux state synced with MongoDB using Redux-Thunk async action updates.


#### Libraries 
* Redux, React-Redux, Redux-Thunk => for local & async state management
* Immer => for immutable state updates to redux store
* Axios, Express => for server side API calls
* React-Router => for navigation
* Mongoose, MongoDB => for database integration
* bcrypt js => to securely hash & salt passwords
* Helmet js => secure HTTP headers
* Stripe => to handle payments

#### License
* Special thanks to Icons 8 for the profile picture icons. You can find the icons I used [here](https://icons8.com/icon/pack/profile/)

