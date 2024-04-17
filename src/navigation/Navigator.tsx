/* eslint-disable react/no-unstable-nested-components */
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NavigationService from './NavigationService';
import * as routes from './routes';
import * as React from 'react';
import {TransitionPresets} from '@react-navigation/stack';
import AuthLoading from '../screens/other/AuthLoading';
import Welcome from '../screens/auth/Welcome';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import OtpVerify from '../screens/auth/OtpVerify';
import ResetPassword from '../screens/auth/ResetPassword';
import FastImage from 'react-native-fast-image';
import {commonStyles} from '../theme/commonStyles';
import {colors} from '../theme/colors';
import {account_ic, home_ic, trade_ic, wallet_ic} from '../helper/ImageAssets';
import Home from '../screens/home/Home';
import Wallet from '../screens/wallet/Wallet';
import Account from '../screens/account/Account';
import Trades from '../screens/trades/Trades';
import EditProfile from '../screens/account/EditProfile';
import Notification from '../screens/other/Notification';
import NotificationSettings from '../screens/account/NotificationSettings';
import Settings from '../screens/account/Settings';
import KycStepOne from '../screens/account/KycStepOne';
import KycStatus from '../screens/account/KycStatus';
import InviteAndEarn from '../screens/account/InviteAndEarn';
import ContactUs from '../screens/account/ContactUs';
import CmsPages from '../screens/account/CmsPages';
import BankingSettings from '../screens/account/BankingSettings';
import ChangePassword from '../screens/account/ChangePassword';
import CurrencyPreference from '../screens/account/CurrencyPreference';
import CoinDetails from '../screens/trades/CoinDetails';
import Deposit from '../screens/other/Deposit';
import Withdraw from '../screens/other/Withdraw';
import WalletDetails from '../screens/wallet/WalletDetails';
import DepositInr from '../screens/other/DepositInr';
import WithdrawInr from '../screens/other/WithdrawInr';
import WalletHistoryDetails from '../screens/wallet/WalletHistoryDetails';
import TradeHistoryDetails from '../screens/wallet/TradeHistoryDetails';
import KycStepTwo from '../screens/account/KycStepTwo';
import KycStepThree from '../screens/account/KycStepThree';
import KycStepFour from '../screens/account/KycStepFour';
import KycStepFive from '../screens/account/KycStepFive';
import PaymentOptions from '../screens/account/PaymentOptions';
import TradeSettings from '../screens/account/TradeSettings';
import FeeSettings from '../screens/account/FeeSettings';
import DownloadReport from '../screens/account/DownloadReport';
import AddNewBank from '../screens/account/AddNewBank';
import UpdateKgin from '../screens/account/UpdateKgin';
import CoinDetailChart from '../screens/home/CoinDetailChart';
import CoinTransactionHistory from '../screens/home/CoinTransactionHistory';
import TwoFactor from '../screens/account/TwoFactor';
import TwoFactorQr from '../screens/account/TwoFactorQr';
import EnterOtp from '../screens/account/EnterOtp';
import ConvertHistory from '../screens/home/ConvertHistory';
import Convert from '../screens/home/Convert';
import LanguagePreference from '../screens/account/LanguagePreference';
import Search from '../screens/trades/Search';
import Launchpad from '../screens/trades/LaunchPad';
import SwapNEXBCoin from '../screens/trades/SwapNEXBCoin';
import TouchableOpacityView from '../common/TouchableOpacityView';
import {
  AppText,
  BOLD,
  MEDIUM,
  SEMI_BOLD,
  SIXTEEN,
  THIRTY,
  TWENTY_SIX,
  WHITE,
  YELLOW,
} from '../common';
import {View} from 'react-native';
import QuickBuySell from '../screens/QuickBuySell/QuickBuySell';
import Stacking from '../screens/Staking/Staking';
import StakingSuccess from '../screens/Staking/StakingSuccess';
import qsTransaction from '../screens/QuickBuySell/qsTransaction';
import LackedStakes from '../screens/Staking/LackedStakes';
import {HOME, PROFILE, TRADE, WALLET} from '../screens/helper/imageAssets';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const options = {...TransitionPresets.SlideFromRightIOS, headerShown: false};

const TabIcon = ({focused, icon}: any) => (
  <FastImage
    source={icon}
    style={commonStyles.tabIcon}
    tintColor={focused ? colors.black : colors.white}
    resizeMode="contain"
  />
);

const MyAuthLoadingStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_SCREEN}
      component={AuthLoading}
    />
    <Stack.Screen name={routes.NAVIGATION_AUTH_STACK} component={AuthStack} />
    <Stack.Screen
      name={routes.NAVIGATION_BOTTOM_TAB_STACK}
      component={BottomNavigation}
    />
    <Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfile} />
    <Stack.Screen name={routes.NOTIFICATION_SCREEN} component={Notification} />
    <Stack.Screen name={routes.SEARCH_SCREEN} component={Search} />

    <Stack.Screen
      name={routes.NOTIFICATION_SETTINGS_SCREEN}
      component={NotificationSettings}
    />
    <Stack.Screen name={routes.SETTINGS_SCREEN} component={Settings} />
    <Stack.Screen name={routes.KYC_STEP_ONE_SCREEN} component={KycStepOne} />
    <Stack.Screen name={routes.KYC_STEP_TWO_SCREEN} component={KycStepTwo} />
    <Stack.Screen
      name={routes.KYC_STEP_THREE_SCREEN}
      component={KycStepThree}
    />
    <Stack.Screen name={routes.KYC_STEP_FOUR_SCREEN} component={KycStepFour} />
    <Stack.Screen name={routes.KYC_STEP_FIVE_SCREEN} component={KycStepFive} />
    <Stack.Screen name={routes.KYC_STATUS_SCREEN} component={KycStatus} />
    <Stack.Screen
      name={routes.BANKING_AND_TRADE_SETTINGS_SCREEN}
      component={BankingSettings}
    />
    <Stack.Screen
      name={routes.INVITE_AND_EARN_SCREEN}
      component={InviteAndEarn}
    />
    <Stack.Screen name={routes.CONTACT_US_SCREEN} component={ContactUs} />
    <Stack.Screen name={routes.CMS_SCREEN} component={CmsPages} />
    <Stack.Screen
      name={routes.CHANGE_PASSWORD_SCREEN}
      component={ChangePassword}
    />
    <Stack.Screen
      name={routes.CURRENCY_PREFERENCE_SCREEN}
      component={CurrencyPreference}
    />
    <Stack.Screen name={routes.DEPOSIT_SCREEN} component={Deposit} />
    <Stack.Screen name={routes.WITHDRAW_SCREEN} component={Withdraw} />
    <Stack.Screen name={routes.CONVERT_SCREEN} component={Convert} />
    <Stack.Screen name={routes.COIN_DETAILS_SCREEN} component={CoinDetails} />
    <Stack.Screen
      name={routes.WALLET_DETAIL_SCREEN}
      component={WalletDetails}
    />
    {/* <Stack.Screen name={routes.DEPOSIT_INR_SCREEN} component={DepositInr} /> */}
    {/* <Stack.Screen name={routes.WITHDRAW_INR_SCREEN} component={WithdrawInr} /> */}
    <Stack.Screen
      name={routes.WALLET_HISTORY_DETAILS_SCREEN}
      component={WalletHistoryDetails}
    />
    <Stack.Screen
      name={routes.TRADE_HISTORY_DETAILS_SCREEN}
      component={TradeHistoryDetails}
    />
    {/* <Stack.Screen
      name={routes.PAYMENT_OPTIONS_SCREEN}
      component={PaymentOptions}
    /> */}
    <Stack.Screen
      name={routes.TRADE_SETTINGS_SCREEN}
      component={TradeSettings}
    />
    <Stack.Screen name={routes.FEE_SETTINGS_SCREEN} component={FeeSettings} />
    <Stack.Screen
      name={routes.DOWNLOAD_TRADE_REPORT_SCREEN}
      component={DownloadReport}
    />
    {/* <Stack.Screen name={routes.ADD_NEW_BANK_SCREEN} component={AddNewBank} /> */}
    <Stack.Screen
      name={routes.COIN_DETAILS_CHART_SCREEN}
      component={CoinDetailChart}
    />
    <Stack.Screen
      name={routes.COIN_TRANSACTION_HISTORY_SCREEN}
      component={CoinTransactionHistory}
    />
    <Stack.Screen
      name={routes.TWO_FACTOR_AUTHENTICATION}
      component={TwoFactor}
    />
    <Stack.Screen name={routes.TWO_FACTOR_QR_SCREEN} component={TwoFactorQr} />
    <Stack.Screen name={routes.ENTER_OTP_SCREEN} component={EnterOtp} />

    <Stack.Screen
      name={routes.CONVERT_HISTORY_SCREEN}
      component={ConvertHistory}
    />
    <Stack.Screen
      name={routes.LANGUAGE_PREFERENCE_SCREEN}
      component={LanguagePreference}
    />
    <Stack.Screen name={routes.QUICK_BUY_SELL} component={QuickBuySell} />

    <Stack.Screen name={routes.QS_TRANSACTION} component={qsTransaction} />

    <Stack.Screen name={routes.STAKING} component={Stacking} />

    <Stack.Screen name={routes.STAKING_SUCCESS} component={StakingSuccess} />
    <Stack.Screen name={routes.LAKED_STAKING} component={LackedStakes} />
  </Stack.Navigator>
);
const AuthStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.WELCOME_SCREEN} component={Welcome} />
    <Stack.Screen name={routes.LOGIN_SCREEN} component={Login} />
    <Stack.Screen
      name={routes.FORGOT_PASSWORD_SCREEN}
      component={ForgotPassword}
    />
    <Stack.Screen name={routes.REGISTER_SCREEN} component={Register} />
    <Stack.Screen name={routes.OTP_VERIFY_SCREEN} component={OtpVerify} />
    <Stack.Screen
      name={routes.RESET_PASSWORD_SCREEN}
      component={ResetPassword}
    />
  </Stack.Navigator>
);

const TradeStack = () => (
  <Stack.Navigator screenOptions={options}>
    <Stack.Screen name={routes.TRADE_SCREEN} component={Trades} />
    <Stack.Screen name={routes.SWAPNEXBCOIN_SCREEN} component={SwapNEXBCoin} />
    <Stack.Screen name={routes.COIN_DETAILS_SCREEN} component={CoinDetails} />
    <Stack.Screen
      name={routes.COIN_DETAILS_CHART_SCREEN}
      component={CoinDetailChart}
    />
  </Stack.Navigator>
);
function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName={routes.HOME_SCREEN}
      backBehavior={'history'}
 
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: colors.black,
          height: 60,
          borderTopWidth: 0,
          paddingVertical: 10,
        },
        tabBarIconStyle: {},
        tabBarAllowFontScaling: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: colors.buttonBg,
        tabBarInactiveTintColor: colors.tabIcon,
      }}>
      <Tab.Screen
        name={routes.HOME_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 35,
                  height: 35,
                  backgroundColor: focused ? colors.buttonBg : null,
                  borderRadius: 20,
                }}>
                <TabIcon focused={focused} icon={HOME} />
              </View>
            </>
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name={routes.NAVIGATION_TRADE_STACK}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 35,
                  height: 35,
                  backgroundColor: focused ? colors.buttonBg : null,
                  borderRadius: 20,
                }}>
                <TabIcon focused={focused} icon={TRADE} />
              </View>
            </>
          ),
        }}
        component={TradeStack}
      />

      <Tab.Screen
        name={routes.WALLET_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 35,
                  height: 35,
                  backgroundColor: focused ? colors.buttonBg : null,
                  borderRadius: 20,
                }}>
                <TabIcon focused={focused} icon={WALLET} />
              </View>
            </>
          ),
        }}
        component={Wallet}
      />
      <Tab.Screen
        name={routes.ACCOUNT_SCREEN}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 35,
                  height: 35,
                  backgroundColor: focused ? colors.buttonBg : null,
                  borderRadius: 20,
                }}>
                <TabIcon focused={focused} icon={PROFILE} />
              </View>
            </>
          ),
        }}
        component={Account}
      />
    </Tab.Navigator>
  );
}

const RootStackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen
      name={routes.NAVIGATION_AUTH_LOADING_STACK}
      component={MyAuthLoadingStack}
    />
  </Stack.Navigator>
);

const Navigator = () => {
  return (
    <NavigationContainer
      // theme={DarkTheme}
      ref={navigationRef => {
        NavigationService.setTopLevelNavigator(navigationRef);
      }}>
      <RootStackScreen />
    </NavigationContainer>
  );
};

export default Navigator;
