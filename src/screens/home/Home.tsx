import React, {useEffect, useState} from 'react';
import {AppSafeAreaView, Header} from '../../common';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {
  getBannerList,
  getCoinList,
  getFavoriteArray,
  getFavorites,
  getNotificationList,
  getQbsHistory,
  getTransactionHistory,
} from '../../actions/homeActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import HomeSlider from './HomeSlider';
import CoinSlider from './CoinSlider';
import HomeMenuBar from './HomeMenuBar';
import KeyBoardAware from '../../common/KeyboardAware';
import {commonStyles} from '../../theme/commonStyles';
import CoinList from './CoinList';
import {
  getAdminBankDetails,
  getTradeHistory,
  getUserPortfolio,
  getUserWallet,
  getWalletHistory,
} from '../../actions/walletActions';
import {
  getUserBankDetails,
  getUserProfile,
  getUserReferCode,
  getUserReferCount,
} from '../../actions/accountActions';
import {connect} from 'socket.io-client';
import {
  setCoinData,
  setRandom,
  setSocket,
  setSocketLoading,
} from '../../slices/homeSlice';
import {BASE_URL} from '../../helper/Constants';
import { Alert, Linking, Platform } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import VersionCheck from 'react-native-version-check';
import { APP_THEME_BG, AUTH_BG } from '../helper/imageAssets';

const socket = connect(BASE_URL, {
  transports: ['websocket'],
  forceNew: true,
  autoConnect: true,
});
const Home = () => {
  const dispatch = useAppDispatch();
  const socketLoading = useAppSelector(state => state.home.socketLoading);
  const coinData = useAppSelector(state => state.home.coinData);
  const random = useAppSelector(state => state.home.random);

  useEffect(() => {
    socket?.on('connect', () => {
      console.log('connected to socket server');
      dispatch(setSocket(socket));
      dispatch(setRandom(Math.random()));
    });
    return () => {
      socket?.off('connect');
    };
  }, []);

  useEffect(() => {
    if (coinData?.length === 0) {
      socket?.emit('message', {message: 'market'});
      console.log('event name message emitted');
    }
  }, [coinData, random]);

  useEffect(() => {
    socket?.on('message', res => {
      dispatch(setCoinData(res));
      dispatch(setSocketLoading(false));
    });
    return () => {
      socket?.off('message');
    };
  }, []);

  useEffect(() => {
    socket?.on('disconnect', () => {
      console.log('disconnect to socket server');
    });
    return () => {
      socket?.off('disconnect');
    };
  }, []);
  
  useEffect(() => {
    dispatch(getBannerList());
    dispatch(getUserPortfolio());
    dispatch(getUserWallet());
    dispatch(getAdminBankDetails());
    dispatch(getTradeHistory());
    dispatch(getWalletHistory());
    dispatch(getFavorites());
    dispatch(getUserBankDetails());
    dispatch(getNotificationList());
    dispatch(getUserReferCode());
    dispatch(getUserReferCount());
    dispatch(getFavoriteArray());
    dispatch(getCoinList());
 
  }, []);

  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Header  isLogo/>
      {!socketLoading && (
        <KeyBoardAware style={commonStyles.zeroPadding}>
          <HomeSlider /> 
          <CoinSlider />
          <HomeMenuBar />
          <CoinList />
        </KeyBoardAware>
      )}
      {/* <SpinnerSecond loading={socketLoading} /> */}
    </AppSafeAreaView>
  );
};

export default Home;
