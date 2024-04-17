import React, {useState} from 'react';
import {
  AppSafeAreaView,
  AppText,
  Button,
  FOURTEEN,
  PictureModal,
  SECOND,
  SEMI_BOLD,
  SIXTEEN,
  TEN,
  Toolbar,
  YELLOW,
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
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {doneIcon, uploadIcon} from '../../helper/ImageAssets';
import ImageCropPicker from 'react-native-image-crop-picker';
import {commonStyles} from '../../theme/commonStyles';
import {showError} from '../../helper/logger';
import {errorText} from '../../helper/Constants';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {kycVerification} from '../../actions/accountActions';
import {checkValue} from '../../helper/utility';

const KycStepFive = () => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const kycData = useAppSelector(state => state.account.kycData);
  const [selfie, setSelfie] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const onPressCamera = () => {
    ImageCropPicker.openCamera({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      useFrontCamera: true,
    })
      .then(image => {
        let mime = image?.mime?.split('/');
        let tempphoto = {
          uri: image.path,
          name: 'doc_front' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setSelfie(tempphoto);
      })

      .catch(error => {
        console.log(error);
      });
  };
  const onSubmit = () => {
    if (!selfie) {
      showError(errorText?.selfie);
      return;
    }
    let data = new FormData();
    //step one
    data.append('country', kycData?.country);
    data.append('kyc_type', kycData?.kyc_type);
    //step two
    data.append('first_name', kycData?.first_name);
    data.append('middle_name', kycData?.middle_name);
    data.append('last_name', kycData?.last_name);
    data.append('gender', kycData?.gender);
    data.append('dob', kycData?.dob);
    data.append('mobileNumber', kycData?.mobileNumber);
    data.append('address', kycData?.address);
    data.append('state', kycData?.state);
    data.append('city', kycData?.city);
    data.append('zip_code', kycData?.zip_code);
    //step three
    data.append('pancard_number', kycData?.pancard_number?.toUpperCase());
    data.append(
      'confirm_pancard_number',
      kycData?.confirm_pancard_number?.toUpperCase(),
    );
    data.append('pancard_image', kycData?.pancard_image);

    //step four
    data.append('document_type', kycData?.document_type);
    data.append('document_number', kycData?.document_number);
    data.append('document_front_image', kycData?.document_front_image);
    data.append('document_back_image', kycData?.document_back_image);

    //step five
    data.append('user_selfie', selfie);
    // console.log('data::::::::', JSON.stringify(data));

    dispatch(kycVerification(data));
  };

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={checkValue(languages?.kyc_one)} />
      <KeyBoardAware>
        <AppText type={SIXTEEN} weight={SEMI_BOLD} style={styles.title}>
          {checkValue(languages?.kyc_sixteen)}
        </AppText>
        <View style={styles.divider} />
        <View style={styles.container}>
          <AppText style={styles.gender}>
            {checkValue(languages?.kyc_seventeen)}
          </AppText>
          <AppText color={SECOND} type={TEN}>
            {checkValue(languages?.kyc_nine)}
          </AppText>
          <TouchableOpacityView
            onPress={() => {
              setIsVisible(true);
            }}
            style={styles.fileContainer}>
            <FastImage
              source={selfie ? doneIcon : uploadIcon}
              style={styles.uploadIcon}
              resizeMode="contain"
            />
            <AppText color={SECOND}>
              {selfie
                ? checkValue(languages?.kyc_ten)
                : checkValue(languages?.kyc_eleven)}
            </AppText>
          </TouchableOpacityView>
        </View>
      </KeyBoardAware>
      <View>
        <AppText style={commonStyles.centerText} type={FOURTEEN} color={YELLOW}>
          {checkValue(languages?.kyc_eighteen)}
        </AppText>
        <AppText style={commonStyles.centerText}>
          {checkValue(languages?.kyc_nineteen)}
          {'\n'}
          {checkValue(languages?.kyc_twenty)}
        </AppText>
      </View>
      <Button
        children={checkValue(languages?.kyc_three)}
        onPress={() => onSubmit()}
        containerStyle={styles.button}
      />
      <PictureModal
        isVisible={isVisible}
        onBackButtonPress={() => setIsVisible(false)}
        onPressCamera={() => {
          onPressCamera();
        }}
        isFront
      />
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default KycStepFive;
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
  gender: {
    marginTop: 15,
  },
  fileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    borderWidth: borderWidth,
    borderColor: colors.buttonBg,
    borderStyle: 'dashed',
    borderRadius: 10,
    marginTop: 20,
  },
  uploadIcon: {
    height: 50,
    width: 50,
  },
  button: {
    margin: universalPaddingHorizontalHigh,
  },
});
