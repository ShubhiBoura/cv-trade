import React, {useEffect} from 'react';
import { AppSafeAreaView, AppText, ELEVEN, MEDIUM, NORMAL, SECOND, TWELVE, WHITE } from '.';
import { View } from 'react-native';
import { Screen } from '../theme/dimens';
  

interface AppTextProps extends TextProps {
    firstText?:any,
    secondText?:any,
  }
const SpaceBetweenView = ({
    firstText,
    secondText,
}): AppTextProps => {
  
  return (
 <View style={{width:'95%',padding:5,
 justifyContent:'space-between',flexDirection:"row",alignSelf:'center',borderRadius:5,
  paddingHorizontal:10,alignItems:"center"}}>
    <AppText type={TWELVE} weight={MEDIUM} color={SECOND}>{firstText}</AppText>
    <AppText type={ELEVEN} weight={NORMAL} color={WHITE}>{secondText}</AppText>

  </View>
  );
}

export default SpaceBetweenView;


  