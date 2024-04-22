import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  Button,
  FOURTEEN,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  TWENTY_SIX,
  Toolbar,
  YELLOW,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import FastImage from 'react-native-fast-image';

import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {borderWidth, universalPaddingHorizontal} from '../../theme/dimens';
import {commonStyles} from '../../theme/commonStyles';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {useAppSelector} from '../../store/hooks';
import {copyText, shareToAny} from '../../helper/utility';
import { APP_THEME_BG, copyIcon, giftIc, inviteIcon } from '../helper/imageAssets';

const InviteAndEarn = () => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const referCode = useAppSelector(state => state.home.referCode);
  
  const referCount = useAppSelector(state => state.home.referCount);
  const message = `https://taxbits.io/invite?code=${referCode}`;
  const onSubmit = () => {
    shareToAny(message);
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={'Invite & Earn'} />
      <KeyBoardAware>
        <FastImage
          source={inviteIcon}
          resizeMode="contain"
          style={styles.image}
        />
        <AppText type={TWENTY_SIX} color={YELLOW} weight={BOLD}>
          Refer Friends.{'\n'}Earn Crypto Together{' '}
        </AppText>
        <AppText>
          Earn up to 40% commission on every trade across Cv Trade.
        </AppText>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <AppText type={FOURTEEN}>Your Total Bonus</AppText>
            <AppText weight={SEMI_BOLD} type={FOURTEEN}>
              0 TEXE
            </AppText>
          </View>
          <View style={styles.divider} />
          <View style={[styles.balanceContainer]}>
            <AppText type={FOURTEEN}>Your Total Referral</AppText>
            <AppText weight={SEMI_BOLD} type={FOURTEEN}>
              {referCount}
            </AppText>
          </View>
          <FastImage
            source={giftIc}
            resizeMode="contain"
            style={styles.giftIcon}
          />
        </View>
        <View style={styles.container2}>
          <AppText type={FOURTEEN} style={commonStyles.centerText}>
            Referral
          </AppText>
          <View style={styles.commissionBox}>
            <View style={styles.commissionBoxSecond}>
              <AppText type={TEN}>You Receive</AppText>
              <AppText type={SIXTEEN}>15%</AppText>
            </View>
            <View style={styles.commissionBoxSecond}>
              <AppText type={TEN}>Friend Receive</AppText>
              <AppText type={SIXTEEN}>0%</AppText>
            </View>
          </View>
          <View style={[styles.commissionBox]}>
            <AppText type={TEN}>
              Referral Code: <AppText weight={SEMI_BOLD}>{referCode}</AppText>
            </AppText>
            <TouchableOpacityView
              onPress={() => {
                copyText(message);
              }}>
              <FastImage
                source={copyIcon}
                resizeMode="contain"
                style={styles.copy}
              />
            </TouchableOpacityView>
          </View>
          <Button
            children="Invite Friends"
            onPress={() => onSubmit()}
            containerStyle={styles.button}
          />
        </View>
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default InviteAndEarn;
const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 300,
    alignSelf: 'center',
  },
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: 50,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  container2: {
    backgroundColor: colors.white_fifteen,
    marginTop: 10,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 0.4,
    backgroundColor: colors.thirdBg,
    marginVertical: 5,
  },
  giftIcon: {
    height: 50,
    width: 50,
    position: 'absolute',
    right: 0,
    top: -45,
  },
  commissionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.lightPurple,
    padding: universalPaddingHorizontal,
    borderRadius: 10,
    marginTop: 10,
  },
  commissionBoxSecond: {
    flex: 1,
  },
  copy: {
    height: 18,
    width: 18,
  },
  button: {marginTop: 20},
});
