import React, {useEffect, useRef, useState} from 'react';
import NavigationService from '../../navigation/NavigationService';
import {FORGOT_PASSWORD_SCREEN, REGISTER_SCREEN} from '../../navigation/routes';
import {
  AppSafeAreaView,
  AppText,
  BLACK,
  Button,
  FOURTEEN,
  Input,
  SEMI_BOLD,
  TWENTY,
  TWENTY_SIX,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import {welcomeBg} from '../../helper/ImageAssets';
import {Keyboard, View} from 'react-native';
import {authStyles} from './authStyles';
import {
  CAPTCHA_KEY,
  SITE_URL,
} from '../../helper/Constants';
import KeyBoardAware from '../../common/KeyboardAware';
import {showError} from '../../helper/logger';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {login} from '../../actions/authActions';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import {checkValue, validateEmail} from '../../helper/utility';
import Recaptcha from 'react-native-recaptcha-that-works';
import { Screen } from '../../theme/dimens';
import { colors } from '../../theme/colors';
export const RenderTabBarAuth = (props: any) => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const routes = [
    {key: 'first', title: checkValue(languages?.mobile)},
    {key: 'second', title: checkValue(languages?.email)},
  ];
  return (
    <View style={authStyles.tabBarMain}>
      {routes.map((route, i) => {
        return (
          <TouchableOpacityView
            key={i}
            onPress={() => props?.setIndex(i)}
            style={
              i === props?.index
                ? authStyles.tabBarActive
                : authStyles.tabBarInActive
            }>
            <AppText
              type={FOURTEEN}
              weight={SEMI_BOLD}
              style={{color:i === props?.index ? colors.textYellow : colors.white}}
              >
              {route.title}
            </AppText>
          </TouchableOpacityView>
        );
      })}
    </View>
  );
};
const Login = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [index, setIndex] = useState(0);
  const passwordInputRef = useRef(null);
  const [getfoucs, setFoucs] = useState(false);
  const [getfoucsPass, setFoucsPass] = useState(false);
  const recaptcha = useRef();
  useEffect(() => {
    setUserName('');
    setPassword('');
  }, [index]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardVisible(true); 
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); 
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const onLogin = () => {
    if (index === 0 && !userName) {
      showError(checkValue(languages?.error_userName));
      return;
    }
    if (index === 1 && !validateEmail(userName)) {
      showError(checkValue(languages?.error_email));
      return;
    }
    if (!password) {
      showError(checkValue(languages?.error_password));
      return;
    }
    console.log('Helloooo')
    Keyboard.dismiss();
    // send();
    onVerify()
  };
  const onRegister = () => {
    NavigationService.navigate(REGISTER_SCREEN);
  };
  const onForgot = async () => {
    NavigationService.navigate(FORGOT_PASSWORD_SCREEN);
  };

  const send = () => {
    recaptcha?.current?.open();
  };

  const onVerify = token => {
    let data = {
      email_or_phone: userName,
      password: password,
      // token: token,
    };
    dispatch(login(data));
  };

  const onExpire = () => {};

  return (
    <AppSafeAreaView source={welcomeBg}>
      <Toolbar isLogo={false} />
      <KeyBoardAware>
        <View style={[authStyles.welcomeSecondContainer2,{
          marginTop:Screen.Height/2.5
        }]}>
          <AppText type={TWENTY}>
            {checkValue(languages?.login_one)}
            {'\n'}
            <AppText type={TWENTY_SIX} weight={SEMI_BOLD}  style={{color:colors.textPurple}}>
              {checkValue(languages?.login_two)}
            </AppText>
          </AppText>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.login_three)}
          </AppText>
          <RenderTabBarAuth index={index} setIndex={setIndex} />
          <View style={authStyles.mobileContainer}>
            <Input
              placeholder={
                index === 0
                  ? checkValue(languages?.place_userName)
                  : checkValue(languages?.place_email)
              }
              value={userName}
              onChangeText={text => setUserName(text)}
              keyboardType={index === 0 ? 'numeric' : 'email-address'}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordInputRef?.current?.focus()}
              maxLength={index === 0 ? 10 : 100}
              mainContainer={authStyles.mobileInput}
              onfocus={()=>setFoucs(true)}
              onBlur={()=>setFoucs(false)}
            />
          </View>

          <Input
            placeholder={checkValue(languages?.place_password)}
            value={password}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
            assignRef={input => {
              passwordInputRef.current = input;
            }}
            returnKeyType="done"
            isSecure
            onSubmitEditing={() => onLogin()}
            onPressVisible={() => setIsPasswordVisible(!isPasswordVisible)}
            onfocus={()=>setFoucsPass(true)}
            onBlur={()=>setFoucsPass(false)}
          />
          <AppText onPress={() => onForgot()} style={authStyles.forgotText}>
            {checkValue(languages?.login_seven)}
          </AppText>
          <Button
            children={checkValue(languages?.login_four)}
            onPress={() => onLogin()}
          />
        </View>
        {!isKeyboardVisible && (
          <AppText
            onPress={() => onRegister()}
            weight={SEMI_BOLD}
            style={authStyles.bottomText}>
            {checkValue(languages?.login_five)}{' '}
            <AppText weight={SEMI_BOLD}  style={{color:colors.textPurple}}>
              {checkValue(languages?.login_six)}
            </AppText>
          </AppText>
        )}
      </KeyBoardAware>
      <Recaptcha
        ref={recaptcha}
        siteKey={CAPTCHA_KEY}
        baseUrl={SITE_URL}
        onVerify={onVerify}
        onExpire={onExpire}
        size="normal"
      />

      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Login;




