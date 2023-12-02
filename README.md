# AudioFlow Web Client

This is a project developed with Node.js, Vue 3, Vite, and TypeScript. It connects to Firebase to make requests to Firestore and a custom API.

## Prerequisites

- Node.js
- Firebase
- Git

## Project Setup

1. Clone the repository:
```
git clone https://github.com/Benjh4dev/CLIENT-AudioFlow
```

2. Navigate to the project folder:
```
cd CLIENT-AudioFlow
```

3. Install the project dependencies:
```
npm install
```

4. Set up Firebase:

- Go to the [Firebase console](https://console.firebase.google.com/)
- Click on "Add project" and follow the instructions to create a new Firebase project
- Once the project is created, click on "Project settings"
- In the "General" tab, scroll down to "Your apps" and click on the "</>" button to register a new web app
- Follow the instructions to register your app. You don't need to set up Firebase Hosting
- At the end, you'll be presented with your Firebase configuration, which looks like this:
  ```javascript
  var firebaseConfig = {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID",
    appId: "APP_ID"
  };
  ```
- Copy these values to your `.env` file

5. Set up the environment variables. Create a `.env` file in the root of the project and add the following variables:
```
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=

VITE_BACKEND_IP=
```

Note: `VITE_BACKEND_IP` should be the IP where your custom API (described below) is hosted.

6. Run the project:

For more details about the custom API, please visit [this repository](<https://github.com/Benjh4dev/API-AudioFlow>)..
