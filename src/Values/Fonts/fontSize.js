import {Dimensions, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 350;

export function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
}

export const FONTSIZE = {
  title: normalize(20),
  smalltitle: normalize(19),
  settitle: normalize(18),
  primaryText: normalize(14),
  primaryText2: normalize(13),
  secondaryText: normalize(12),
  smallText: normalize(10),
  verysmallText: normalize(9),
  subtitle: normalize(16),
  subtitle2: normalize(17),
  buttonFontSize: normalize(16),
  errorFont: normalize(10),
  sz_md: normalize(25),
  sz_bg: normalize(30),
  twentyFour: normalize(24),
  eleven: normalize(11),
  twentyTwo:normalize(22),
  eight:normalize(8)
};
