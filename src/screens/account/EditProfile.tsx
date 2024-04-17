import React, {useEffect, useRef, useState} from 'react';
import {
  AppSafeAreaView,
  Button,
  Input,
  PictureModal,
  Toolbar,
} from '../../common';
import KeyBoardAware from '../../common/KeyboardAware';
import {StyleSheet, View} from 'react-native';
import {colors} from '../../theme/colors';
import {borderWidth, universalPaddingHorizontal} from '../../theme/dimens';
import {BASE_URL} from '../../helper/Constants';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import FastImage from 'react-native-fast-image';
import {camera_ic, profile_placeholder_ic} from '../../helper/ImageAssets';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import ImagePicker from 'react-native-image-crop-picker';
import {showError} from '../../helper/logger';
import {editUserProfile} from '../../actions/accountActions';
import {SpinnerSecond} from '../../common/SpinnerSecond';
import {checkValue} from '../../helper/utility';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const [profileImage, setProfileImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [photo, setPhoto] = useState();
  const lastNameInput = useRef(null);
  const phoneInput = useRef(null);
  const userData = useAppSelector(state => state.auth.userData);
  const {
    firstName: _firstName,
    lastName: _lastName,
    mobileNumber,
    profilepicture,
  } = userData ?? '';
  const languages = useAppSelector(state => {
    return state.account.languages;
  });

  useEffect(() => {
    if (_firstName) {
      setFirstName(_firstName);
    }
    if (_lastName) {
      setLastName(_lastName);
    }
    if (mobileNumber) {
      setPhone(mobileNumber);
    }
  }, []);

  const onPressCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        setProfileImage(image.path);
        let mime = image?.mime?.split('/');
        let tempphoto = {
          uri: image.path,
          name: 'profile_image_' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setPhoto(tempphoto);
      })

      .catch(error => {
        console.log(error);
      });
  };
  const onPressGallery = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
    })
      .then(image => {
        setProfileImage(image.path);
        let mime = image?.mime?.split('/');

        let tempphoto = {
          uri: image.path,
          name: 'profile_image_' + image.modificationDate + '.' + mime[1],
          type: image.mime,
        };
        setPhoto(tempphoto);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onSubmit = () => {
    if (!firstName) {
      showError(checkValue(languages?.error_firstName));
      return;
    }
    if (!lastName) {
      showError(checkValue(languages?.error_lastName));
      return;
    }
    let data = new FormData();
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('mobileNumber', phone);
    data.append('emailId', '');
    if (photo) {
      data.append('profilepicture', photo);
    } else {
      data.append('profilepicture', profilepicture);
    }

    dispatch(editUserProfile(data));
  };

  return (
    <AppSafeAreaView>
      <Toolbar isSecond title={checkValue(languages?.edit_one)} />
      <KeyBoardAware>
        <View style={styles.container}>
          <Input
            title={checkValue(languages?.title_firstName)}
            placeholder={checkValue(languages?.place_firstName)}
            value={firstName}
            onChangeText={text => setFirstName(text)}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => lastNameInput?.current?.focus()}
            mainContainer={styles.firstNameInput}
          />
          <Input
            title={checkValue(languages?.title_lastName)}
            placeholder={checkValue(languages?.place_lastName)}
            value={lastName}
            onChangeText={text => setLastName(text)}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => phoneInput?.current?.focus()}
            assignRef={input => {
              lastNameInput.current = input;
            }}
          />
          <Input
            title={checkValue(languages?.title_phone)}
            placeholder={checkValue(languages?.place_userName)}
            value={phone}
            onChangeText={text => setPhone(text)}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={() => onSubmit()}
            keyboardType="numeric"
            editable={false}
            assignRef={input => {
              phoneInput.current = input;
            }}
          />
          <TouchableOpacityView
            onPress={() => setIsVisible(true)}
            style={styles.imageContainer}>
            <View style={styles.imageContainer2}>
              <FastImage
                source={
                  profileImage
                    ? {uri: profileImage}
                    : profilepicture
                    ? {uri: `${BASE_URL}${profilepicture}`}
                    : profile_placeholder_ic
                }
                style={styles.profileImage}
                resizeMode="contain"
              />
              <View style={styles.cameraIconContainer}>
                <FastImage
                  source={camera_ic}
                  resizeMode="contain"
                  style={styles.cameraIcon}
                />
              </View>
            </View>
          </TouchableOpacityView>
        </View>
        <Button
          children={checkValue(languages?.otp_five)}
          onPress={() => onSubmit()}
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
      <SpinnerSecond />
    </AppSafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_fifteen,
    marginTop: 120,
    padding: universalPaddingHorizontal,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
  },
  button: {marginTop: 50},
  imageContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    left: 0,
    top: -50,
    alignSelf: 'center',
  },
  imageContainer2: {
    height: 100,
    width: 100,
    borderRadius: 200,
    borderColor: colors.buttonBg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  firstNameInput: {
    marginTop: 50,
  },
  profileImage: {
    height: 94,
    width: 94,
    borderRadius: 150,
  },
  cameraIcon: {
    height: 29,
    width: 29,
  },
  cameraIconContainer: {
    position: 'absolute',
    height: 32,
    width: 32,
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: 0,
  },
});
