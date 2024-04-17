import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  RED,
  SEMI_BOLD,
  Toolbar,
} from '../../common';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import KeyBoardAware from '../../common/KeyboardAware';
import {
  Screen,
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import {commonStyles} from '../../theme/commonStyles';
import NavigationService from '../../navigation/NavigationService';
import {
  KYC_STEP_ONE_SCREEN,
  SEARCH_SCREEN,
  TRADE_SCREEN,
} from '../../navigation/routes';
import {useAppSelector} from '../../store/hooks';
import {APP_THEME_BG, kyc_due, kyc_pending, kyc_rejected ,kyc_completed} from '../helper/imageAssets';

const KycPending = () => {
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <FastImage
        source={kyc_pending}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText weight={SEMI_BOLD} style={styles.title2}>
        Your CV Trade’s Account KYC approval is pending. Please wait for the
        approval.
      </AppText>
      <Button
        children="Start Trading"
        disabled
        containerStyle={styles.button}
      />
    </AppSafeAreaView>
  );
};

const KycRejected = () => {
  const userData = useAppSelector(state => state.auth.userData);
  const {kyc_reject_reason} = userData ?? '';
  return (
    <View>
      <FastImage
        source={kyc_rejected}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText
        weight={SEMI_BOLD}
        style={[styles.title, {color: colors.text_one}]}>
        Your CV Trade’s Account KYC is rejected. Please complete your KYC again.
      </AppText>
      <View style={styles.reasonContainer}>
        <AppText style={commonStyles.centerText} color={RED}>
          Reason:{kyc_reject_reason}
        </AppText>
      </View>
      
       <View style={{width:Screen.Width,height:Screen.Height/3,alignItems:"center",justifyContent:"flex-end", }}>
      <Button
        children="Verify Again"
        onPress={() => NavigationService.navigate(KYC_STEP_ONE_SCREEN)}
        containerStyle={{width:"100%"}}
      />
    </View>
      </View>
  );
};
const KycDue = () => {
  return (
    <View >
      <FastImage source={kyc_due} resizeMode="contain" style={styles.icon} />
      <AppText
        weight={SEMI_BOLD}
        style={[styles.title, {color: colors.text_two}]}>
        Your CV Trade’s Account KYC is pending. Please complete your KYC.
      </AppText>
      <View style={{width:Screen.Width,height:Screen.Height/3,alignItems:"center",justifyContent:"flex-end", }}>
      <Button
        children="Complete Your KYC"
        onPress={() => NavigationService.navigate(KYC_STEP_ONE_SCREEN)}
        containerStyle={{width:"100%"}}
      />
</View>

    </View>
  );
};
const KycCompleted = () => {
  return (
    <View>
      <FastImage
        source={kyc_completed}
        resizeMode="contain"
        style={styles.icon}
      />
      <AppText weight={SEMI_BOLD} style={[styles.title, {color: colors.green}]}>
        Your CV Trade’s Account KYC is Completed.
      </AppText>
      <Button
        children="Start Trading"
        onPress={() => NavigationService.navigate(SEARCH_SCREEN)}
        containerStyle={styles.button}
      />

    </View>
  );
};

const KycStatus = () => {
  const userData = useAppSelector(state => state.auth.userData);
  const {kycVerified} = userData ?? '';

  const kycStatus = () => {
    if (kycVerified === 0) {
      return <KycDue />;
    } else if (kycVerified === 1) {
      return <KycPending />;
    } else if (kycVerified === 2) {
      return <KycCompleted />;
    } else if (kycVerified === 3) {
      return <KycRejected />;
    }
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={'KYC'} />
      <KeyBoardAware>{kycStatus()}</KeyBoardAware>
    </AppSafeAreaView>
  );
};

export default KycStatus;
const styles = StyleSheet.create({
  icon: {
    height: 200,
    width: 250,
    alignSelf: 'center',
    marginTop: 50,
  },
  title: {
    textAlign: 'center',
    marginHorizontal: universalPaddingHorizontalHigh,
  },
  title2: {
    textAlign: 'center',
    marginHorizontal: universalPaddingHorizontalHigh,
    marginTop: 20,
    color: colors.text_three,
  },
  button: {
    marginTop: 60,
  },
  reasonContainer: {
    backgroundColor: colors.redBg,
    borderWidth: borderWidth,
    borderColor: colors.red,
    padding: universalPaddingHorizontal,
    borderRadius: 10,
    marginTop: 10,
  },
});
