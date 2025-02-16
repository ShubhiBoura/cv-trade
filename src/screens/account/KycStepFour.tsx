import React, {useState} from 'react';
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
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {
  borderWidth,
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
  universalPaddingTop,
} from '../../theme/dimens';
import {PickerSelect} from '../../common/PickerSelect';
import {documentType} from '../../helper/dummydata';
import {errorText, placeHolderText, titleText} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';
import {showError} from '../../helper/logger';
import {
  checkValidAdharCardNumber,
  checkValidDrivingLicenseNumber,
  checkValue,
  setAadharNumber,
} from '../../helper/utility';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {setKycData} from '../../slices/accountSlice';
import NavigationService from '../../navigation/NavigationService';
import {KYC_STEP_FIVE_SCREEN} from '../../navigation/routes';
import { APP_THEME_BG, doneIcon, uploadIcon } from '../helper/imageAssets';

const KycStepFour = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const [docType, setDocType] = useState('Aadhaar');
  const [docNumber, setDocNumber] = useState('');
  const [_docNumber, _setDocNumber] = useState('');
  const [docFront, setDocFront] = useState();
  const [docBack, setDocBack] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isFront, setIsFront] = useState(true);

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
          name: 'doc_front' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        isFront ? setDocFront(tempphoto) : setDocBack(tempphoto);
      })

      .catch(error => {
        console.log(error);
      });
  };
  const onPressGallery = () => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        let mime = image?.mime?.split('/');

        let tempphoto = {
          uri: image.path,
          name: 'doc_front' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        isFront ? setDocFront(tempphoto) : setDocBack(tempphoto);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onNext = () => {
    if (!docType) {
      showError(errorText.docType);
      return;
    }

    if (!checkValidAdharCardNumber(docNumber) && docType === 'Aadhaar') {
      showError(errorText.aadhar);
      return;
    }
    if (
      !checkValidDrivingLicenseNumber(docNumber) &&
      docType === 'Driving License'
    ) {
      showError(errorText.license);
      return;
    }
    if (!docNumber) {
      showError(errorText.docNumber);
      return;
    }
    if (!docFront) {
      showError(errorText.docFront);
      return;
    }
    if (!docBack) {
      showError(errorText.docBack);
      return;
    }
    dispatch(setKycData({key: 'document_type', value: docType}));
    dispatch(setKycData({key: 'document_number', value: _docNumber}));
    dispatch(setKycData({key: 'document_front_image', value: docFront}));
    dispatch(setKycData({key: 'document_back_image', value: docBack}));
    NavigationService.navigate(KYC_STEP_FIVE_SCREEN);
  };
  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_thirteen)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <PickerSelect
            data={documentType}
            value={docType}
            onChange={setDocType}
            placeholder={{
              label: checkValue(languages?.place_docType),
              value: '',
            }}
            style={{backgroundColor:'transparent'}}
            label={titleText.docType}
          />
          <Input
            title={`${docType}*`}
            placeholder={checkValue(languages?.place_common)}
            value={docNumber}
            onChangeText={text => {
              if (docType === 'Aadhaar') {
                setDocNumber(setAadharNumber(text));
                _setDocNumber(text);
              } else {
                setDocNumber(text);
                _setDocNumber(text);
              }
            }}
            autoCapitalize="none"
            returnKeyType="done"
          />
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_fourteen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
              setIsFront(true);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={docFront ? doneIcon : uploadIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {docFront
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_fifteen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
              setIsFront(false);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={docBack ? doneIcon : uploadIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {docBack
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
        <Button
          children={checkValue(languages?.kyc_three)}
          onPress={() => onNext()}
          containerStyle={styles.button}
        />
      </KeyBoardAware>
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

export default KycStepFour;
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
    height: 0.3,
    backgroundColor: colors.white,
    marginVertical: 15,
  },
  gender: {
    marginTop: 15,
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
    height: 50,
    width: 50,
  },
  button: {
    marginVertical: universalPaddingHorizontalHigh,
  },
});
