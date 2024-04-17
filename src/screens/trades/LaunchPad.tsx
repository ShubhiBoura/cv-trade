import React from "react";
import { StyleSheet, View } from "react-native";
import { AppText, BOLD, Button, SECOND, SEMI_BOLD, TEN, THIRTEEN, TWENTY, Toolbar, WHITE, YELLOW } from "../../common";
import KeyBoardAware from "../../common/KeyboardAware";
import { colors } from "../../theme/colors";
import { Screen, universalPaddingHorizontal } from "../../theme/dimens";
import FastImage from "react-native-fast-image";
import { useDispatch } from "react-redux";
import { launchpad, swapCoin } from "../../helper/ImageAssets";
import NavigationService from "../../navigation/NavigationService";
import { SWAPNEXBCOIN_SCREEN } from "../../navigation/routes";

const Launchpad = () => {
    const dispatch = useDispatch();
    const handleTo = () => {
        // dispatch(getCoinList())
        // NavigationService.navigate(SWAPNEXBCOIN_SCREEN)
    }
    return (
        <KeyBoardAware>
            <View style={styles.topContainer}>
                <View style={styles.inerContainer}>
                    <View style={styles.inContainer} >
                        <FastImage source={swapCoin} resizeMode="contain" style={styles.swapStyle} />
                        <AppText weight={SEMI_BOLD} type={THIRTEEN}>
                            {'   '}NEXB Coin
                        </AppText>
                        <View style={styles.launchContainer} >
                            <AppText type={TEN} weight={SEMI_BOLD}>
                                Launchpad
                            </AppText>
                        </View>
                    </View>
                    <FastImage source={launchpad} resizeMode="contain" style={styles.launchIcon} />
                </View>
                <View style={styles.detailsCotainer}>
                    <View style={styles.commonRow}>
                        <AppText>
                            Total Supply
                        </AppText>
                        <AppText weight={BOLD}>
                            21 Million
                        </AppText>
                    </View>
                    <View style={styles.commonRow}>
                        <AppText>
                            IEO
                        </AppText>
                        <AppText weight={BOLD}>
                            1 Million
                        </AppText>
                    </View>
                    <View style={styles.commonRow}>
                        <AppText>
                            Price
                        </AppText>
                        <AppText weight={BOLD}>
                            1 USDT/ 1 NEXB
                        </AppText>
                    </View>
                </View>
            </View>
            <View style={[styles.inerContainer, { marginVertical: 10 }]}>
                <AppText>
                    Token Name
                </AppText>
                <AppText weight={BOLD}>
                    NEXB
                </AppText>
            </View>
            <View style={styles.swapContainer}>
                <AppText type={TWENTY} weight={SEMI_BOLD} >
                    NEXB COIN
                </AppText>
                <AppText color={SECOND} type={THIRTEEN}>
                    Swap NEXB Coin Now
                </AppText>
                <View style={styles.layerSwapCoin} >
                    <FastImage source={swapCoin} resizeMode="contain" style={styles.bigSwapIcon} />
                </View>

                <Button
                    isSecond
                    children={'Swap NEXB'}
                    onPress={() => NavigationService.navigate(SWAPNEXBCOIN_SCREEN)}
                    style={{
                        width: '100%', backgroundColor: colors.buttonBg, borderRadius: 30,
                        paddingVertical: 6, marginTop: 20, alignItems: "center",
                        justifyContent: "center",
                    }}
                />
               
            </View>

        </KeyBoardAware>

    )
}
export { Launchpad};
const styles = StyleSheet.create({
    topContainer: {
        borderRadius: 18,
        backgroundColor: colors.inputBackground,
        borderWidth: 1,
        borderColor: colors.inputBorder,
        marginTop: 30
    },
    inerContainer: {
        backgroundColor: colors.inputBackground,
        paddingHorizontal: universalPaddingHorizontal,
        paddingVertical: 10,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.inputBorder
    },
    swapStyle: {
        height: 30,
        width: 30
    },
    inContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    launchContainer: {
        paddingHorizontal: 10,
        paddingVertical: 1,
        backgroundColor: colors.white_fifteen,
        borderRadius: 5,
        marginLeft: 10
    },
    launchIcon: {
        height: 24,
        width: 24
    },
    detailsCotainer: {
        paddingHorizontal: universalPaddingHorizontal,
        paddingVertical: 10
    },
    commonRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 5
    },
    swapContainer: {
        paddingHorizontal: universalPaddingHorizontal,
        paddingVertical: 10,
        backgroundColor: colors.inputBackground,
        borderRadius: 10,
        borderColor: colors.inputBorder,
        alignItems: "center",
        borderWidth: 1,
        width: '100%',
        alignSelf: "center"
    },
    bigSwapIcon: {
        height: 94,
        width: 94,
    },
    button: {
        width: '100%',
        marginTop: 25
    },
    layerSwapCoin: {
        height: 104,
        width: 104,
        borderRadius: 50,
        borderColor: colors.inputBorder,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    }
})