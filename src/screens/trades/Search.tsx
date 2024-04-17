import React, {useEffect, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  FOURTEEN,
  MEDIUM,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  SearchInput,
} from '../../common';
import {useAppSelector} from '../../store/hooks';
import {CoinCardProps, CoinDataProps} from '../../helper/types';
import {BASE_URL, placeHolderText} from '../../helper/Constants';
import {ImageBackground, StyleSheet, View} from 'react-native';
import KeyBoardAware from '../../common/KeyboardAware';
import {Screen, universalPaddingHorizontalHigh} from '../../theme/dimens';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import NavigationService from '../../navigation/NavigationService';
import {COIN_DETAILS_SCREEN} from '../../navigation/routes';
import FastImage from 'react-native-fast-image';
import {checkValue, toFixedEight} from '../../helper/utility';
import { HOME_BG } from '../../helper/ImageAssets';
import { APP_THEME_BG } from '../helper/imageAssets';

const Search = () => {
  const hotCoins = useAppSelector(state => state.home.coinData);
  const coinData = useAppSelector(state => state.home.coinData);
  const currency = useAppSelector(state => state.home.currency);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [value, setValue] = useState('');
  const [list, setList] = useState<CoinDataProps[]>([]);

  useEffect(() => {
    getData();
  }, [value]);

  const getData = () => {
    if (value === '') {
      setList(hotCoins);
    } else {
      let filterData = coinData.filter(data => {
        return (
          data?.base_currency?.toLowerCase().indexOf(value?.toLowerCase()) >
            -1 ||
          data?.quote_currency?.toLowerCase().indexOf(value?.toLowerCase()) > -1
        );
      });
      setList(filterData);
    }
  };

  const renderItem = ({item}: CoinCardProps) => {
    return (
      <TouchableOpacityView
        key={item?._id}
        onPress={() =>
          NavigationService.navigate(COIN_DETAILS_SCREEN, {coinDetail: item})
        }>
        <View style={styles.coinContainer}>
          <FastImage
            resizeMode="contain"
            style={styles.coinLogo}
            source={{uri: `${BASE_URL}${item?.icon_path}`}}
          />
          <View style={{flex: 1}}>
            <AppText weight={MEDIUM} type={FOURTEEN}>
              {item.base_currency}
            </AppText>
            <AppText color={SECOND}>{item.quote_currency}</AppText>
          </View>
          <AppText weight={MEDIUM} type={FOURTEEN}>
            {currency} {toFixedEight(item?.buy_price)}
          </AppText>
        </View>
      </TouchableOpacityView>
    );
  };

  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <ImageBackground  source={HOME_BG} style={styles.imgBg} >
      <SearchInput
      cancelBtn={true}
        value={value}
        onChangeText={setValue}
        placeholder={placeHolderText.search}
        autoCapitalize="none"
        returnKeyType="done"
        onSubmitEditing={() => getData()}
        onFocus={true}
      />
      <KeyBoardAware>
        <AppText weight={SEMI_BOLD} type={SIXTEEN} style={styles.text}>
          {checkValue(languages?.top_search)}
        </AppText>
        {list?.map((item: CoinDataProps, index: number) => {
          return renderItem({item, index});
        })}
      </KeyBoardAware>
    </ImageBackground>
    </AppSafeAreaView>

  );
};

export default Search;
const styles = StyleSheet.create({
  imgBg:{
    width:Screen.Width,height:Screen.Height 
  },
  text: {
    marginVertical: universalPaddingHorizontalHigh,
  },
  coinContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coinLogo: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
    marginEnd: 10,
  },
});
