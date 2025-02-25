# Task Navigator

Task Navigator is a React Native application designed to demonstrate key mobile development skills such as authentication, CRUD operations, offline caching, deep linking, testing, and UI/UX best practices. The app interacts with the GoRest API to manage tasks (to-dos) and implements multiple key features to create a functional, efficient mobile experience.

## Table of Contents

- [Overview](#overview)
- [Requirements](#requirements)
- [Setup](#setup)
- [Usage](#usage)
  - [Login Screen](#login-screen)
  - [Main Screen](#main-screen)
  - [To-do Details Screen](#to-do-details-screen)
  - [Deep Linking](#deep-linking)
- [Architectural Decisions](#architectural-decisions)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)

## Overview

The Task Navigator app interacts with the GoRest API to allow users to manage a list of to-dos with CRUD operations. It includes:

- **Authentication** using a Bearer token.
- **CRUD operations** for to-dos (Create, Read, Update, Delete).
- **Deep linking** for specific to-do details.
- **Offline functionality** using local caching.
- A **simple and clean user interface**.

## Requirements

- React Native (0.70+ recommended)
- Node.js (v14 or above)
- npm or Yarn (Package Manager)
- GoRest API Token (for authentication)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShubhamRamavat/coding-challenge-task-navigator.git
   cd coding-challenge-task-navigator
   ```

2. **Install dependencies:** Make sure you have `npm` or `yarn` installed. Then run the following command:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Setup environment variables:** Create a `.env` file in the root directory and add your GoRest API token like so:

   ```bash
   GOREST_API_TOKEN=your_api_token_here
   ```

4. **Run the app:**

   - For iOS:

   ```bash
   npx react-native run-ios
   ```

   - For Android:

   ```bash
   npx react-native run-android
   ```

## Usage

### Login Screen

Upon first launch, the app will prompt for a GoRest API token. Enter the token and proceed to the main application.

### Main Screen

The main screen displays the list of to-dos fetched from the API. You can:

- View a list of all to-dos.
- Create new to-dos by clicking on a "Create" button.

### To-do Details Screen

Tap on a to-do to view its details, such as title, status, and description. You can edit or delete the to-do from this screen.

### Deep Linking

The app supports deep linking. You can open the app with a URL like `tasknavigator://todo/:id`, and it will navigate to the corresponding to-do detail screen.

## Architectural Decisions

1. **State Management:**

   - **React Context:** Used for managing the global state of the app, such as authentication and user session.
   - **Redux:** Optionally, Redux can be used for more complex state management if you plan to scale the app.

2. **Networking:**

   - **Axios** is used to make API calls to the GoRest API. Axios provides a simple API for managing HTTP requests, including handling authorization headers and intercepting responses.
   - The app uses the Bearer token stored securely using **AsyncStorage** for authentication. Requests to the API include the token in the Authorization header.

3. **Navigation:**

   - **React Navigation** is used for managing screen transitions and deep linking. Deep linking is configured to allow navigation to specific to-dos through URLs like `tasknavigator://todo/:todoId`.

4. **Offline Storage:**

   - **AsyncStorage**: To ensure users can view to-dos even when offline, the app caches the to-dos using AsyncStorage. This allows for a seamless offline experience, displaying previously fetched to-dos.
   - The app also caches newly created or edited to-dos when offline and syncs these changes when the app regains internet connectivity.

5. **Error Handling:**

   - Errors during API calls are caught and displayed to the user with clear error messages.
   - The app ensures proper validation for required fields (like to-do title) and provides feedback for validation errors.

6. **UI/UX:**

   - The UI uses **React Native Paper** for consistent design elements like buttons and text inputs. The app's layout is responsive and adapts to different screen sizes.

7. **Testing:**
   - **Jest** is used for unit testing key components and utility functions.
   - **React Native Testing Library** is used for testing component interaction and rendering.

## Features

- **Authentication:**
  - Securely stores and uses the GoRest API token.
- **To-Do List:**

  - Fetches and displays to-dos from the GoRest API.
  - Allows users to create, edit, and delete to-dos.

- **Deep Linking:**

  - Supports deep linking for direct navigation to specific to-do details using URLs like `tasknavigator://todo/:todoId`.

- **Offline Caching:**

  - Stores to-dos locally so that the user can still access them without an internet connection.

- **CRUD Operations:**

  - Implemented the full set of CRUD operations for managing to-dos.

- **UI & UX:**
  - Provides a simple and clean interface, including form validation and user-friendly feedback.

## Testing

To run the tests for the app:

### Unit Tests:

```bash
npm test
# or
yarn test
```
