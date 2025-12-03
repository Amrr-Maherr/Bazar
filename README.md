# Bazar 📚 - Free Books Library

[![Expo SDK](https://img.shields.io/badge/Expo-~54.0.25-blue.svg)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-~5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A beautiful mobile app for discovering and reading thousands of classic public domain books from Project Gutenberg. Built with React Native and Expo.

![Bazar App Preview](assets/images/Banner.png)

## ✨ App Features

### 🔍 Book Discovery & Browsing
- **Smart Collections**: Browse curated lists like New Arrivals, Best Sellers, Top Rated, Recommended, Trending Now, Award Winners
- **Category Exploration**: Navigate through detailed book categories and subjects
- **Author Details**: Comprehensive author profiles with biography and complete book catalogs
- **Powerful Search**: Find books by title, author name, or specific keywords
- **Banner Features**: Highlighted popular books with stunning visuals

### 🎧 Advanced Audio Reading System
- **High-Quality TTS**: Crystal clear text-to-speech with natural voice synthesis
- **Multi-Language Support**: Primarily English with future expansion to other languages
- **Customizable Playback**: Speed control and voice preferences
- **Summary Audio**: Listen to book summaries and descriptions hands-free
- **Seamless Controls**: Play, pause, and stop reading with intuitive buttons

### 📖 Enhanced Reading Experience
- **Integrated Web Reader**: Full-screen HTML book viewing with comfortable typography
- **Format Flexibility**: Support for multiple book formats (HTML, PDF, plain text, EPUB)
- **Reading Progress**: Automatic saving of your reading position (coming in v1.1)
- **Offline Capability**: Download books for reading without internet connection
- **Share & Export**: Easily share favorite passages or quote highlights

### 💖 Personal Book Library
- **Smart Bookmarking**: Save books to personal favorites with one-tap
- **Reading Lists**: Create custom reading lists and collections
- **History Tracking**: View your complete reading history and progress
- **Sync Across Devices**: Cloud sync for bookmarks and preferences (planned)
- **Personal Recommendations**: AI-powered book suggestions based on reading habits

### 🎨 User Experience & Design
- **Modern UI/UX**: Clean, intuitive design with smooth animations
- **Tab Navigation**: Easy switching between Home, Categories, Bookmarks, and Profile
- **Dark Mode**: Eye-friendly reading in low light conditions (planned)
- **Accessible Design**: Screen reader support and large text options
- **Performance**: Lightning-fast loading with smart caching

### 🔧 Advanced Features
- **Notification System**: Stay updated with new book releases and recommendations
- **Social Sharing**: Share books on social media platforms
- **Settings Management**: Customize app preferences and reading options
- **Multi-Language UI**: User interface in multiple languages
- **Help & Support**: In-app help sections and customer support

### 🛡️ Privacy & Security
- **Zero Ads**: Completely ad-free experience focused on reading
- **Minimal Data Collection**: Only essential usage data collected
- **GDPR Compliant**: Full data protection and user rights
- **Open Source Content**: All books freely available in public domain
- **Secure Storage**: Encrypted local storage for personal data

## 📸 Screenshots

<div align="center">
  <img src="assets/images/Banner.png" alt="Home Screen" width="300" />
  <img src="assets/images/Frame_2.png" alt="Book Details" width="300" />
  <br>
  <img src="assets/images/Frame_3.png" alt="Reading Interface" width="300" />
  <img src="assets/images/Logo.png" alt="App Logo" width="200" />
</div>

## 🚀 Technologies Used

### Core Framework
- **React Native**: Cross-platform mobile app development
- **Expo**: Managed workflow with over-the-air updates
- **Expo Router**: Advanced file-based routing system
- **TypeScript**: Type-safe JavaScript development

### State Management & Data
- **Redux Toolkit**: Global state management with persistence
- **Redux Persist**: Automatic data persistence across app sessions
- **React Query**: Intelligent data fetching with caching strategies
- **AsyncStorage**: Local device storage for offline functionality

### UI/UX Libraries
- **React Native Reanimated**: Fluid animations and transitions
- **Expo Vector Icons**: Rich icon library from multiple providers
- **React Native Safe Area**: Device-specific UI adjustments
- **React Native Gesture Handler**: Advanced gesture recognition

### Advanced Features
- **Expo Speech**: Professional text-to-speech engine
- **React Native WebView**: Embedded web content for book reading
- **Expo Sharing**: Native sharing capabilities
- **Expo Notifications**: Push notification management

### Backend & APIs
- **Project Gutenberg**: World's largest collection of free eBooks
- **Gutendex API**: Modern REST API for Gutenberg data
- **JSON Data Structure**: Efficient book metadata handling

## 📱 Installation & Usage

### Download & Setup
1. **Install Expo Go** from App Store/Google Play
2. **Open the app** and scan the QR code from expo.dev
3. **Start reading** - no sign-up required!

### For Developers
```bash
# Clone repository
git clone https://github.com/Amrr-Maherr/Bazar.git
cd Bazar

# Install dependencies
npm install

# Start development server
npm start
```

## 📚 Technical Implementation

### Architecture Highlights
- **File-based Routing**: Clean URL structure with Expo Router
- **Custom Hooks**: Reusable data fetching with React Query
- **Component Architecture**: Modular, maintainable code structure
- **Type Safety**: Complete TypeScript coverage
- **Performance Optimization**: Lazy loading and efficient rendering

### Data Flow
1. **API Integration**: Fetch books from Gutenberg via REST API
2. **State Management**: Redux handles global app state
3. **Local Storage**: AsyncStorage for offline persistence
4. **Caching Strategy**: React Query for smart data caching
5. **User Preferences**: Persistent app settings and bookmarks

## 🔒 Privacy & Terms

### Privacy Policy
Bazar collects minimal data to enhance your reading experience:
- Reading preferences and favorite books (stored locally)
- Anonymous usage analytics for app improvement
- No personal information shared with third parties

### Terms of Service
- All book content is public domain and free to use
- No ads, subscriptions, or hidden fees
- User-generated content guidelines and community standards

**Read full Privacy Policy and Terms [in-app under Help section]**

## 📈 Future Updates

### Version 1.1 (Q1 2025)
- Dark mode implementation
- Offline book downloads
- Reading progress indicators
- Enhanced search and filters

### Version 1.2 (Q2 2025)
- Google Authentication integration
- Firebase Cloud Functions
- AI-powered recommendations using Google ML Kit
- Social book sharing features
- Real-time collaborative reading lists
- Google Books API integration for modern books

### Version 2.0 (2025)
- Cross-platform desktop app
- Advanced annotation tools with Google Docs sync
- Collaborative reading lists with Firebase Firestore
- Google Cloud Vision for receipt scanning
- Multi-language support with Google Translate
- Push notifications via Firebase Cloud Messaging

## 📞 Contact & Support

- **Email**: legal@bazar.app
- **GitHub**: Amrr-Maherr/Bazar
- **Issues**: Report bugs and request features

## 📝 License

MIT License - Free for personal and commercial use.

---

<div align="center">
  <h3>Join thousands of readers discovering free literature worldwide!</h3>
  <p><strong>Download Bazar now and start your reading journey!</strong></p>
  <img src="assets/images/Logo.png" alt="Bazar Logo" width="100" />
</div>

*Built with ❤️ for book lovers everywhere*
