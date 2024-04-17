import React, { useState } from 'react';
import { View, Dimensions, ImageBackground, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CustomDots from './CustomDots';
import { useAppSelector } from '../../store/hooks';
import { BASE_URL } from '../../helper/Constants';
import { universalPaddingHorizontalHigh } from '../../theme/dimens';
import { BannerListProps } from '../../helper/types';
import { BANNER_IMG, languageIcon, upDownIc } from '../../helper/ImageAssets';
const width = Dimensions.get('window').width;
const baseOptions = {
  vertical: false,
  width: width * 0.96,
  height: width / 2.3,
};
interface BannerListRenderItemProps {
  item: BannerListProps;
  index: number;
}

const HomeSlider = () => {
  const bannerList = useAppSelector(state => state.home.bannerList);
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({item, index}: BannerListRenderItemProps) => {
    const imageUrl = `${BASE_URL}${item?.banner_path}`;
    return (
      <ImageBackground
        style={styles.bannerContainer}
        resizeMode={'stretch'}
        source={{uri:imageUrl}}
        key={index?.toString()}
        imageStyle={{borderRadius: 20}}
      />
    );
  };

  return (
    <View style={styles.container}>
        <Carousel
        {...baseOptions}
        data={bannerList}
        renderItem={renderItem}
        onSnapToItem={index => setActiveIndex(index)}
        autoPlay={true}
        pagingEnabled={true}
        autoPlayInterval={2500}
      />
      <View style={styles.dotContainer}>
        {bannerList?.map((data , index) => {
          return (
            <CustomDots
              key={data?._id}
              index={index}
              activeIndex={activeIndex}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dotContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // marginVertical: 10,
  },
  bannerContainer: {
    height: 160,
    marginEnd: universalPaddingHorizontalHigh,
  },
  container: {
    paddingHorizontal: universalPaddingHorizontalHigh,
  },
});

export default HomeSlider;
