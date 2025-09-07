# ☕ ALX Coffee Shop App

A modern, cross-platform mobile application for a coffee shop, built with React Native and Expo. The app allows users to browse coffee menu, place orders, save favorites, and receive notifications.

## 🎨 Design Assets

Original design assets are available in the `assets/images/figma-designs/` directory. These include:

- Complete UI/UX mockups
- Icons and illustrations
- Color palettes and typography guides
- Component libraries

> **Note**: These designs were created by [B from NAM Design](https://www.figma.com/@namtran) and are used with permission.

## 🚀 Features

- **User Authentication**: Secure sign-in and sign-up flows
- **Menu Browsing**: Browse through a variety of coffee items
- **Order Management**: Place and track orders
- **Favorites**: Save and manage favorite coffee items
- **Notifications**: Get updates on orders and promotions
- **Responsive Design**: Works on both iOS and Android
- **Dark/Light Mode**: Supports system theme preferences

## 🛠 Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router, React Navigation
- **State Management**: React Context API
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Icons**: Expo Vector Icons
- **Maps**: React Native Maps
- **Authentication**: Custom JWT-based auth with secure storage
- **Notifications**: Local notifications

## 📱 Screens

1. **Authentication**
   - Sign In
   - Sign Up

2. **Main Tabs**
   - **Home**: Featured coffees and categories
   - **Menu**: Full coffee menu with search and filters
   - **Favorites**: Saved coffee items
   - **Orders**: Order history and tracking
   - **Profile**: User profile and settings

3. **Order Flow**
   - Product Details
   - Cart
   - Checkout
   - Order Confirmation
   - Order Tracking

## 🏗 Project Structure

```
├── app/                    # App routes and screens
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main tab navigation
│   ├── screens/           # Individual screens
│   └── _layout.tsx        # Root layout
├── assets/                # Images, fonts, and other assets
│   ├── fonts/            # Custom fonts
│   ├── images/           # App images and icons
│   │   └── figma-designs/ # Original Figma design assets
├── components/            # Reusable UI components
│   └── ui/               # Base UI components
├── constants/             # App constants and configurations
├── contexts/              # React Context providers
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── utils/                 # Helper utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator / Android Emulator or physical device

### Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd alx-coffee-shop-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on your device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app (for physical devices)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```env
EXPO_PUBLIC_API_URL=your_api_url_here
# Add other environment variables as needed
```

### Fonts

Custom fonts are loaded automatically on app start. Place your font files in `assets/fonts/` and update the `loadFonts` function in `utils/fonts.ts` if needed.

## 📱 Building the App

### For Development

```bash
npx expo start
```

### For Production

#### Android
```bash
expo prebuild
npx expo run:android
```

#### iOS
```bash
expo prebuild
npx expo run:ios
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **UI/UX Design**: [Coffee Shop Mobile App Design](https://www.figma.com/design/RhP1APTkYyHY3DTClVv5gU/Coffee-Shop-Mobile-App-Design--Community-?node-id=0-1&p=f&t=oeHvzgTJcRXCgQdF-0) by [B from NAM Design](https://www.figma.com/@namtran) on Figma
  > *"Hi, my name is B, and I am a product designer at NAM Design. I have been working in this field for more than four years, and I hope that my resources can help you with your design process. Cheers!"*
- ALX Software Engineering Program

---

Built with ❤️ using React Native & Expo

## 📚 Development Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router Documentation](https://expo.github.io/router/docs/)

This project uses [file-based routing](https://expo.github.io/router/docs/) for navigation.
