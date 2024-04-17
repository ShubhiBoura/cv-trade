import React from 'react';
import {StyleSheet, View} from 'react-native';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {
  back_ic,
  history,
  logo,
  logoTwo,
  starFillIcon,
  starIcon,
} from '../helper/ImageAssets';
import {universalPaddingHorizontalHigh} from '../theme/dimens';
import NavigationService from '../navigation/NavigationService';
import {AppText, SEMI_BOLD, SIXTEEN} from './AppText';
import {CONVERT_HISTORY_SCREEN} from '../navigation/routes';
import { BACK_ICON, logo_name } from '../screens/helper/imageAssets';

interface ToolbarProps {
  isLogo?: boolean;
  isSecond?: boolean;
  title?: string;
  isThird?: boolean;
  isFavorite?: boolean;
  onAdd?: () => void;
  isFourth?: boolean;
  isFifth?:boolean;
  onFifthPress?: () => void;

}

const Toolbar = ({
  isLogo = true,
  isSecond,
  title,
  isThird,
  isFavorite,
  onAdd,
  isFourth,
  isFifth,
  onFifthPress,
}: ToolbarProps) => {
  return (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {justifyContent: isLogo || isSecond ? 'center' : 'flex-start'},
      ]}>
      <TouchableOpacityView
        style={
          isLogo || isSecond ? styles.backContainer : styles.backContainer2
        }
        onPress={() => NavigationService.goBack()}>
        <FastImage
          source={BACK_ICON}
          style={styles.backIcon}
          resizeMode="contain"
        />
      </TouchableOpacityView>
      {isLogo && !isSecond && (
        <FastImage source={logo_name} style={styles.mainLogo} resizeMode="contain" />
      )}
      {isSecond && (
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {title}
        </AppText>
      )}

      {isThird && (
        <TouchableOpacityView onPress={onAdd} style={styles.starContainer}>
          <FastImage
            source={isFavorite ? starFillIcon : starIcon}
            resizeMode="contain"
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
      {isFourth && (
        <TouchableOpacityView
          activeOpacity={0.5}
          style={styles.starContainer}
          onPress={() => NavigationService.navigate(CONVERT_HISTORY_SCREEN)}>
          <FastImage
            resizeMode="contain"
            source={history}
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
         {isFifth && (
        <TouchableOpacityView
          activeOpacity={0.5}
          style={styles.starContainer}
          onPress={onFifthPress}>
          <FastImage
            resizeMode="contain"
            source={history}
            style={styles.star}
          />
        </TouchableOpacityView>
      )}
    </View>
  );
};

export {Toolbar};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  backContainer: {
    position: 'absolute',
    top: 22,
    padding: universalPaddingHorizontalHigh,
    left: 0,
  },
  backContainer2: {
    padding: universalPaddingHorizontalHigh,
  },
  backIcon: {
    height: 16,
    width: 16,
  },
  mainLogo: {
    height: 50,
    width: 120,
    marginTop: 4,
  },
  title: {
    marginTop: 18,
  },
  star: {
    height: 25,
    width: 25,
  },
  starContainer: {
    position: 'absolute',
    top: 15,
    padding: universalPaddingHorizontalHigh,
    right: 0,
  },
});
