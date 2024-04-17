import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from 'react-native';
import { AppSafeAreaView, AppText, Toolbar } from '../../common';
import { getTransactionHistory } from '../../actions/homeActions';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import TouchableOpacityView from '../../common/TouchableOpacityView';
import { colors } from '../../theme/colors';

const qsTransaction = () => {
  const dispatch = useAppDispatch();
  const [currentSkip, setCurrentSkip] = useState(0); 
  const [isMoreData, setIsMoreData] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);
  
  useEffect(() => {
    fetchTransactionHistory();
  }, []);
  const fetchTransactionHistory = (skip) => {
    setIsLoading(true);
    const limit = 10;
    dispatch(getTransactionHistory(skip, limit)) 
      .then(response => {
        setIsLoading(false);
        if (response.data.length < limit) {
          setIsMoreData(false);
        }
        if (flatListRef.current) {
          (flatListRef.current as FlatList).scrollToOffset({ animated: true, offset: 0 });
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error fetching transaction history:', error);
      });
  };

  const transaction = useAppSelector(state => state.home.qbsHistory);

  const handleEndReached = () => {
    if (!isLoading && isMoreData) {
      setCurrentSkip(currentSkip + 1);
      fetchTransactionHistory(currentSkip + 1);
    }
  };

  const handleScroll = (event) => {
    if (!isLoading && isMoreData) {
      setCurrentSkip(currentSkip - 1);
      fetchTransactionHistory(currentSkip - 1);
    }
  };

  const _RenderList = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <AppText style={styles.cell}>{item?.from}</AppText>
        <AppText style={styles.cell}>{item?.to}</AppText>
        <AppText style={styles.cell}>{item?.pay_amount}</AppText>
        <AppText style={styles.cell}>{item?.get_amount}</AppText>
        <TouchableOpacityView style={[styles.cell, styles.button,
          {backgroundColor:item?.side==='BUY'? '#38B781':"#EB4335",}]} onPress={() => {}}>
          <AppText style={styles.buttonText}>{item?.side}</AppText>
        </TouchableOpacityView>
      </View>
    );
  };

  return (
    <AppSafeAreaView>
      <Toolbar isLogo={false} title='Transaction History' isSecond isFourth />
      <View style={[styles.row,{paddingHorizontal:10,marginLeft:10}]}>
        <AppText style={styles.header}>From</AppText>
        <AppText style={styles.header}>To</AppText>
        <AppText style={styles.header}>Pay Amt.</AppText>
        <AppText style={styles.header}>Get Amt.</AppText>
        <AppText style={styles.header}>Action</AppText>
      </View>
      <FlatList
        ref={flatListRef}
        data={transaction}
        renderItem={_RenderList}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.flatList}
        onStartReached={handleScroll}
        // onScrollToTop={}
      />
      {isLoading && <ActivityIndicator color={colors.buttonBg} size={'large'}/>}
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:20,
    paddingHorizontal:18
  },
  cell: {
    flex: 1,
    alignSelf: 'center',
  },
  button: {
    borderRadius: 25,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    flexGrow: 1,
  },
});

export default qsTransaction;
