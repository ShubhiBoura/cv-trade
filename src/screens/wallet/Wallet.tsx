import React, {useEffect} from 'react';
import {
  AppSafeAreaView,
  AppText,
  CustomMaterialMenu,
  FOURTEEN,
  Header,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  THIRTY_FOUR,
  YELLOW,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {FlatList, StyleSheet, View} from 'react-native';
import {
  checkValue,
  dateFormatter,
  depositWithdrawColor,
  toFixedThree,
  twoFixedTwo,
  twoFixedZero,
} from '../../helper/utility';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  Screen,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import {commonStyles} from '../../theme/commonStyles';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import {
  TRADE_HISTORY_DETAILS_SCREEN,
  WALLET_HISTORY_DETAILS_SCREEN,
} from '../../navigation/routes';
import {verifyDeposit} from '../../actions/walletActions';
import {ListEmptyComponent} from '../home/MarketCoinList';
import {
  setSelectedTradeHistory,
  setSelectedWalletHistory,
} from '../../slices/walletSlice';
import {TradeHistoryProps, WalletHistoryProps} from '../../helper/types';
import {getHistoricData} from '../../actions/homeActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import { APP_THEME_BG } from '../helper/imageAssets';

export const RenderTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      renderLabel={({route, focused}) => (
        <AppText type={SIXTEEN} style={{color:focused?colors.lightPurple:colors.secondaryText}}>
          {route.title}
        </AppText>
      )}
      indicatorStyle={{backgroundColor:colors.lightPurple}}
      scrollEnabled={!props.scrollEnabled ? props.scrollEnabled : true}
      tabStyle={[{width: 'auto'}, props.tabStyle]}
      pressColor={colors.transparent}
      style={[styles.tabbar, props.style]}
    />
  );
};

const Funds = () => {
  const dispatch = useAppDispatch();
  const userWallet = useAppSelector(state => state.wallet.userWallet);
  const coinData = useAppSelector(state => state.home.coinData);
  return (
    <KeyBoardAware style={commonStyles.zeroPadding}>
      <View style={styles.fundContainer}>
        {userWallet?.map((item, index) => {
          let space = index % 2 === 0 ? styles.leftBox : styles.rightBox;
          return (
            <View style={[styles.fundSingleBox, space]} key={item._id}>
              <TouchableOpacityView
                onPress={() => {
                  let _currency = coinData.find(e => {
                    return e.base_currency_id === item?.currency_id;
                  });
                  let historicData = {
                    base_currency: _currency?.base_currency,
                    quote_currency: _currency?.quote_currency,
                  };
                  dispatch(getHistoricData(historicData, item));
                }}
                style={styles.fundSingleBoxSecond}>
                <AppText numberOfLines={1} color={SECOND}>
                  {item?.currency}
                </AppText>
                <AppText weight={SEMI_BOLD}>
                  {twoFixedTwo(
                    Number(item?.balance) + Number(item?.locked_balance),
                  )}
                </AppText>
                <AppText color={SECOND} type={TEN}>
                  {item?.short_name}
                </AppText>
              </TouchableOpacityView>
              <CustomMaterialMenu
                isInr={item?.short_name === 'INR'}
                walletDetail={item}
              />
            </View>
          );
        })}
      </View>
    </KeyBoardAware>
  );
};
export interface WalletHistoryRender {
  item: WalletHistoryProps;
}
const WalletHistory = () => {
  const dispatch = useAppDispatch();
  const walletHistory = useAppSelector(state => state.wallet.walletHistory);
  const renderItem = ({item}: WalletHistoryRender) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          dispatch(setSelectedWalletHistory(item));
          NavigationService.navigate(WALLET_HISTORY_DETAILS_SCREEN);
        }}
        style={styles.walletHistorySingle}>
        <View>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {item?.short_name}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {dateFormatter(item?.createdAt)}
          </AppText>
        </View>
        <View style={styles.walletHistorySingleSecond}>
          <AppText color={depositWithdrawColor(item.transaction_type)}>
            {item.transaction_type}
          </AppText>
          <AppText>{toFixedThree(item?.amount)}</AppText>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <View style={styles.walletHistoryContainer}>
      <FlatList
        data={walletHistory}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

interface TradeHistoryRenderProps {
  item: TradeHistoryProps;
}
const TradeHistory = () => {
  const dispatch = useAppDispatch();
  const tradeHistory = useAppSelector(state => state.wallet.tradeHistory);

  const renderItem = ({item}: TradeHistoryRenderProps) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          dispatch(setSelectedTradeHistory(item));
          NavigationService.navigate(TRADE_HISTORY_DETAILS_SCREEN);
        }}
        style={styles.walletHistorySingle}>
        <View>
          <AppText weight={SEMI_BOLD} type={FOURTEEN}>
            {item?.currency}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {dateFormatter(item?.createdAt)}
          </AppText>
        </View>
        <View style={styles.walletHistorySingleSecond}>
          <AppText color={depositWithdrawColor(item.transaction_type)}>
            {item.transaction_type}
          </AppText>
          <AppText>
            {toFixedThree(item?.price)}*
            <AppText>{toFixedThree(item?.quantity)}</AppText>
          </AppText>
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <View style={styles.walletHistoryContainer}>
      <FlatList
        data={tradeHistory}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const Wallet = () => {
  const dispatch = useAppDispatch();
  const walletBalance = useAppSelector(state => state.wallet.walletBalance);
  const currency = useAppSelector(state => state.home.currency);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: checkValue(languages?.wallet_one)},
    {key: 'second', title: checkValue(languages?.wallet_two)},
    {key: 'third', title: checkValue(languages?.wallet_three)},
  ]);

  useEffect(() => {
    dispatch(verifyDeposit());
  }, []);

  const renderScene = SceneMap({
    first: Funds,
    second: WalletHistory,
    third: TradeHistory,
  });

  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Header title={'Wallet'}  isSearch={false} isBell={false} isBellLight={true}/>
      <View style={styles.container}>
        <View style={styles.balanceContainer}>
          <AppText type={FOURTEEN}>
            {checkValue(languages?.wallet_four)}
          </AppText>
          <AppText type={THIRTY_FOUR} weight={SEMI_BOLD}>
            {`${currency}${twoFixedZero(walletBalance)}`}
            <AppText type={THIRTY_FOUR} weight={SEMI_BOLD} color={SECOND}>
              .00
            </AppText>
          </AppText>
        </View>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: Screen.Width}}
          renderTabBar={props => (
            <RenderTabBar {...props} scrollEnabled={true} />
          )}
          // swipeEnabled
        />
      </View>
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default Wallet;
const styles = StyleSheet.create({
  balanceContainer: {
    marginVertical: 20,
  },
  tabbar: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
    borderBottomWidth: 0,
  },
  fundSingleBox: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    width: '48%',
    marginVertical: 5,
    flexDirection: 'row',
  },
  leftBox: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  rightBox: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  fundContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: universalPaddingHorizontalHigh,
  },
  container: {paddingHorizontal: universalPaddingHorizontalHigh, flex: 1},
  menuIcon: {
    height: 15,
    width: 15,
  },
  fundSingleBoxSecond: {
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  menuIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    width: 20,
  },
  walletHistorySingle: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletHistorySingleSecond: {
    alignItems: 'flex-end',
  },
  walletHistoryContainer: {
    marginTop: universalPaddingHorizontalHigh,
  },
});
