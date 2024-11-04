import {Platform} from 'react-native';

// Define the font name based on the platform
let font;
if (Platform.OS === 'android') {
  font = 'LatoRegular';
} else if (Platform.OS === 'ios') {
  font = 'Lato-Regular';
}
let fontBold;
if (Platform.OS === 'android') {
  fontBold = 'LatoBold';
} else if (Platform.OS === 'ios') {
  fontBold = 'Lato-Bold';
}

let Roboto;
if (Platform.OS === 'android') {
  Roboto = 'Roboto';
} else if (Platform.OS === 'ios') {
  Roboto = 'Roboto';
}

let inter;
if (Platform.OS === 'android') {
  inter = 'Inter';
} else if (Platform.OS === 'ios') {
  inter = 'Inter';
}

// Define the fontFamily
export const fontFamily = {
  cereal: font, // Assign the font variable here
  cerealBold: fontBold, // Assign the fontBold variable here
  Roboto: Roboto,
  inter: inter
};
