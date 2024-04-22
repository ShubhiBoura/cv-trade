import React, {useState} from 'react';
import {AppSafeAreaView, Button, Input, Toolbar} from '../../common';
import {useRoute} from '@react-navigation/native';
import KeyBoardAware from '../../common/KeyboardAware';
import {Keyboard, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {errorText, placeHolderText} from '../../helper/Constants';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {enableTwoFa} from '../../actions/accountActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {verifyOtp} from '../../actions/authActions';
import { APP_THEME_BG } from '../helper/imageAssets';

const EnterOtp = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(state => state.auth.userData);
  const {mobileNumber} = userData ?? '';
  const route = useRoute();
  const title = route?.params?.title ?? '';
  const isLogin = route?.params?.isLogin ?? '';
  const _code = route?.params?.code ?? '';
  const [code, setCode] = useState('');
  const onSubmit = () => {
    if (!code) {
      showError(errorText.otp);
      return;
    }

    Keyboard.dismiss();
    if (isLogin) {
      const data = {
        email_or_phone: mobileNumber,
        otp: code,
        type: _code,
      };
      dispatch(verifyOtp(data));
    } else {
      const data = {
        email_or_phone: mobileNumber,
        type: _code,
        verification_code: code,
      };
      dispatch(enableTwoFa(data));
    }
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={title} />
      <KeyBoardAware>
        <View style={styles.container}>
          <Input
            title={placeHolderText.code}
            placeholder={placeHolderText.code}
            value={code}
            onChangeText={text => setCode(text)}
            autoCapitalize="none"
            returnKeyType="done"
            keyboardType="numeric"
            onSubmitEditing={() => onSubmit()}
            containerStyle={{backgroundColor:colors.inputContainColor}}
          />
        </View>
      </KeyBoardAware>
      <Button
        children="Submit"
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default EnterOtp;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: universalPaddingTop,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
