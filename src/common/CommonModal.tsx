import React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {colors} from '../theme/colors';
import {borderWidth, universalPaddingHorizontalHigh} from '../theme/dimens';
import {AppText, EIGHTEEN, RED, SEMI_BOLD} from './AppText';
import {Button} from './Button';

interface CommonModalProps {
  isVisible: boolean;
  title: string;
  onBackButtonPress: () => void;
  onPressNo: (event: GestureResponderEvent) => void;
  onPressYes: () => void;
  subtitle?: string;
}

const CommonModal = ({
  isVisible,
  onBackButtonPress,
  onPressYes,
  onPressNo,
  title,
  subtitle,
}: CommonModalProps) => {
  return (
    <ReactNativeModal
      animationOut={'slideOutDown'}
      isVisible={isVisible}
      backdropOpacity={1}
      onBackdropPress={onBackButtonPress}
      onBackButtonPress={onBackButtonPress}>
      <View style={styles.container}>
        <AppText type={EIGHTEEN} weight={SEMI_BOLD} style={styles.title}>
          {title}
        </AppText>
        <View style={styles.buttonContainer}>
          <Button
            children="No"
            onPress={onPressNo}
            containerStyle={styles.noButton}
            titleStyle={styles.buttonTitle}
          />
          <Button
            children="Yes"
            onPress={onPressYes}
            containerStyle={styles.yesButton}
            titleStyle={styles.buttonTitle}
          />
        </View>
        <AppText  style={[styles.title,{color:'#FF545E'}]}>
          {subtitle}
        </AppText>
      </View>
    </ReactNativeModal>
  );
};

export {CommonModal};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondaryText,
    borderWidth: borderWidth,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    padding: universalPaddingHorizontalHigh,
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
  title: {
    textAlign: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontSize: 14,
  },
  noButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: colors.secondBorder,
    borderWidth: borderWidth,
    marginEnd: 10,
  },
  yesButton: {
    flex: 1,
    backgroundColor: '#FF545E',
    marginStart: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
});
