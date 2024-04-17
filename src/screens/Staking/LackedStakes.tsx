import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  AppSafeAreaView,
  AppText,
  FIFTEEN,
  FOURTEEN,
  SECOND,
  TEN,
  TWELVE,
  Toolbar,
} from '../../common';
import {colors} from '../../theme/colors';
import TouchableOpacityView from '../../common/TouchableOpacityView';

const LakedStakes = () => {
  const headers = [
    {key: 'Sr.No', value: 'Sr.No', data: ['1', '2']},
    {key: 'Assets', value: 'Assets', data: ['CTEX', 'BNB']},
    {key: 'Staking Ammount', value: 'Staking Ammount', data: ['2', '1']},
    {key: 'Running Days', value: 'Running Days', data: ['2', '3']},
    {
      key: 'Running Reward Price',
      value: 'Running Reward Price',
      data: ['1', '2'],
    },
    {
      key: 'Staking Reward Rate',
      value: 'Staking Reward Rate',
      data: ['2% Month', '2% Month'],
    },
    {key: 'Staking Duration', value: 'Staking Duration', data: ['90', '95']},
    {key: 'Status', value: 'Status', data: ['PENDING', 'ACTIVE']},
    {key: 'Action', value: 'Action', data: ['Button 1', 'Button 2']},
  ];

  return (
    <AppSafeAreaView>
      <Toolbar isLogo={false} title="Locked Stakes" isSecond />

      <ScrollView horizontal={true} style={styles.container}>
        <View>
          <View style={styles.tableHeader}>
            {headers.map(header => (
              <AppText
                key={header.key}
                type={FIFTEEN}
                color={SECOND}
                style={styles.headerText}>
                {header.value}
              </AppText>
            ))}
          </View>
          {headers[0].data.map((_, index) => (
            <View key={index} style={styles.tableRow}>
              {headers.map(header => (
                <>
                  {header?.key === 'Action' ? (
                    <TouchableOpacityView
                    style={{
                        width: 100,
                        padding:8,
                        backgroundColor: colors.buttonBg,
                        borderRadius: 5,
                        alignItems:'center',justifyContent:"center"
                      }}>
                        <AppText
                      type={TEN}
                      >
                       Break Staking
                    </AppText>
                      </TouchableOpacityView>
                  ) : (
                    <AppText
                      key={header.key}
                      type={FOURTEEN}
                      style={styles.cell}>
                      {header.data[index]}
                    </AppText>
                  )}
                </>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default LakedStakes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    width: 100,
    textAlign: 'center',
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    width: 100,
    textAlign: 'center',
    padding: 10,
    margin: 5,
    color: 'white',
  },
});
