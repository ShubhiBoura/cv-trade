import {StyleSheet} from 'react-native';
import {colors} from './colors';
import { Screen } from './dimens';
export const commonStyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  screenSize: {
    // height: Screen.Height,
    // width: Screen.Width,
    flex:1
  },
  flexRow: {
    flexDirection: 'row',
  },
  tabIcon: {width: 20, height: 20},
  centerText: {textAlign: 'center'},
  flexGrow: {
    flexGrow: 1,
  },
  zeroPadding: {
    paddingHorizontal: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
  },

  transparent: {
    backgroundColor: colors.transparent,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backGround: {
    backgroundColor: colors.mainBg,
  },
});
