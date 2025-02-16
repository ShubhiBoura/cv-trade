import React, {useEffect, useRef, useState} from 'react';
import {
  AMBER,
  AppSafeAreaView,
  AppText,
  BLACK,
  BOLD,
  Button,
  EIGHTEEN,
  ELEVEN,
  FIFTEEN,
  FOURTEEN,
  MEDIUM,
  NORMAL,
  RED,
  SECOND,
  SIXTEEN,
  TEN,
  THIRD,
  THIRTEEN,
  TWELVE,
  TWENTY,
  Toolbar,
  WHITE,
  YELLOW,
} from '../../common';
import {FlatList, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import {Screen, borderWidth, smallButtonHeight, universalPaddingHorizontal} from '../../theme/dimens';
import {colors} from '../../theme/colors';
import FastImage from 'react-native-fast-image';
import {
  LINE_IMG,
  REMOVE,
  bitcoinIcon,
  downIcon,
  upIcon,
} from '../../helper/ImageAssets';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import SpaceBetweenView from '../../common/SpaceBetweenView';
import NavigationService from '../../navigation/NavigationService';
import {STAKING_SUCCESS} from '../../navigation/routes';
import { useDispatch } from 'react-redux';
import { getStaking } from '../../actions/homeActions';
import RBSheet from 'react-native-raw-bottom-sheet';
import { BASE_URL } from '../../helper/Constants';

const Stacking = ({route}) => {
  const stakingData = route?.params?.stakingCoinDetail
  const sheetRef = useRef(null);
  const [stakingDay, setStakingDay] = useState('');
  const [selectedOption, setSelectedOption] = useState('Crypto');
  const [collapse, setCollapse] = useState('Crypto');
  const _faqRenderItem = ({item, index}) => {
    return (
      <TouchableOpacityView
        onPress={() => {
          setCollapse(index);
        }}
        style={[
          styles.cardBlackContainer,
          {
            paddingHorizontal: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{width: '80%', marginTop: 5}}>
          <AppText weight={MEDIUM} type={FOURTEEN}>
            How Staking Work?
          </AppText>
          {collapse === index && (
            <AppText weight={MEDIUM} color={SECOND} type={TWELVE}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </AppText>
          )}
        </View>
        <View style={styles.arrowIconStyleContainer}>
          <FastImage
            source={collapse === index ? upIcon : downIcon}
            resizeMode="contain"
            tintColor={'#fff'}
            style={styles.arrowIconStyle}
          />
        </View>
      </TouchableOpacityView>
    );
  };
  return (
    <AppSafeAreaView>
      <Toolbar isLogo={false} title="Staking" isSecond />
      <View style={styles.tabConatiner}>
        <View style={styles.firstTab}>
          <AppText weight={MEDIUM} type={FOURTEEN} style={styles.numberStyle}>
            1
          </AppText>
        </View>
        <View
          style={[styles.border, {backgroundColor: colors.buttonBg}]}></View>
        <View style={[styles.otherTab, {backgroundColor: colors.buttonBg}]}>
          <AppText
            weight={MEDIUM}
            color={FOURTEEN}
            type={FOURTEEN}
            style={styles.numberStyle}>
            2
          </AppText>
        </View>
        <View style={[styles.border, {backgroundColor: colors.white}]}></View>
        <View style={styles.otherTab}>
          <AppText
            weight={MEDIUM}
            color={THIRD}
            type={FOURTEEN}
            style={styles.numberStyle}>
            3
          </AppText>
        </View>
      </View>
      <ScrollView>
        <AppText weight={MEDIUM} type={FIFTEEN} style={styles.heading}>
          Staking Ether
        </AppText>
        <AppText weight={MEDIUM} type={TWELVE} style={styles.heading}>
          Staking ETH and receive sETH while staking
        </AppText>
        <View style={styles.cardContain}>
          <AppText weight={MEDIUM} type={TWELVE} color={SECOND}>
            Available to Stake
          </AppText>
          <AppText
            weight={MEDIUM}
            type={FOURTEEN}
            color={WHITE}
            style={styles.availableText}>
            0.0 {stakingData?.short_name}
          </AppText>

          <FastImage
            source={LINE_IMG}
            resizeMode="contain"
            style={styles.lineImg}
          />
          <View style={styles.cardSubContain}>
            <View>
              <AppText weight={MEDIUM} type={TWELVE} color={SECOND}>
                Staked Amount
              </AppText>
              <AppText
                weight={MEDIUM}
                type={FOURTEEN}
                color={WHITE}
                style={styles.CardSubContainText}>
                0.0 {stakingData?.short_name}
              </AppText>
            </View>
            <View>
              <AppText weight={MEDIUM} type={TWELVE} color={SECOND}>
                Intrest Amount
              </AppText>
              <AppText
                weight={MEDIUM}
                type={FOURTEEN}
                color={WHITE}
                style={styles.CardSubContainText}>
                 {stakingData?.month_percentage}%
              </AppText>
            </View>
          </View>
          <View style={styles.cardBlackContainer}>
            <View style={styles.option1}>
              <TouchableOpacityView
                onPress={() => {
                  setSelectedOption('Crypto');
                }}
                style={[
                  {
                    borderColor:
                      selectedOption == 'Crypto' ? colors.buttonBg : null,
                    marginLeft: 10,
                  },
                  styles.cryptoOption,
                ]}>
                <AppText weight={MEDIUM} type={THIRTEEN} color={AMBER}>
                  Crypto
                </AppText>
              </TouchableOpacityView>

              {/* <TouchableOpacityView
                onPress={() => {
                  setSelectedOption('Fiat');
                }}
                style={[
                  {
                    borderColor:
                      selectedOption == 'Fiat' ? colors.buttonBg : null,
                    marginLeft: 15,
                  },
                  styles.cryptoOption,
                ]}>
                <AppText weight={MEDIUM} type={FOURTEEN} color={SECOND}>
                  Fiat
                </AppText>
              </TouchableOpacityView> */}
            </View>
            <AppText style={{marginLeft:12,marginTop:15}}>Amount</AppText>
            <View style={styles.inputContainer}>
              <View style={styles.getCurrencyContain}>
                <FastImage
                  source={{uri:stakingData?.icon_path}}
                  resizeMode="contain"
                  style={styles.currencyImg}
                />
              </View>
              <TextInput
                placeholder="Amount"
                placeholderTextColor={colors.secondaryText}
                keyboardType="decimal-pad"
                onChangeText={e => {}}
                style={styles.inputStyle}></TextInput>
            </View>
            <AppText style={{marginLeft:12,marginTop:15}}>Staking Days</AppText>
            <TouchableOpacityView onPress={() => { sheetRef?.current?.open() }} style={styles.inputContainer}>
               <AppText style={{marginHorizontal:10}} type={ELEVEN} color={stakingDay? WHITE: SECOND}>{stakingDay|| 'Enter No of staking days'}</AppText>
            </TouchableOpacityView>
            <AppText
              weight={NORMAL}
              type={TEN}
              color={RED}   
              style={styles.maxChar}>
              Max : 00000
            </AppText>
            <Button
              onPress={() => {
                NavigationService.navigate(STAKING_SUCCESS);
              }}
              
              containerStyle={styles.continueBtn}
              isSecond
              children="Continue"
              titleStyle={{color: colors.black}}
            />
            <View style={{paddingTop: 10}}>
              <SpaceBetweenView
                firstText={'You will Receive'}
                secondText={'0 st ETH'}
              />
              <SpaceBetweenView
                firstText={'Exchange Rate'}
                secondText={'1 ETH = 1 stETH'}
              />
              <SpaceBetweenView
                firstText={'Transaction Cost'}
                secondText={'$ 1.67'}
              />
              <SpaceBetweenView firstText={'Reward Fee'} secondText={'10%'} />
            </View>
            <View
              style={{
                width: '92%',
                padding: 5,
                borderRadius: 5,
                alignSelf: 'center',
              }}>
              <AppText type={FIFTEEN}>Summary</AppText>
              <AppText type={TEN} color={SECOND}>
                Total Est. Rewards 2.5%
              </AppText>
            </View>
            <View style={{paddingTop: 5}}>
              <SpaceBetweenView
                firstText={'First Distribution Date '}
                secondText={'2024-04-09'}
              />
              <SpaceBetweenView
                firstText={'Interest End Date '}
                secondText={'2024-04-09'}
              />
           
              <SpaceBetweenView firstText={'Reward Fee'} secondText={'10%'} />
            </View>
          </View>
        </View>
        <View style={styles.cardContain}>
          <AppText weight={MEDIUM} type={TWELVE} color={WHITE}> 
            FAQ
          </AppText>
          <FlatList data={[1, 2, 3]} renderItem={_faqRenderItem} />
        </View>
      </ScrollView>

      <RBSheet
          ref={sheetRef}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={80}
          animationType="none"
          customStyles={{
            container: styles.sheetContainer,
            wrapper: {
              backgroundColor: '#0006',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
          }}>
          <View style={styles.currencyHeader}>
            <View style={styles.emptyView}></View>
            <AppText type={THIRTEEN} weight={MEDIUM}>Available Days</AppText>
            <TouchableOpacityView onPress={() => { sheetRef?.current?.close() }}>
              <FastImage source={REMOVE} style={styles.removeImg} />
            </TouchableOpacityView>
          </View>
          <View style={styles.cryptoSheetContainer}>
            <FlatList
              data={stakingData?.available_days}
              renderItem={({ item, index }) => {
                // let imgPath = `${BASE_URL}${item?.icon_path}`;
                return (
                  <TouchableOpacityView onPress={() => {setStakingDay(item), sheetRef?.current?.close()}} style={styles.dropDownContainer}>
                    <AppText>{item}</AppText>
                  </TouchableOpacityView>
                )
              }}
            />
          </View>
        </RBSheet>
    </AppSafeAreaView>
  );
};

export default Stacking;
const styles = StyleSheet.create({
  dropDownContainer: {
    marginTop: 10,
    height: smallButtonHeight,
    borderWidth: borderWidth,
    borderColor: colors.blackFive,
    borderRadius: 5,
    paddingHorizontal: universalPaddingHorizontal,
    // backgroundColor: colors.blackFive,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
},
 
  cryptoSheetContainer: {
    padding: 5, width: Screen.Width,
    marginTop: 25,
    flex: 1
  },
  removeImg: {
    height: 25,
    width: 25
  },
  emptyView: {
    height: 25, width: 25
  },
  currencyHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#27282C",
    position: "absolute",
    width: Screen.Width,
    justifyContent: "space-between", paddingHorizontal: 15
  },
  sheetContainer: {
    backgroundColor: colors.lightBlack,
    height: Screen.Height / 2.7,
    borderRadius: 10,
  },
  continueBtn: {
    width: '95%',
    alignSelf: 'center',
  },
  arrowIconStyleContainer: {
    width: '20%',
    alignItems: 'flex-end',
    right: 5,
    marginTop: 5,
  },
  arrowIconStyle: {
    width: 15,
    height: 15,
  },
  maxChar: {
    alignSelf: 'flex-end',
    marginEnd: 10,
    marginVertical: 5,
  },
  currencyImg: {
    width: 25,
    height: 25,
    bottom: 3,
  },
  cryptoOption: {
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  option1: {
    flexDirection: 'row',
  },
  cardBlackContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.black,
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  CardSubContainText: {
    marginTop: 3,
  },
  cardSubContain: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lineImg: {
    width: Screen.Width - 25,
    height: 20,
    alignSelf: 'center',
  },
  availableText: {
    marginTop: 10,
    left: 3,
  },
  cardContain: {
    backgroundColor: colors.blackFive,
    width: Screen.Width - 25,
    padding: 10,
    borderRadius: 10,
    marginVertical: 25,
    alignSelf: 'center',
  },
  getCurrencyContain: {
    width: '15%',
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputStyle: {
    width: '85%',
    height: 45,
    paddingHorizontal: 10,
    color: colors.white,
    fontSize:13
  },
  inputContainer: {
    width: '95%',
    height: 45,
    borderRadius: 5,
    borderColor: '#2C383E',
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row',
 alignItems:'center',
    marginTop:3
  },
  heading: {
    marginHorizontal: 20,
  },
  tabConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Screen.Width / 2,
    padding: 5,
    alignSelf: 'center',
    marginVertical: 25,
    justifyContent: 'center',
  },
  firstTab: {
    backgroundColor: colors.buttonBg,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberStyle: {
    top: 1,
  },
  border: {
    width: 50,
    height: 1,
  },
  otherTab: {
    backgroundColor: colors.white,
    width: 25,
    height: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
