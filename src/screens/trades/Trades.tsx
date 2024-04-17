import {
  AppSafeAreaView, AppText, FIFTEEN, FOURTEEN, GREEN, MEDIUM, SECOND, SEMI_BOLD, SIXTEEN, TEN, TEXT_GRAY, THIRD, THIRTEEN, WHITE,

} from '../../common';
import { FlatList, ImageBackground, StyleSheet, View } from 'react-native';
import { HOME_BG, downIcon, upIcon } from '../../helper/ImageAssets';
import { Screen } from '../../theme/dimens';
import { colors } from '../../theme/colors';
import { useEffect, useRef, useState } from 'react';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import { BASE_URL } from '../../helper/Constants';
import NavigationService from '../../navigation/NavigationService';
import { COIN_DETAILS_SCREEN, STAKING } from '../../navigation/routes';
import FastImage from 'react-native-fast-image';
import { toFixedEight, toFixedThree, twoFixedTwo } from '../../helper/utility';
import { CoinCardProps } from '../../helper/types';
import { useAppSelector } from '../../store/hooks';
import { Launchpad } from './LaunchPad';
import Stacking from '../other/Stacking';
import BtcCoinDetails from './BtcCoinDetails';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Funds } from './OpenOrderFound';
import { ListEmptyComponent, renderItem } from '../home/MarketCoinList';
import { useDispatch } from 'react-redux';
import { setStaking } from '../../slices/homeSlice';
import { getStaking } from '../../actions/homeActions';
import StakingTrade from '../Staking/StakingTrade';
import { APP_THEME_BG } from '../helper/imageAssets';
// import Launchpad from './LaunchPad';

interface MarketCoinListProps {
  activeTab: string;
  activeTabList: any;
}
const Trades = ({ activeTab, activeTabList }: MarketCoinListProps) => {
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getStaking())
  },[])
  const rbSheet = useRef(null);
  const coinData = useAppSelector(state => state.home.coinData);
  const currency = useAppSelector(state => state.home.currency);

  

  const [slideData, setSlideData] = useState([
    {
      id: 0,
      name: 'Spot'
    },
    {
      id: 0,
      name: 'Lanuchpad'
    },
    {
      id: 0,
      name: 'Buy/Sell'
    },
    {
      id: 0,
      name: 'Staking'
    }, {
      id: 0,
      name: 'P2P'
    }, {
      id: 0,
      name: 'Loan'
    }, {
      id: 0,
      name: 'Through Card'
    },
  ])
  const [selectedSlide, setSelectedSlide] = useState(0)
  const [selectedKey, setSelectedKey] = useState('Spot')


  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          setSelectedKey(item?.name)
          setSelectedSlide(index)
        }}
        style={styles.listItemStyle}>
        <AppText type={THIRTEEN} weight={MEDIUM} color={selectedSlide === index ? WHITE : SECOND}>{item?.name}</AppText>
      </TouchableOpacityView>
    )
  }
 

  // const _spotRenderItem = ({ item }: CoinCardProps) => {
  //   let url = `${BASE_URL}${item?.icon_path}`;
  //   // console.log('url:::::', url);

  //   return (
  //     <TouchableOpacityView
  //       style={styles.container}
  //       onPress={() =>
  //         NavigationService.navigate(COIN_DETAILS_SCREEN, { coinDetail: item })
  //       }>
  //       <View style={styles.containerSecond}>
  //         <FastImage
  //           source={{ uri: url }}
  //           resizeMode="contain"
  //           style={styles.icon}
  //         />
  //         <View>
  //           <AppText>{item?.base_currency}</AppText>
  //           <AppText type={TEN} color={SECOND}>
  //             {item?.quote_currency}
  //           </AppText>
  //         </View>
  //       </View>
  //       <View style={styles.containerThird}>
  //         <AppText weight={SEMI_BOLD}>
  //           {currency} {toFixedEight(item?.buy_price)}
  //         </AppText>
  //         <AppText numberOfLines={1} color={SECOND}>
  //           {twoFixedTwo(item?.volume)}
  //         </AppText>
  //       </View>
  //       <View style={styles.containerThird}>
  //         <View
  //           style={[
  //             styles.bedge,
  //             item?.change < 0 && {
  //               backgroundColor: colors.red,
  //             },
  //           ]}>
  //           <FastImage
  //             resizeMode="contain"
  //             source={item?.change >= 0 ? upIcon : downIcon}
  //             tintColor={colors.white}
  //             style={styles.arrow}
  //           />
  //           <AppText>{toFixedThree(item?.change)}</AppText>
  //         </View>
  //       </View>
  //     </TouchableOpacityView>
  //   );
  // };
  const StakingData = useAppSelector(state => state.home.stakingHome);
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
        <View style={styles.emptySpace}></View>
        <View style={styles.listView}>
          <FlatList
            horizontal
            data={slideData}
            renderItem={_renderItem}
          />
        </View>
        {selectedKey === 'Spot' &&
          <BtcCoinDetails />
        
        }

         {selectedKey === 'Lanuchpad' &&
          <Launchpad />
        }
        {selectedKey == 'Buy/Sell' || selectedKey == 'P2P' || selectedKey == 'Loan' || selectedKey == "Through Card" ? <Stacking /> : <></>}
        {selectedKey == 'Staking' &&
           <StakingTrade/>
        }
      <RBSheet
        ref={rbSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={80}
        animationType="none"
        customStyles={{
          container: {
            backgroundColor: colors.inputBorder,
            height: 80,
            borderRadius: 10,
          },
          wrapper: {
            backgroundColor: '#0006',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        {/* {renderColor()} */}
      </RBSheet>
    </AppSafeAreaView>

  );
};

export default Trades;
const styles = StyleSheet.create({
  heading: {
    marginHorizontal: 15
  },
  containerSecond: { flex: 1, flexDirection: 'row' },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    width: Screen.Width - 20,
    alignSelf: "center",
    marginTop: 5
  },
  imgBg: {
    width: Screen.Width, height: Screen.Height,
  },
  listView: {
    width: Screen.Width,
    borderBottomWidth: 1,
    borderColor: colors.textGray,
    paddingBottom: 5
  },
  emptySpace: {
    height: 40
  },
  listItemStyle: {
    marginHorizontal: 12,
  },
  bedge: {
    height: 25,
    borderRadius: 5,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  arrow: {
    height: 8,
    width: 8,
    marginEnd: 5,
    marginBottom: 2,
  },
  containerThird: { flex: 1, alignItems: 'flex-end' },
  icon: {
    height: 30,
    width: 30,
    marginEnd: 10,
  },


  tabConatiner: {
    flexDirection: "row",
    alignItems: "center",
    width: Screen.Width / 2,
    padding: 5,
    alignSelf: "center",
    marginVertical: 25,
    justifyContent: "center"
  },
  firstTab: {
    backgroundColor: colors.buttonBg,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  numberStyle: {
    top: 1
  },
  border: {
    width: 50,
    height: 1,
  },
  otherTab: {
    backgroundColor: colors.white,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"

  }

});
