# React Native Google Authentication Boilerplate

This boilerplate provides a straightforward setup for integrating Google authentication into your React Native application using Expo. It utilizes `expo-auth-session` for the auth session management and `@react-native-async-storage/async-storage` for persisting user data locally.

## Getting Started

### Prerequisites

- Node.js
- Expo CLI
- A Google Cloud Platform account and a configured OAuth2.0 Client ID

### Setup Instructions

1. **Clone the Boilerplate**

   Clone this repository to your local machine to get started.

   ```sh
   git clone <repository-url>
   ```

2. **Install Dependencies**

   ```sh
   cd <project-directory>
   npm install
   ```

3. **Configure Environment Variables**

Update the .env file values with your Google Cloud Platform credentials.

```sh
EXPO_PUBLIC_IOS_CLIENT_ID=<Your iOS Client ID>
EXPO_PUBLIC_WEB_CLIENT_ID=<Your Web Client ID>
```

4.  **Update `app.json`**

Add your application scheme to the app.json file under expo.

```sh
"expo": {
"scheme": "your-custom-scheme"
}
```

4. **Running the Appplication**
   **iOS Simulator:**
   Run the following command to start your application on an iOS simulator. Make sure you have Xcode installed and configured.

   ```sh
   npx expo run:ios
   ```

   **Web**
   To see the application in action on a web browser, you do not need any additional setup. Just run:

   ```sh
   npx expo start --web --https
   ```

## Usage

The boilerplate includes an authentication context (`AuthProvider`) that provides `userInfo` and `promptAsync` to the components. You can initiate the sign-in process using the "Sign in with Google" button. The user information will be displayed on the screen upon successful authentication.

## Components

- **`AuthProvider`**: Context provider for authentication. It encapsulates the authentication logic and state.
- **`useAuth`**: Custom hook to access the authentication context.

## Security

Ensure you follow best practices for storing and managing your credentials. Do not hardcode your Google Client IDs or any sensitive information within your application's codebase.

## Troubleshooting

- If you encounter issues with authentication or redirection, verify your `app.json` scheme and `.env` configuration.
- For iOS-specific issues, ensure you've set up your iOS Client ID correctly in the Google Cloud Console and `.env` file.
