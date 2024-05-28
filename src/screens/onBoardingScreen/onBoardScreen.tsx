import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ImageBackground,
  type ImageRequireSource,
  type ViewToken
} from 'react-native';
import { Text, Button, ContentWrapper } from '../../components';
import { AuthNavigationProp } from '../../navigation/types';
import { apppurple, lightGrey } from '../../constants';

type SplashScreenProps = {
  navigation: AuthNavigationProp<'Splash'>;
};

type SwiperItem = {
  title: string;
  subtitle: string;
  body: string;
  image: ImageRequireSource;
};

const swiperItems: SwiperItem[] = [
  {
    title: 'Budgets',
    subtitle: 'Made Easy',
    body: 'Take Control of Your finances.',
    image: require('../../assets/images/wallet.jpg')
  },
  {
    title: 'Saving',
    subtitle: 'Made Easy',
    body: 'Keep Track of Your Spendings. ',
    image: require('../../assets/images/manwallet.jpg')
  },
  {
    title: 'Saving Goals',
    subtitle: 'Made Easy',
    body: 'Reach your Finiacial Goals Faster.',
    image: require('../../../src/assets/images/mancoin.jpg')
  }
];

export const OnBoardScreen = ({ navigation }: SplashScreenProps) => {
  const [swiperIndex, setSwiperIndex] = useState<number>(0);

  const onIndexChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]?.index) {
        setSwiperIndex(viewableItems[0].index);
      }
    }
  );
  const swiperConfig = useRef({ itemVisiblePercentThreshold: 50 });

  return (
    <ContentWrapper>
      <View style={styles.scrollContainer}>
        <FlatList
          data={swiperItems}
          viewabilityConfig={swiperConfig.current}
          onViewableItemsChanged={onIndexChanged.current}
          horizontal
          renderItem={({ item: { title, subtitle, body, image } }) => (
            <View style={styles.slide}>
              <ImageBackground
                style={styles.slideImage}
                source={image}
                resizeMode='contain'
              />
              <View style={styles.slideContent}>
                <Text fontWeight='700' style={styles.slideTitle}>
                  {title}
                </Text>
                <Text fontWeight='700' style={styles.slideSubtitle}>
                  {subtitle}
                </Text>
                <Text style={styles.slideBody}>{body}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => `${index}`}
          snapToAlignment='start'
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.bottom}>
        <Button
          text='Get Started'
          onPress={() => navigation.navigate('Signup')}
        />
        <View style={styles.indicators}>
          {[...Array(swiperItems.length)].map((e, i) => (
            <View
              key={i}
              style={[
                styles.indicator,
                i === swiperIndex && styles.indicatorActive
              ]}
            />
          ))}
        </View>
      </View>
    </ContentWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1
  },
  bottom: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicators: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  indicator: {
    backgroundColor: apppurple,
    height: 3,
    width: 75,
    marginHorizontal: 2,
    borderRadius: 3
  },
  indicatorActive: {
    backgroundColor: lightGrey
  },
  slide: {
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20
  },
  slideImage: {
    height: 250,
    width: 350,
    alignSelf: 'flex-end'
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center'
    // padding: 20
  },
  slideTitle: {
    fontSize: 40,
    lineHeight: 40
  },
  slideSubtitle: {
    fontSize: 28,
    lineHeight: 28,
    color: apppurple
    // marginTop: 5
  },
  slideBody: {
    textAlign: 'center',
    marginTop: 10
  }
});
