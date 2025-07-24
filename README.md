# Moovy - Video Identification App

A React Native mobile app that identifies videos using camera capture and screen recording. Built with Expo SDK and TypeScript.

## 🎬 Features

- **Video Identification**: Capture videos with camera or screen recording
- **Real-time Processing**: AI-powered video analysis and identification
- **Results Display**: Detailed movie/show information with posters and metadata
- **History Management**: Track all your previous identifications
- **Settings & Customization**: Configure app preferences and permissions
- **Modern UI**: Dark theme with neon blue accents and smooth animations
- **Widget Support**: iPhone Control Center widget for quick access

## 🏗️ Project Structure

```
moovy/
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with navigation
│   ├── index.tsx          # Home screen
│   ├── camera.tsx         # Camera capture screen
│   ├── processing.tsx     # Video processing screen
│   ├── results.tsx        # Results display screen
│   ├── history.tsx        # History management screen
│   ├── settings.tsx       # Settings and preferences
│   └── welcome.tsx        # Onboarding screen
├── components/            # Reusable UI components
│   ├── Button.tsx         # Customizable button component
│   ├── Card.tsx           # Card container component
│   ├── IconButton.tsx     # Icon-only button component
│   ├── VideoResultCard.tsx # Video result display component
│   ├── LoadingSpinner.tsx # Loading animation component
│   └── index.ts           # Component exports
├── constants/             # App constants and configuration
│   ├── Colors.ts          # Color palette and theme
│   └── Layout.ts          # Layout dimensions and spacing
├── hooks/                 # Custom React hooks
│   └── useVideoIdentification.ts # Video identification logic
├── types/                 # TypeScript type definitions
│   └── index.ts           # App-wide type definitions
└── assets/                # Static assets
    ├── images/            # App icons and images
    └── fonts/             # Custom fonts
```

## 🧩 Component Library

### Core Components

#### `Button`

A versatile button component with multiple variants and states.

```tsx
import { Button } from "../components";

<Button
  title="Press Me"
  onPress={handlePress}
  variant="primary" // 'primary' | 'secondary' | 'danger'
  size="medium" // 'small' | 'medium' | 'large'
  icon="play" // Optional icon
  loading={false} // Loading state
  disabled={false} // Disabled state
/>;
```

#### `Card`

A flexible card container with different styling options.

```tsx
import { Card } from "../components";

<Card
  variant="elevated" // 'default' | 'elevated' | 'outlined'
  padding="medium" // 'none' | 'small' | 'medium' | 'large'
  onPress={handlePress} // Optional press handler
>
  <Text>Card content</Text>
</Card>;
```

#### `IconButton`

A circular icon button with different variants.

```tsx
import { IconButton } from "../components";

<IconButton
  icon="camera"
  onPress={handlePress}
  size="medium" // 'small' | 'medium' | 'large'
  variant="primary" // 'default' | 'primary' | 'secondary' | 'danger'
  disabled={false}
/>;
```

#### `VideoResultCard`

A specialized component for displaying video identification results.

```tsx
import { VideoResultCard } from "../components";

<VideoResultCard
  video={videoResult}
  variant="detailed" // 'compact' | 'detailed'
  showActions={true} // Show action buttons
  onWatchTrailer={handleWatchTrailer}
  onReadMore={handleReadMore}
  onShare={handleShare}
/>;
```

#### `LoadingSpinner`

An animated loading component with multiple variants.

```tsx
import { LoadingSpinner } from "../components";

<LoadingSpinner
  variant="film-reel" // 'spinner' | 'dots' | 'film-reel'
  size="large" // 'small' | 'medium' | 'large'
  text="Loading..." // Optional text
  color={Colors.primary} // Custom color
/>;
```

## 🎨 Design System

### Colors

- **Primary**: `#00D4FF` (Neon Blue)
- **Background**: `#000000` (Pure Black)
- **Surface**: `#1A1A2E` (Dark Blue-Gray)
- **Text**: `#FFFFFF` (White)
- **Error**: `#FF4757` (Red)
- **Success**: `#00FF88` (Green)
- **Warning**: `#FFA502` (Orange)

### Typography

- **Headings**: Bold, 24-28px
- **Body**: Regular, 16px
- **Captions**: Regular, 14px
- **Buttons**: Semi-bold, 16-18px

### Spacing

- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **xxl**: 48px

### Border Radius

- **sm**: 8px
- **md**: 12px
- **lg**: 16px
- **xl**: 24px

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd moovy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on physical device

## 📱 User Flow

1. **Welcome Screen**: First-time user onboarding
2. **Home Screen**: Main interface with identification options
3. **Camera/Screen Recording**: Capture video for identification
4. **Processing**: AI analysis with progress indication
5. **Results**: Display identified video with details and actions
6. **History**: View past identifications
7. **Settings**: Configure app preferences

## 🔧 Development

### Adding New Components

1. Create component file in `components/` directory
2. Export from `components/index.ts`
3. Follow existing component patterns
4. Add TypeScript interfaces
5. Use design system constants

### Component Guidelines

- **Props Interface**: Define clear TypeScript interfaces
- **Default Values**: Provide sensible defaults
- **Variants**: Support multiple visual variants
- **Accessibility**: Include proper accessibility props
- **Performance**: Optimize for re-renders
- **Testing**: Add unit tests for complex logic

### Styling Guidelines

- Use `Colors` and `Layout` constants
- Follow consistent naming conventions
- Implement responsive design
- Support dark/light themes
- Use proper shadow and elevation

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 📦 Building

### Development Build

```bash
npx expo run:ios
npx expo run:android
```

### Production Build

```bash
eas build --platform ios
eas build --platform android
```

## 🚀 Deployment

### App Store / Google Play

1. Configure EAS Build
2. Submit for review
3. Release to stores

### Internal Testing

1. Build development version
2. Distribute via TestFlight/Internal Testing
3. Collect feedback and iterate

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Follow coding standards
4. Add tests for new features
5. Submit pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- React Native community for components and libraries
- Design inspiration from modern mobile apps
