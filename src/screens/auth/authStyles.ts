import {StyleSheet} from 'react-native';
import {
  Screen,
  borderWidth,
  inputHeight,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';

export const authStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: universalPaddingHorizontalHigh,
  },
  welcomeLogo: {
    height: 500,
    width: 200,
    alignSelf: 'center',
  },
  welcomeSecondContainer: {
    flex: 1,
    marginTop: Screen.Height / 1.7,
  },
  welcomeSecondContainer2: {
    flex: 1,
  
  },
  tradeSign: {
    height: 20,
    width: 90,
    position: 'absolute',
    left: 200,
    top: 35,
  },
  welcomeButton: {
    marginVertical: 50,
  },
  bottomText: {
    textAlign: 'center',
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
  },
  forgotText: {
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  forgotContainer: {
    marginTop: 50,
  },
  marginTop: {
    marginTop: 20,
  },
  underlineStyleBase: {
    height: inputHeight,
    borderWidth: borderWidth,
    backgroundColor: colors.inputBackground,
    borderRadius: 10,
    marginTop: 50,
    borderColor: colors.inputBorder,
  },
  underlineStyleHighLighted: {
    borderColor: colors.buttonBg,
  },
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  tabBarMain: {
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    marginTop: 20,
  },
  tabBarActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100, 
    borderBottomWidth:1,
    borderBottomColor:colors.textYellow
  },
  tabBarInActive: {
    alignItems: 'center',
    justifyContent: 'center',
    width:100, 
    borderBottomWidth:1,
    borderBottomColor:colors.white

  },
  mobileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    flex: 0.6,
    marginEnd: 10,
  },
  mobileInput: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginStart: 5,
  },
  termsText: {
    textDecorationLine: 'underline',
  },
});
