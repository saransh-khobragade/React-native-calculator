# React Native Calculator

Minimal Expo React Native calculator app styled after the iPhone calculator.

## Project Summary

- Purpose: small demo app for learning, testing, and iterating on React Native UI.
- Framework: Expo.
- Platform targets: Android, iOS, and Web.
- Current app: calculator with basic arithmetic operations and iPhone-inspired styling.

## Features

- Number input
- Decimal input
- Addition, subtraction, multiplication, and division
- Percent conversion
- Positive and negative toggle
- Clear action
- Operator highlight for the active operation
- Mobile-friendly calculator layout

## Tech Stack

- Expo `~54.0.33`
- React `19.1.0`
- React Native `0.81.5`
- React DOM `19.1.0`
- React Native Web `^0.21.0`

## Scripts

Run these from the project root:

```bash
npm start
npm run android
npm run ios
npm run web
```

## Build APK For Android Testing

This project is already configured to generate an Android APK through `EAS Build`.

### One-time setup

```bash
npm install -g eas-cli
eas login
```

### Create a test APK

```bash
cd /Users/saransh/Desktop/Github/React-native-calculator
eas build:configure
eas build -p android --profile preview
```

### What happens next

- Expo uploads the project and builds the APK in the cloud.
- When the build completes, Expo provides a download URL.
- Open that URL on your Android phone and install the APK.

### Current APK profile

The file `eas.json` is set up with a `preview` profile that builds an APK:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

## Setup

```bash
cd /Users/saransh/Desktop/Github/React-native-calculator
npm install
npm start
```

## Project Structure

```text
React-native-calculator/
├── App.js
├── app.json
├── eas.json
├── index.js
├── assets/
├── package.json
└── README.md
```

## Main Files

- `App.js`: calculator UI and interaction logic.
- `index.js`: Expo entry point.
- `app.json`: Expo app configuration.
- `eas.json`: EAS Build configuration for APK generation.
- `assets/`: static app assets.

## Current Behavior

- The app opens to a calculator screen.
- The display is right-aligned like the iPhone calculator.
- Tapping an operator stores the current value and highlights the selected operator.
- Pressing `=` computes the result.
- Dividing by zero shows `Error`.

## Notes For LLMs

- This is a single-screen Expo app.
- Most application logic lives in `App.js`.
- There is no backend, database, authentication, or API integration.
- Styling is implemented with `StyleSheet.create`.
- State is managed with React `useState`.
- If modifying behavior, start by reading `App.js`.

## Known Caveats

- Android emulator overlays or accessibility guides may appear depending on emulator settings. Those are not part of the app UI.
- Some npm packages may show engine warnings on Node `21.x`, but the app has been verified to build successfully.

## Verification

The app has already been checked with:

```bash
npx expo export --platform web
```

This confirmed the project compiles successfully after the calculator changes.
