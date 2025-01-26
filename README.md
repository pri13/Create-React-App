# Random User CRUD App with Firebase Authentication

 ## Table of Contents
 
- [Introduction](#introduction) 
- [Features](#features)
- [Technologies Used](#technologies-used) 
- [Installation](#installation) 
- [Usage](#usage)
- [Authentication Workflow](#authentication-workflow)
- [CRUD Operations](#crud-operations)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots) 
- [Future Enhancements](#future-enhancements) 

 ##
 Introduction This React application demonstrates CRUD operations on fake users retrieved from the Random User API. The app is integrated with Firebase for authentication, allowing users to sign up, log in, and securely access the CRUD functionality.
 ## Features
1. **Authentication**: - Firebase-powered login and sign-up functionality. - Authentication validation for existing users.
2. **CRUD Functionality**: - Retrieve and display random users from the Random User API. - Toggle between **Card View** and **Table View** for displaying users. - Edit and update user details. - Delete users.
3. **User Profile View**: - A separate component to view detailed user profiles.

 ## Technologies Used 
 **Frontend**: React.js, React Router, CSS -
 **Backend**: Firebase Authentication and Database - 
 **API**: Random User API 
 ## Installation
 
1. Clone the repository: ```bash git clone https://github.com/your-username/your-repo-name.git ```
2. Navigate to the project directory: ```bash cd your-repo-name ``` 
3. Install dependencies: ```bash npm install ``` 
4. Configure Firebase: - Create a Firebase project [here](https://firebase.google.com/). - Add a web app and copy your Firebase configuration keys. - Replace the Firebase configuration object in the project (`firebase.js` file). 
5. Start the development server: ```bash npm start ```

### Authentication Workflow

 - Usage

- **Sign Up**: Users can register through the Sign-Up page. New user credentials are securely stored in Firebase.
- **Log In**: Existing users log in through the Login page and are directed to the CRUD page upon successful authentication.

  
### CRUD Operations 
1. **Read**: - Random users are fetched from the Random User API. 
 - Displayed as a list in both **Card View** and **Table View** (users can toggle between views).
2. **Update**: - Users can edit the details of a selected user through an **Edit User** form.
3. **Delete**: - Users can remove a selected user from the list. 
4. **View Profile**: - Detailed profile information is displayed in the **View Profile** component. ---


### DEMO

-Firebase Authentication 
![image](https://github.com/user-attachments/assets/32944b53-84ff-4da1-aa65-cededf0d2679)

-Registered Users. 
![image](https://github.com/user-attachments/assets/acef8a39-cef5-482f-ab58-4a871723da0d)


![image](https://github.com/user-attachments/assets/8ab9b3c6-7df7-4414-8db5-b0bcd3a5dbc1)

![image](https://github.com/user-attachments/assets/32aa204a-c7c5-4778-b242-bb7858911995)


![image](https://github.com/user-attachments/assets/11ac09f3-400f-46fc-a730-7371e99fd3af)


![image](https://github.com/user-attachments/assets/54af3e21-a5d8-4ce6-9ab4-4abbe888b69d)
