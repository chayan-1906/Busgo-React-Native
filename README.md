# 🚌 BusGo - Bus Booking App

[![React Native](https://img.shields.io/badge/React%20Native-0.80.1-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.81.5-orange.svg)](https://tanstack.com/query)
[![NativeWind](https://img.shields.io/badge/NativeWind-4.1.23-06B6D4.svg)](https://www.nativewind.dev/)

> A sleek, modern bus booking application built with React Native CLI, featuring Google Sign-In, interactive seat selection, and seamless booking management with production-ready architecture.

## ✨ Features

- 🎨 **Modern UI/UX** - Tailwind CSS with custom Okra typography
- 🚌 **Bus Booking** - Search routes, select seats, manage bookings
- 🔐 **Google Sign-In** - Secure OAuth authentication
- 📱 **Cross-Platform** - iOS and Android with native performance
- 🪑 **Interactive Seats** - Real-time seat availability and selection
- 🔗 **Deep Linking** - Direct bus access via shareable URLs
- ⚡ **TanStack Query** - Efficient data fetching and caching
- 💾 **MMKV Storage** - Lightning-fast local storage
- 🎯 **TypeScript** - Full type safety and enhanced developer experience
- 📍 **Location Services** - City-to-city route discovery

## 📱 Screenshots

<div>
  <img src="https://github.com/user-attachments/assets/c225eb0e-a098-4577-80e1-52a67656fdd0" width="200" alt="LoginScreen" />
  <img src="https://github.com/user-attachments/assets/87cac4f7-97f4-4e72-98dd-4cca78f917ea" width="200" alt="HomeScreen" />
  <img src="https://github.com/user-attachments/assets/d5144af2-3140-4812-ae4d-7c9cc8a7cbd7" width="200" alt="DatePicker" />
  <img src="https://github.com/user-attachments/assets/6f49a312-d927-495d-84f1-bf3a597d570b" width="200" alt="BusListScreen" />
  <img src="https://github.com/user-attachments/assets/5fc3aba5-f405-4c4b-8455-a2194d7b7f87" width="200" alt="Sort" />
  <img src="https://github.com/user-attachments/assets/6ddad3ef-9d18-49eb-ac8b-5fa2ee17839e" width="200" alt="SeatSelectionScreen" />
  <img src="https://github.com/user-attachments/assets/db0b1495-70d5-4b7a-aeea-49f8ea61ae67" width="200" alt="Ticket" />
</div>

## 📱 Download & Try

[![Download APK](https://img.shields.io/badge/Download-APK-brightgreen.svg?style=for-the-badge)](https://github.com/chayan-1906/Busgo-React-Native/releases/download/v1.0.0/busgo-bare.apk)

*Download and install the APK to experience the bus booking app on your Android device*

## 🏗️ Tech Stack

### 📱 Frontend

- ⚛️ **React Native** 0.80.1 - Mobile app framework (Bare CLI)
- 📘 **TypeScript** 5.8.3 - Type safety and better DX
- 🗺️ **React Navigation** 7.x - Navigation with deep linking
- 🎨 **NativeWind** 4.1.23 - Tailwind CSS for React Native

### 🔄 State Management & Data

- ⚡ **TanStack Query** 5.81.5 - Server state management
- 🌐 **Axios** 1.10.0 - HTTP client for API requests
- 🔑 **JWT Decode** 4.0.0 - Token management

### 🎨 UI & Styling

- 🎨 **NativeWind** 4.1.23 - Tailwind CSS styling
- 🌈 **React Native Linear Gradient** 2.8.3 - Gradient effects
- 🎯 **React Native Heroicons** 4.0.0 - Icon library
- 🖼️ **React Native SVG** 15.12.0 - SVG support

### 🔧 Authentication & Storage

- 🔐 **Google Sign-In** 15.0.0 - OAuth authentication
- 💾 **React Native MMKV** 3.3.0 - Fast key-value storage

### 📱 Device Features

- 📅 **DateTimePicker** 8.4.2 - Native date/time selection
- 🎭 **React Native Reanimated** 3.18.0 - Smooth animations
- 👆 **React Native Gesture Handler** 2.27.1 - Touch gestures
- 📤 **React Native Share** 12.1.0 - Native sharing
- 📸 **React Native View Shot** 4.0.3 - Screenshot capture

## 🚀 Getting Started

### Prerequisites

- Node.js (≥18.0.0)
- React Native CLI
- Android Studio (Android)
- Xcode (iOS - Mac only)
- JDK 17

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chayan-1906/Busgo-React-Native.git
   cd Busgo-React-Native
   ```

2. **Switch to bare branch**
   ```bash
   git checkout bare
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **iOS Setup** (Mac only)
   ```bash
   npm run podinstall
   ```

5. **Environment Setup**
   
   Create `.env` file (refer to .env.example)

6. **Start Metro bundler**
   ```bash
   npm start
   ```

7. **Run on device/simulator**
   ```bash
   # Android
   npm run android
   
   # iOS
   npm run ios
   ```

## 📦 Build for Production

### Android APK

```bash
npm run generate-apk
```

APK will be generated at: `android/app/build/outputs/apk/release/app-release.apk`

### iOS Build

Use Xcode for iOS production builds:
1. Open `ios/busgo.xcworkspace`
2. Select target device/simulator
3. Product → Archive

## 🏗️ Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── home/          # Home screen components
│   ├── ui/            # Generic UI components
│   └── ui/modals/     # Modal components
├── screens/           # Application screens
├── navigation/        # Navigation configuration
├── service/           # API client and requests
│   └── requests/      # API endpoint handlers
├── types/             # TypeScript type definitions
├── utils/             # Utility functions and constants
└── assets/            # Images, fonts, and static files
```

## 🗄️ Backend API

The app uses a hosted Node.js backend. Local setup is optional.

### Hosted API
- **Production:** `https://busgo-node-js.onrender.com/api/v1`
- **Status:** Live & Ready

### Local Setup (Optional)
```bash
# Clone the backend repository
git clone https://github.com/chayan-1906/BusGo-Node.js.git
cd BusGo-Node.js

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start server
npm run dev
```

### API Endpoints
- **Authentication:** `/user/login` (POST)
- **RefreshToken:** `/user/refresh-token` (POST)
- **Cities:** `/city` (GET)
- **Buses:** `/bus/search?from={from}&to={to}&date={date}&tags={tags}&sortBy={sortBy}` (GET)
- **BusDetails:** `/bus?busId={busExternalId}` (GET)
- **Tickets:** `/ticket` (GET)
- **BookTicket:** `/ticket` (POST)

### Repository
[🔗 BusGo Node.js Backend](https://github.com/chayan-1906/BusGo-Node.js)

## 🔗 Deep Linking

### URL Scheme
```
busgo://bus/{busExternalId}
```

### Examples
```bash
# Direct bus access
busgo://bus/BUS_12345

# Open from terminal (Android)
adb -s 368fef2d shell am start -a android.intent.action.VIEW -d "busgo://bus/BUS_12345"
xcrun simctl openurl booted "busgo://bus/BUS_12345"
```

## 🎯 Key Highlights

- **Production Ready**: Optimised bare React Native build for iOS and Android
- **Modern Architecture**: Clean code with TypeScript and TanStack Query
- **Offline First**: MMKV storage with optimistic updates
- **Secure**: JWT authentication with Google Sign-In
- **Performance**: 60fps animations with Reanimated 3
- **Developer Friendly**: ESLint, Prettier, and hot reload

## 📋 Requirements

### Android
- **Min SDK:** 21 (Android 5.0)
- **Target SDK:** 34 (Android 14)
- **Architecture:** arm64-v8a, armeabi-v7a

### iOS
- **Min Version:** iOS 12.0
- **Architecture:** arm64

### Development
- **Node.js:** ≥18.0.0
- **Java:** JDK 17
- **Android Studio:** Latest stable

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Padmanabha Das**

- GitHub: [@chayan-1906](https://github.com/chayan-1906)
- LinkedIn: [Padmanabha Das](https://www.linkedin.com/in/padmanabha-das-59bb2019b/)
- Email: padmanabhadas9647@gmail.com

## 🌟 Show Your Support

If this project helped you, please give it a ⭐️!

## 📱 Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/chayan-ranjan-das/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/chayan-1906)

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>⭐ Star this repo if you found it helpful!</p>
  <p><strong>Note:</strong> This is the bare React Native implementation. Expo prebuild version coming next.</p>
</div>
