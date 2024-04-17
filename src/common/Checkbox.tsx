import React from 'react';
import TouchableOpacityView from './TouchableOpacityView';
import {StyleSheet, View} from 'react-native';
import {borderWidth} from '../theme/dimens';
import {colors} from '../theme/colors';
import FastImage from 'react-native-fast-image';
import {checkIc} from '../helper/ImageAssets';
import {RIGHT_ICON} from '../screens/helper/imageAssets';
import {WHITE} from './AppText';

const Checkbox = ({value, onChange, source}) => {
  return (
    <TouchableOpacityView style={styles.container} onPress={onChange}>
      <View style={[styles.innerView, source&&{backgroundColor:colors.lightPurple,}]}>
        {source && (
          <FastImage
            source={source}
            tintColor={colors.white}
            resizeMode="contain"
            style={styles.icon}
          />
        )}
      </View>
    </TouchableOpacityView>
  );
};

export {Checkbox};
const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderWidth: borderWidth,
    borderColor: colors.lightPurple,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    height: 20,
    width: 20,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 12,
    width: 12,
  },
});
