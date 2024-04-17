import React from 'react';
import {Alert, Image, StyleSheet, View} from 'react-native';
import NavigationService from '../navigation/NavigationService';
import {NOTIFICATION_SCREEN, SEARCH_SCREEN} from '../navigation/routes';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {universalPaddingHorizontalHigh} from '../theme/dimens';
import {logo} from '../helper/ImageAssets';
import {AppText, THIRTY_FOUR, YELLOW} from './AppText';
import {
  LIGHT_BELL,
  bell_ic,
  logo_name,
  search_Img,
} from '../screens/helper/imageAssets';

interface HeaderProps {
  title?: string;
  isLogo?: any;
  isSearch: boolean;
  isBellLight: boolean;
  isBell: boolean;
}

const Header = ({
  title,
  isLogo,
  isSearch = true,
  isBellLight = false,
  isBell = true,
}: HeaderProps) => {
  return (
    <View style={[styles.container]}>
      {isLogo && (
        <FastImage
          source={logo_name}
          style={styles.mainLogo}
          resizeMode="contain"
        />
      )}
      {title && (
        <AppText
          type={THIRTY_FOUR}
          color={YELLOW}
          style={[styles.title, {marginTop: 10}]}>
          {title}
        </AppText>
      )}

      {!title && (
        <FastImage resizeMode="contain" source={logo} style={styles.logo} />
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {isSearch && (
          <TouchableOpacityView
            onPress={() => {
              NavigationService.navigate(SEARCH_SCREEN);
            }}>
            <FastImage
              resizeMode="contain"
              source={search_Img}
              style={styles.searchIcon}
            />
          </TouchableOpacityView>
        )}

        {isBell && (
          <TouchableOpacityView
            onPress={() => {
              NavigationService.navigate(NOTIFICATION_SCREEN);
            }}>
            <FastImage
              resizeMode="contain"
              source={bell_ic}
              style={styles.notification}
            />
          </TouchableOpacityView>
        )}

        {isBellLight && (
          <TouchableOpacityView
            onPress={() => {
              NavigationService.navigate(NOTIFICATION_SCREEN);
            }}>
            <FastImage
              resizeMode="contain"
              source={LIGHT_BELL}
              style={styles.notification}
            />
          </TouchableOpacityView>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainLogo: {
    height: 50,
    width: 100,
    marginTop: 4,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: universalPaddingHorizontalHigh,
  },
  logo: {
    height: 50,
    width: 120,
  },
  notification: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  title: {
    marginStart: universalPaddingHorizontalHigh,
  },
  searchIcon: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
});
export {Header};
