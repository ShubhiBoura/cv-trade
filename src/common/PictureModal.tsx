import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../theme/colors';
import {borderWidth} from '../theme/dimens';
import TouchableOpacityView from './TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {AppText} from './AppText';
import {
  checkValue,
  getCameraPermissions,
  getGalleryPermissions,
} from '../helper/utility';
import {showError} from '../helper/logger';
import {errorText} from '../helper/Constants';
import {useAppSelector} from '../store/hooks';
import { camera_ic, gallery_ic } from '../screens/helper/imageAssets';

const PictureModal = ({
  isVisible,
  onBackButtonPress,
  onPressCamera,
  onPressGallery,
  isFront = false,
}) => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={1}
      onBackdropPress={onBackButtonPress}
      onBackButtonPress={onBackButtonPress}>
      <View style={[styles.container]}>
        <TouchableOpacityView
          onPress={() => {
            onBackButtonPress();
            setTimeout(() => {
              getCameraPermissions().then(res => {
                if (res) {
                  onPressCamera();
                } else {
                  showError(errorText.cameraPermission);
                }
              });
            }, 1500);
          }}
          style={styles.singleContainer}>
          <FastImage
            source={camera_ic}
            resizeMode="contain"
            style={styles.icon}
          />
          <AppText>{checkValue(languages?.camera)}</AppText>
        </TouchableOpacityView>
        {!isFront && (
          <TouchableOpacityView
            onPress={() => {
              onBackButtonPress();
              setTimeout(() => {
                getGalleryPermissions().then(res => {
                  if (res) {
                    onPressGallery();
                  } else {
                    showError(errorText.galleryPermission);
                  }
                });
              }, 1500);
            }}
            style={styles.singleContainer}>
            <FastImage
              source={gallery_ic}
              resizeMode="contain"
              style={styles.icon}
            />
            <AppText>{checkValue(languages?.gallery)}</AppText>
          </TouchableOpacityView>
        )}
      </View>
    </Modal>
  );
};

export {PictureModal};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryText,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 30,
  },
  icon: {
    height: 50,
    width: 50,
    marginBottom: 10,
  },
  singleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
