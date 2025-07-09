# 🚌 BusGo - Bus Booking App (Expo)

[![Expo](https://img.shields.io/badge/Expo-53.0.15-000000.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.79.4-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.81.5-orange.svg)](https://tanstack.com/query)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-06B6D4.svg)](https://www.nativewind.dev/)

> Modern bus booking application built with Expo and React Native, featuring Google Sign-In, interactive seat selection, and seamless booking management.

## ✨ Features

- 🎨 **Modern UI/UX** - NativeWind with custom Okra typography
- 🚌 **Bus Booking** - Search routes, select seats, manage bookings
- 🔐 **Google Sign-In** - Secure OAuth authentication
- 📱 **Cross-Platform** - iOS and Android support
- 🪑 **Interactive Seats** - Real-time seat availability
- 🔗 **Deep Linking** - Direct bus access via URLs
- ⚡ **TanStack Query** - Efficient data fetching
- 💾 **MMKV Storage** - Fast local storage
- 🎯 **TypeScript** - Full type safety

## 📱 Screenshots

<img src="https://github.com/user-attachments/assets/268bb0f8-f710-4483-b22f-f5d7a5b3deeb" alt="Login Screen" width="200" />

<img src="https://github.com/user-attachments/assets/c8498dd7-b78b-40cf-b9df-28de01548916" alt="Home Screen" width="200" />

<img src="https://github.com/user-attachments/assets/d5144af2-3140-4812-ae4d-7c9cc8a7cbd7" alt="Date Picker" width="200" />

<img src="https://github.com/user-attachments/assets/d1286b6f-4977-4cfa-a757-6a5fe37d3887" alt="BusListScreen" width="200" />

<img src="https://github.com/user-attachments/assets/5fc3aba5-f405-4c4b-8455-a2194d7b7f87" alt="Sort" width="200" />

<img src="https://github.com/user-attachments/assets/74c0f19c-a770-41f7-8cbb-117e122a1cf6" alt="SeatSelectionScreen" width="200"/>

<img src="https://github.com/user-attachments/assets/bdf9a743-5e65-4cb4-b6d4-856d944a01d4" alt="Ticket Modal" width="200" />

## 🎥 Demo Video

<div align="center">

https://github.com/user-attachments/assets/ec339991-5aad-485f-ab64-a380b81f5adc

*Watch the full app demo showcasing key features*

</div>

## 📱 Download & Try

[**Download APK**](https://github.com/chayan-1906/Busgo-React-Native/releases/latest)

## 🏗️ Tech Stack

### 📱 Frontend

- **Expo** 53.0.15 - Development platform
- **React Native** 0.79.4 - Mobile framework
- **TypeScript** 5.8.3 - Type safety
- **React Navigation** 7.x - Navigation

### 🔄 State Management

- **TanStack Query** 5.81.5 - Server state
- **Axios** 1.10.0 - HTTP client

### 🎨 UI & Styling

- **NativeWind** 4.1.23 - Tailwind CSS
- **Expo Vector Icons** 14.1.0 - Icons
- **React Native Linear Gradient** 2.8.3 - Gradients
- **React Native Heroicons** 4.0.0 - Hero icons

### 🔧 Device Features

- **Google Sign-In** 15.0.0 - Authentication
- **MMKV** 3.3.0 - Storage
- **DateTimePicker** 8.4.2 - Date selection
- **Reanimated** 3.18.0 - Animations
- **Expo Action Sheet** 4.1.1 - Action sheets

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Expo account

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/chayan-1906/Busgo-React-Native.git
   cd Busgo-React-Native
   git checkout expo-prebuild
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment**
   ```env
   EXPO_PUBLIC_WEB_GOOGLE_CLIENT_ID=your_web_client_id
   EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID=your_android_client_id
   EXPO_PUBLIC_IOS_GOOGLE_CLIENT_ID=your_ios_client_id
   ```

5. **Start development**
   ```bash
   # Start Expo dev server
   npm start
   
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## 📦 Build for Production

### Android APK

```bash
npm run generate-apk
```

### iOS Build

```bash
npm run ios
```

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
├── navigation/         # Navigation configuration
├── screens/           # Application screens
├── service/           # API client and requests
├── types/             # TypeScript definitions
└── utils/             # Utility functions
```

## 🗄️ Backend API

Uses hosted Node.js backend.

### API URL

```
https://busgo-node-js.onrender.com/api/v1
```

### Repository

[🔗 BusGo Node.js Backend](https://github.com/chayan-1906/BusGo-Node.js)

## 🔗 Deep Linking

### URL Scheme

```
busgo://bus/{busExternalId}
```

### Configuration

- **Scheme:** `busgo`
- **Bundle ID:** `com.pdas9647.busgo`
- **Package:** `com.pdas9647.busgo`

## 🎯 Key Features

### New Architecture

- **Enabled:** React Native New Architecture
- **Fabric:** UI rendering
- **TurboModules:** Native modules

### Expo Features

- **Expo Font:** Custom font loading
- **Expo Constants:** Environment variables
- **Expo Splash Screen:** Loading screen

### Cross-Platform

- **iOS:** Native iOS app
- **Android:** Native Android app

## 📋 Requirements

### Development

- **Node.js:** ≥18.0.0
- **Expo CLI:** Latest
- **Xcode:** 15+ (iOS)
- **Android Studio:** Latest

### Runtime

- **iOS:** 13.0+
- **Android:** API 21+

## 🔧 Scripts

```bash
# Development
npm start                 # Start Expo dev server
npm run android          # Run on Android
npm run ios              # Run on iOS

# Build
npm run generate-apk     # Build Android APK
npm run pod-install      # Install iOS pods
```

## 👨‍💻 Author

**Padmanabha Das**

- GitHub: [@chayan-1906](https://github.com/chayan-1906)
- LinkedIn: [Padmanabha Das](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
- Email: padmanabhadas9647@gmail.com

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!

## 📱 Related Projects

- **Backend API:** [BusGo Node.js](https://github.com/chayan-1906/BusGo-Node.js)
- **Bare React Native:** [BusGo Bare](https://github.com/chayan-1906/Busgo-React-Native/tree/attractive-ui)

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p><strong>Expo Version</strong> - Enhanced with cross-platform support</p>
</div>
