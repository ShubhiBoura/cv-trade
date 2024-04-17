import React from 'react';
import {
  AppSafeAreaView,
  AppText,
  SECOND,
  SEMI_BOLD,
  TEN,
  Toolbar,
} from '../../common';
import {FlatList, StyleSheet, View} from 'react-native';
import {commonStyles} from '../../theme/commonStyles';
import {
  universalPaddingHorizontal,
  universalPaddingHorizontalHigh,
} from '../../theme/dimens';
import {useAppSelector} from '../../store/hooks';
import moment from 'moment';
import {colors} from '../../theme/colors';
import {checkValue} from '../../helper/utility';
import { APP_THEME_BG } from '../helper/imageAssets';

const ListEmptyComponent = () => {
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  return (
    <View style={commonStyles.center}>
      <AppText color={SECOND}>{checkValue(languages?.nothing)}</AppText>
    </View>
  );
};

const Notification = () => {
  const notificationList = useAppSelector(state => state.home.notificationList);
  const languages = useAppSelector(state => {
    return state.account.languages;
  });
  const renderItem = ({item}) => {
    return (
      <View style={styles.renderContainer}>
        <View style={styles.renderContainerSecond}>
          <View style={styles.renderContainerThird}>
            <AppText weight={SEMI_BOLD}>{item.title}</AppText>
            {item?.message?.map(e => {
              return <AppText type={TEN}>{e?.description}</AppText>;
            })}
          </View>
        </View>
        <AppText color={SECOND} type={TEN}>
          {moment(item.createdAt).fromNow()}
        </AppText>
      </View>
    );
  };

  return (
    <AppSafeAreaView source={APP_THEME_BG}>
      <Toolbar isSecond title={checkValue(languages?.notification_one)} />
      <FlatList
        data={notificationList}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={commonStyles.flexGrow}
      />
    </AppSafeAreaView>
  );
};

export default Notification;
const styles = StyleSheet.create({
  renderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: universalPaddingHorizontalHigh,
    paddingVertical: universalPaddingHorizontal,
    marginVertical: universalPaddingHorizontal,
    borderBottomWidth: 0.4,
    borderBottomColor: colors.thirdBg,
  },
  icon: {
    height: 50,
    width: 50,
    marginEnd: 10,
  },
  renderContainerSecond: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  renderContainerThird: {
    flex: 1,
  },
});
