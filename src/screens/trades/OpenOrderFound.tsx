import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { OpenOrders } from "../home/CoinTransactionHistory";
import { useAppSelector } from "../../store/hooks";
import { Screen } from "../../theme/dimens";
import { RenderTabBar } from "../wallet/Wallet";
import { ListEmptyComponent, renderItem } from "../home/MarketCoinList";
 const Funds = () => {
    const coinData = useAppSelector(state => state.home.coinData);
    const currency = useAppSelector(state => state.home.currency);
    return coinData?.length !== 0 ? (
        <View style={{ marginTop: 20 }}>
            {coinData?.map(item => {
                return <View key={item?._id}>{renderItem({ item, currency })}</View>;
            })}
        </View>
    ) : (
        <ListEmptyComponent />
    )
}
const OpenOrderFound = ({ setGetIndex }: any) => {
    const openOrders = useAppSelector(state => state.home.openOrders);
    const coinData = useAppSelector(state => state.home.coinData);
    const coinDetail = coinData[0] ?? "";
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Open Orders' },
        { key: 'second', title: 'Funds' },
    ]);
    useEffect(() => {
        setGetIndex(index)
    }, [index])
    const renderScene = SceneMap({
        first: () => <OpenOrders coinDetail={coinDetail} openOrders={openOrders} />,
        second: () => <Funds />,
    });
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Screen.Width }}
            renderTabBar={props => (
                <RenderTabBar
                    {...props}
                />
            )}
        />
    )
};
export default OpenOrderFound;
const styles = StyleSheet.create({

})