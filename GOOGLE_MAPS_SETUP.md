# Google Maps Setup Instructions

## Overview
The address screen now includes Google Maps integration for location selection. Users can:
- View an interactive Google Map
- Drag the marker to select a location
- Use the current location button to auto-fill coordinates
- See latitude and longitude fields auto-populate when a location is selected

## Setup Steps

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS (if building for iOS)
4. Go to "Credentials" and create an API key
5. (Optional) Restrict the API key to your app's package name for security

### 2. Configure Android

The Android configuration has already been added to `android/app/src/main/AndroidManifest.xml`.

**Replace the API key:**
1. Open `android/app/src/main/AndroidManifest.xml`
2. Find the line with `YOUR_GOOGLE_MAPS_API_KEY_HERE`
3. Replace it with your actual Google Maps API key

```xml
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="YOUR_ACTUAL_API_KEY_HERE"/>
```

### 3. Configure iOS (if needed)

1. Open `ios/Podfile`
2. Add the following line inside the target block:
   ```ruby
   pod 'GoogleMaps'
   ```
3. Run `cd ios && pod install`
4. Open `ios/pantaloons/AppDelegate.mm`
5. Import Google Maps:
   ```objc
   #import <GoogleMaps/GoogleMaps.h>
   ```
6. Add this line in `didFinishLaunchingWithOptions`:
   ```objc
   [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY_HERE"];
   ```

### 4. Rebuild the App

After adding your API key, rebuild the app:

```bash
# For Android
npm run android

# For iOS
npm run ios
```

## Features

### Map Interaction
- **Tap on map**: Select a location by tapping anywhere on the map
- **Drag marker**: Drag the red marker to fine-tune the location
- **Current location button**: Tap the blue button in the bottom-right to use your current location

### Form Integration
- When a location is selected, the **Latitude** and **Longitude** fields automatically appear and populate
- These fields are read-only and display coordinates with 6 decimal precision
- The coordinates are included in the form data when submitting

### Permissions
- The app will request location permissions when you tap the current location button
- Location permissions are required to use the "Use Current Location" feature

## Troubleshooting

### Map not showing
- Verify your API key is correct
- Ensure Maps SDK for Android is enabled in Google Cloud Console
- Check that you've rebuilt the app after adding the API key

### Current location not working
- Grant location permissions when prompted
- Ensure location services are enabled on your device
- Check that location permissions are added in AndroidManifest.xml

### Build errors
- Run `cd android && ./gradlew clean` then rebuild
- Clear Metro bundler cache: `npm start -- --reset-cache`

## Notes

- The map is now scrollable (non-sticky) - it scrolls with the form
- Map height is set to 250px for better visibility
- Default location is set to Delhi, India (28.6139, 77.2090)
- Coordinates are formatted to 6 decimal places for precision
