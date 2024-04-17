import React, {useEffect} from 'react';
import {
  AppSafeAreaView,
  AppText,
  BOLD,
  FOURTEEN,
  SECOND,
  SEMI_BOLD,
  Toolbar,
  YELLOW,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useRoute} from '@react-navigation/native';
import {generateAddress} from '../../actions/walletActions';
import {StyleSheet, View} from 'react-native';
import KeyBoardAware from '../../common/KeyboardAware';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  inputHeight,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {commonStyles} from '../../theme/commonStyles';
import QRCode from 'react-native-qrcode-svg';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {copyIcon} from '../../helper/ImageAssets';
import {copyText} from '../../helper/utility';

const Deposit = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const {currency_id, chain, currency} = walletDetail ?? '';
  const walletAddress = useAppSelector(state => state.wallet.walletAddress);
  const isLoading = useAppSelector(state => state.auth.isLoading);

  useEffect(() => {
    let data = {
      currency_id: currency_id,
      chain: chain[0],
    };
    dispatch(generateAddress(data));
  }, []);

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={`Deposit ${currency}`} />
      {!isLoading && walletAddress && (
        <KeyBoardAware>
          <View style={styles.container}>
            <AppText style={commonStyles.centerText} color={SECOND}>
              Scan this QR code from mobile
            </AppText>
            {chain.length !== 0 && (
              <AppText
                color={YELLOW}
                type={FOURTEEN}
                weight={BOLD}
                style={styles.copyText}>
                {chain[0]}
              </AppText>
            )}
            <View style={styles.qrCodeContainer}>
              {walletAddress && (
                <QRCode
                  value={walletAddress}
                  size={220}
                  logoBackgroundColor="white"
                />
              )}
            </View>
            <View style={styles.addressContainer}>
              <AppText
                ellipsizeMode="middle"
                numberOfLines={1}
                style={styles.address}>
                {walletAddress}
              </AppText>
              <View style={styles.divider} />
              <TouchableOpacityView
                onPress={() => copyText(walletAddress)}
                style={styles.copyIconContainer}>
                <FastImage
                  source={copyIcon}
                  resizeMode="contain"
                  style={styles.copyIcon}
                />
              </TouchableOpacityView>
            </View>
            <AppText style={styles.copyText} color={SECOND}>
              Click above to copy the code
            </AppText>
          </View>
          <View style={styles.container}>
            <AppText color={SECOND} weight={SEMI_BOLD} type={FOURTEEN}>
              Disclaimer:
            </AppText>
            <AppText style={styles.disclaimerText} color={SECOND}>
              • Minimum deposit of 0.1 {currency}, deposit below that cannot be
              recovered.
            </AppText>
            <AppText style={styles.disclaimerText} color={SECOND}>
              • Please deposit only {currency} on this address. If you deposit
              any other coin, it will be lost forever.
            </AppText>
            <AppText style={styles.disclaimerText} color={SECOND}>
              • This is {chain[0]} deposit address type. Transferring to an
              unsupported network could result in loss of deposit.
            </AppText>
          </View>
        </KeyBoardAware>
      )}
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};
export default Deposit;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  qrCodeContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  addressContainer: {
    marginTop: 10,
    height: inputHeight,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 25,
    paddingHorizontal: universalPaddingHorizontal,
    backgroundColor: colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: inputHeight - 10,
    backgroundColor: colors.secondaryText,
    marginHorizontal: 5,
  },
  copyIcon: {
    height: 20,
    width: 20,
  },
  address: {
    flex: 1,
  },
  copyIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyText: {
    textAlign: 'center',
    marginTop: 10,
  },
  disclaimerText: {
    marginVertical: 5,
  },
});
