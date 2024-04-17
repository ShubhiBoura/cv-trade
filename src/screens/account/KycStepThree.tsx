import React, {useRef, useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  Input,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {Alert, StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showError} from '../../helper/logger';
import {checkValidPanCardNumber, checkValue, getGalleryPermissions} from '../../helper/utility';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_FOUR_SCREEN} from '../../navigation/routes';
import { APP_THEME_BG, doneIcon, uploadIcon } from '../helper/imageAssets';

const KycStepThree = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [pan, setPan] = useState('');
  const [confirmPan, setConfirmPan] = useState('');
  const [panImage, setPanImage] = useState();
  const confirmPanInput = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const onPressCamera = () => {
    ImageCropPicker.openCamera({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        let mime = image?.mime?.split('/');
        let tempphoto = {
          uri: image.path,
          name: 'pan_image' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setPanImage(tempphoto);
      })

      .catch(error => {
        console.log(error);
      });
  };
  const onPressGallery = async () => {
    const permissionGranted = await getGalleryPermissions();

    if (permissionGranted) {
      ImageCropPicker.openPicker({
        multiple: false,
        mediaType: 'photo',
        cropping: true,
      })
        .then(image => {
          let mime = image?.mime?.split('/');

          let tempphoto = {
            uri: image.path,
            name: 'pan_image' + image.modificationDate + '.' + mime[1],
            type: image.mime,
          };
          setPanImage(tempphoto);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Gallery permission not granted');
      // Handle permission denial if needed
    }
  };
  const onNext = () => {
    if (!checkValidPanCardNumber(pan)) {
      showError(errorText.pan);
      return;
    }
    if (!confirmPan) {
      showError(errorText.confirmPan);
      return;
    }
    if (!panImage) {
      showError(errorText.panImage);
      return;
    }
    dispatch(setKycData({key: 'pancard_number', value: pan}));
    dispatch(setKycData({key: 'confirm_pancard_number', value: confirmPan}));
    dispatch(setKycData({key: 'pancard_image', value: panImage}));
    NavigationService.navigate(KYC_STEP_FOUR_SCREEN);
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_seven)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <Input
            title={checkValue(languages?.title_pan)}
            placeholder={checkValue(languages?.place_common)}
            value={pan}
            onChangeText={text => setPan(text)}
            autoCapitalize="characters"
            returnKeyType="next"
            onSubmitEditing={() => confirmPanInput?.current?.focus()}
            maxLength={10}
            inputStyle={{backgroundColor:colors.inputContainColor}}
          />
          <Input
            title={checkValue(languages?.title_confirmPan)}
            placeholder={checkValue(languages?.place_common)}
            value={confirmPan}
            onChangeText={text => setConfirmPan(text)}
            autoCapitalize="characters"
            assignRef={input => {
              confirmPanInput.current = input;
            }}
            returnKeyType="done"
            onSubmitEditing={() => onNext()}
            maxLength={10}
            inputStyle={{backgroundColor:colors.inputContainColor}}

          />
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_twelve)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => setIsVisible(true)}
            style={styles.fileContainer}>
            <FastImage
              source={!panImage ? uploadIcon : doneIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {panImage
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
      </KeyBoardAware>
      <Button
        children={checkValue(languages?.kyc_three)}
        onPress={() => onNext()}
        containerStyle={styles.button}
      />
      <PictureModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onPressGallery={() => {
          onPressGallery();
        }}
        onPressCamera={() => {
          onPressCamera();
        }}
      />
    </AppSafeAreaView>
  );
};

export default KycStepThree;
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  title: {
    marginTop: universalPaddingTop,
  },
  divider: {
    height: borderWidth,
    backgroundColor: colors.inputBorder,
    marginVertical: 15,
  },
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: borderWidth,
    borderColor: colors.textYellow,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 40,
    width: 40,
  
  },
  gender: {
    marginTop: 15,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
