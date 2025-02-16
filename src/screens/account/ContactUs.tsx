import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  SEMI_BOLD,
  SIXTEEN,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import FastImage from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import { contact_us } from '../helper/imageAssets';

const ContactUs = () => {
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={'Contact Us'} />
      <KeyBoardAware>
        <FastImage
          source={contact_us}
          resizeMode="contain"
          style={styles.image}
        />
        <AppText>
          We are always open and we welcome your questions to our team. If you
          would like to get in touch.{'\n'}
          {'\n'}Please Write to us on our mail below.
        </AppText>
        <View style={styles.mailContainer}>
          <AppText type={SIXTEEN} weight={SEMI_BOLD}>
            cvtrade_exchange.in@gmail.com
          </AppText>
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default ContactUs;
const styles = StyleSheet.create({
  image: {
    height: 300,
    width: 400,
    alignSelf: 'center',
    marginVertical: 40,
  },
  mailContainer: {
    marginTop: universalPaddingTop,
    backgroundColor: colors.black,
    borderWidth: borderWidth,
    borderColor: colors.inputContainColor,
    padding: universalPaddingHorizontal,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
