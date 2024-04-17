import React, {useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  BLACK,
  Button,
  FOURTEEN,
  Input,
  SECOND,
  SEMI_BOLD,
  Toolbar,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {useRoute} from '@react-navigation/native';
import {sendOtp} from '../../actions/authActions';
import {Keyboard, StyleSheet, View} from 'react-native';
import {showError} from '../../helper/logger';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import KeyBoardAware from '../../common/KeyboardAware';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {withdrawCoin} from '../../actions/walletActions';

const Withdraw = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const walletDetail = route?.params?.walletDetail;
  const {chain, currency} = walletDetail ?? '';
  const userData = useAppSelector(state => state.auth.userData);
  const {mobileNumber} = userData ?? '';
  const [otp, setOtp] = useState<string>('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [otpText, setOtpText] = useState('Get OTP');
  const addressInput = useRef(null);
  const amountInput = useRef(null);
  const onGetOtp = () => {
    let data = {
      email_or_phone: mobileNumber,
      resend: true,
      type: false,
    };
    dispatch(sendOtp(data));
    setOtpText('Resend OTP');
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!otp) {
      showError(errorText.otp);
      return;
    }
    if (!address) {
      showError(errorText.wallet);
      return;
    }
    if (!amount) {
      showError(errorText.amount);
      return;
    }
    let data = {
      otp: otp,
      address: address,
      amount: amount,
      email_or_phone: mobileNumber,
      chain: chain[0],
    };
    Keyboard.dismiss();
    dispatch(withdrawCoin(data));
  };
  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={`Withdraw ${currency}`} />
      <KeyBoardAware>
        <View style={styles.container}>
          <Input
            title={titleText.code}
            placeholder={placeHolderText.code}
            value={otp}
            onChangeText={text => setOtp(text)}
            keyboardType="numeric"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => addressInput?.current?.focus()}
            isOtp
            onSendOtp={() => onGetOtp()}
            otpText={otpText}
          />
          <Input
            title={titleText.wallet}
            placeholder={placeHolderText.wallet}
            value={address}
            onChangeText={text => setAddress(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            assignRef={input => {
              addressInput.current = input;
            }}
            onSubmitEditing={() => amountInput?.current?.focus()}
          />
          <Input
            title={titleText.amount}
            placeholder={placeHolderText.amount}
            value={amount}
            onChangeText={text => setAmount(text)}
            keyboardType="numeric"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            assignRef={input => {
              amountInput.current = input;
            }}
          />
        </View>
        <View style={styles.container}>
          <AppText color={SECOND} weight={SEMI_BOLD} type={FOURTEEN}>
            Disclaimer:
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            • Minimum withdraw of 0.1 {currency}, withdraw below that cannot be
            possible.
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            • Please withdraw in only {currency} supported wallets. If you
            withdraw in any other wallet, it will be lost forever.
          </AppText>
          <AppText style={styles.disclaimerText} color={SECOND}>
            • This is {chain[0]} withdraw address type. Transferring to an
            unsupported network could result in loss of coin.
          </AppText>
        </View>
        <Button
          children="Withdraw"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
    </AppSafeAreaView>
  );
};
export default Withdraw;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {marginTop: 50},
  disclaimerText: {
    marginVertical: 5,
  },
});
