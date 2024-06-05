import AsyncStorage from '@react-native-async-storage/async-storage';

export const globalFontStyle = {
  fontSize: 16, // default value
  fontFamily: 'System',
};

export const updateGlobalFontStyle = (newFontStyle) => {
  globalFontStyle.fontSize = newFontStyle.fontSize;
  globalFontStyle.fontFamily = newFontStyle.fontFamily;
};

const themes = {
  light: '#ffffff',
  dark: '#4f5354',
  green: '#768c72'
};

export const getGlobalStyles = async () => {
  const backgroundColor = await AsyncStorage.getItem('backgroundColor') || '#ffffff';
  return {
    container: {
      flex: 1,
      backgroundColor,
    },
  };
};

export const fetchFontSizeAndTheme = async () => {
  let fontSize = globalFontStyle.fontSize;
  let backgroundColor = themes.light;

  const fontSettings = await AsyncStorage.getItem('fontSettings');
  if (fontSettings) {
    const { fontSize: storedFontSize } = JSON.parse(fontSettings);
    fontSize = storedFontSize;
  }

  const bgColor = await AsyncStorage.getItem('backgroundColor');
  if (bgColor) {
    backgroundColor = bgColor;
  }

  return { fontSize, backgroundColor };
};