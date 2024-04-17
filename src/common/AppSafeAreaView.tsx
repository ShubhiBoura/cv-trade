/* eslint-disable react-native/no-inline-styles */
import React, {ReactNode} from 'react';
import {
  ImageBackground,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HOME_BG, mainBg} from '../helper/ImageAssets';
import {commonStyles} from '../theme/commonStyles';
import { AUTH_BG } from '../screens/helper/imageAssets';

interface AppSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  source?: string;
}

const AppSafeAreaView = ({children , style, source}: AppSafeAreaViewProps) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView
      edges={['right', 'left', 'bottom']}
      style={[
        {
          flex: 1,
          paddingTop: 40,
        },
        style,
      ]}>
      <StatusBar translucent={false} />

      {children}
    </SafeAreaView>
  ) : (
    <View style={[{flex: 1}, style]}>
      <StatusBar
        translucent 
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      <ImageBackground
        source={source ? source: AUTH_BG}
        style={commonStyles.screenSize}
        resizeMode='cover'>
        {children}
      </ImageBackground>
    </View>
  );
};

export {AppSafeAreaView};
