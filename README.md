Here is the updated README file with the requested separations:

---

# FomeAI Mobile Gym Application

This application is created by IFN771 Group 3 for the FOME AI Team. It is a mobile gym application that allows users to choose their exercises, record their sessions, and upload them to the server. The FOMEAI Computer Vision (CV) system then analyzes the videos and provides feedback on the exercises, identifying correct and incorrect movements.

## Team Members
(The names are sorted alphabetically)
- **Arsalan Ahmadi**
- **Parveen Kumar**
- **Saeid Salehpoorrodsari**
- **Sam Wanigasekera**
- **Vishnu Shaji**

## Features
- Choose and record exercises
- Upload exercise videos to the server
- Receive feedback on exercise performance through CV analysis

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your system
- Expo CLI installed globally

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/saeidsalehpoor/FomeAI_New.git
   cd FomeAI_New-main
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install necessary npm packages:**
   ```bash
   npm install @react-navigation/native-stack
   npm install axios
   npm install react-native-paper
   npm install @react-native-async-storage/async-storage
   npm install react-native-vector-icons
   ```

### Running the App
1. **Start the Expo development server:**
   ```bash
   expo start
   ```
2. **Run the application on your device:**
   - Use the Expo Go app on your mobile device to scan the QR code generated by the Expo development server.

3. **Run the application in an emulator:**
   - Ensure you have an Android or iOS emulator set up on your system.
   - Use the Expo CLI to launch the app on the emulator.

### Opening the Project in Visual Studio Code
1. **Open Visual Studio Code.**
2. **Open the project folder:**
   - Go to `File > Open Folder` and select the root directory of the cloned repository (`FomeAI_New-main`).
3. **Install VS Code Extensions:**
   - Ensure you have the necessary extensions for React Native development, such as the "React Native Tools" extension.

## Building the App

### Building for Android
1. **Make sure the Expo CLI server is running:**
   ```bash
   expo start
   ```
2. **Build the app for Android:**
   ```bash
   expo build:android
   ```

### Building for iOS
1. **Make sure the Expo CLI server is running:**
   ```bash
   expo start
   ```
2. **Build the app for iOS:**
   ```bash
   expo build:ios
   ```

### Additional Setup
- Ensure you have the server setup for FOMEAI Computer Vision to handle the video uploads and analysis.

## Contributing
Contributions are welcome! Please create a pull request or open an issue to discuss your changes.


