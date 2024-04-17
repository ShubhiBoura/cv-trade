import React from 'react';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {authStyles} from '../screens/auth/authStyles';

const KeyBoardAware = props => {
  return (
    <KeyboardAwareScrollView
      {...props}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1}}
      style={[authStyles.mainContainer, props.style]}
      showsVerticalScrollIndicator={false}>
      {props?.children}
    </KeyboardAwareScrollView>
  );
};

export default KeyBoardAware;
