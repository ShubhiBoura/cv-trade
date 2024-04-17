import React, {useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  Input,
  SECOND,
  TEN,
  Toolbar,
} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingTop,
} from '../../theme/dimens';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import {sendOtp} from '../../actions/authActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {showError} from '../../helper/logger';
import {validatePassword} from '../../helper/utility';
import {changePassword} from '../../actions/accountActions';
import { APP_THEME_BG } from '../helper/imageAssets';

const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const [otp, setOtp] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [otpText, setOtpText] = useState('Get OTP');
  const passwordInput = useRef(null);
  const newPasswordInput = useRef(null);
  const confirmPasswordInput = useRef(null);
  const userData = useAppSelector(state => state.auth.userData);
  const {mobileNumber} = userData ?? '';

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
    if (!validatePassword(password)) {
      showError(errorText.oldPasswordRegex);
      return;
    }
    if (!validatePassword(newPassword)) {
      showError(errorText.passwordRegex);
      return;
    }
    if (newPassword !== confirmPassword) {
      showError(errorText.passwordMismatch);
      return;
    }
    let data = {
      email_or_phone: mobileNumber,
      new_password: newPassword,
      confirm_password: confirmPassword,
      verification_code: otp,
      current_password: password,
    };
    dispatch(changePassword(data));
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={'Change Password'} />
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
            onSubmitEditing={() => passwordInput?.current?.focus()}
            isOtp
            onSendOtp={() => onGetOtp()}
            otpText={otpText}
          />
          <Input
            title={titleText.password}
            placeholder={placeHolderText.password}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            assignRef={input => {
              passwordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => newPasswordInput?.current?.focus()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
          />
          <Input
            title={titleText.newPassword}
            placeholder={placeHolderText.newPassword}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isNewPasswordVisible}
            assignRef={input => {
              newPasswordInput.current = input;
            }}
            returnKeyType="next"
            isSecure
            onSubmitEditing={() => confirmPasswordInput?.current?.focus()}
            onPressVisible={() =>
              setIsNewPasswordVisible(!isNewPasswordVisible)
            }
          />
          <Input
            title={titleText.confirmPassword}
            placeholder={placeHolderText.confirmNewPassword}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isConfirmPasswordVisible}
            assignRef={input => {
              confirmPasswordInput.current = input;
            }}
            returnKeyType="done"
            isSecure
            onSubmitEditing={() => onSubmit()}
            onPressVisible={() =>
              setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            }
          />
        </View>
        <Button
          children="Change Password"
          onPress={() => onSubmit()}
          containerStyle={styles.button}
        />
        <AppText type={TEN} color={SECOND} style={styles.info}>
          Changing password will delete all your active sessions.
        </AppText>
      </KeyBoardAware>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default ChangePassword;
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
  info: {
    textAlign: 'center',
    marginVertical: 10,
  },
});
