import { Alert } from 'react-native';
import { appOperation } from '../appOperation';
import { logger, showError } from '../helper/logger';
import {
  AddToFavoriteProps,
  CancelOrderProps,
  GetFeeDetailProps,
  OpenOrdersProps,
  PastOrdersProps,
  PlaceOrderProps,
} from '../helper/types';
import NavigationService from '../navigation/NavigationService';
import {
  COIN_TRANSACTION_HISTORY_SCREEN,
  CONVERT_HISTORY_SCREEN,
  QS_TRANSACTION,
  WALLET_DETAIL_SCREEN,
} from '../navigation/routes';
import { setLoading } from '../slices/authSlice';
import {
  onCancelOrder,
  setBannerList,
  setCoinList,
  setConversion,
  setConversionHistory,
  setFavoriteArray,
  setFavorites,
  setFeeDetails,
  setHistoricData,
  setNotificationList,
  setOrderData,
  setPastOrders,
  setQbsHistory,
  setStaking,
} from '../slices/homeSlice';
import { AppDispatch } from '../store/store';
import { getUserWallet } from './walletActions';

export const getBannerList = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.banner_list();
    if (response.success) {
      const bannerData = response?.data?.filter(
        banner => banner?.status === 'Active',
      );
      dispatch(setBannerList(bannerData));
    }
  } catch (e) {
    logger(e);
  }
};
export const getQbsHistory = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.qbs_history();
    console.log(response, '===response');
    if (response?.success) {
      dispatch(setQbsHistory(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};



export const getFavorites = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.favorite_list();
    if (response.success) {
      dispatch(setFavorites(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};

export const getNotificationList = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.notification_list();
    if (response.success) {
      dispatch(setNotificationList(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};

export const getFavoriteArray = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.favorite_array();
    if (response.success) {
      dispatch(setFavoriteArray(response?.data?.pairs));
    }
  } catch (e) {
    logger(e);
  }
};

export const addToFavorites =
  (data: AddToFavoriteProps) => async (dispatch: AppDispatch) => {
    try {
      const response: any = await appOperation.customer.add_to_favorite(data);

      if (response.success) {
        dispatch(setFavoriteArray(response?.data));
        dispatch(getFavoriteArray());
        dispatch(getFavorites());
      }
    } catch (e) {
      logger(e);
    }
  };

export const getPastOrders =
  (data: PastOrdersProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.past_orders(data);
      if (response.success) {
        dispatch(setPastOrders(response?.data));
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getHistoricData =
  (data: OpenOrdersProps, item: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setHistoricData([]));
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.open_orders(data);
      if (response.success) {
        dispatch(setHistoricData(response?.data));
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
      NavigationService.navigate(WALLET_DETAIL_SCREEN, { item });
    }
  };

export const cancelOrder =
  (data: CancelOrderProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.cancel_order(data);

      if (response.success) {
        showError(response?.message);
        dispatch(onCancelOrder(data.order_id));
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const placeOrder =
  (data: PlaceOrderProps, setVisible: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.place_order(data);

      if (response.success) {
        dispatch(setOrderData(data));
        showError(response?.message);
        setVisible(true);
      } else {
        showError(response?.message);
        // setVisible(true);
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
      // setVisible(true);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getFeeDetails =
  (data: GetFeeDetailProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.fee_detail(data);

      if (response.success) {
        dispatch(setFeeDetails(response?.data));
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getConversionHistory = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.convert_history();
    // console.log('res:::::getConversionHistory:::::', response);

    if (response?.code == 200) {
      dispatch(setConversionHistory(response?.data));
    }
  } catch (e) {
    logger('getConversionHistory', e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const conversion = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.conversion_rate(data);
    // console.log('res:::::conversion:::', response);
    if (response?.success) {
      dispatch(setConversion(response?.data));
    } else {
      dispatch(setConversion(''));
    }

    // console.log(response, 'res');
  } catch (e) {
    console.log('error', e);
    showError(e.message);
    dispatch(setConversion(''));
  } finally {
    dispatch(setLoading(false));
  }
};

export const swapToken = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.swap_token(data);
    // console.log('res:::::swapToken:::', response);
    if (response?.success) {
      showError(response?.message);
      NavigationService.navigate(CONVERT_HISTORY_SCREEN);
      dispatch(getUserWallet());
    }
    // dispatch(setConversion(response.data));
    // console.log(response, 'res');
  } catch (e) {
    console.log('error', e);
    showError(e.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getCoinList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.coin_list();
    if (response?.success) {
      dispatch(setCoinList(response.data));
    }
  } catch (e) {
    logger('getCoinList', e);
  } finally {
    dispatch(setLoading(false));
  }
};


export const QS_Buy = (data: any , setChange:void ) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await appOperation.customer.qs_BuySell(data);
    if (response?.success) {
      showError(response?.message);
      dispatch(getTransactionHistory())
    } else {
      dispatch(setConversion(''));
      showError(response?.message);
    }

  } catch (e) {
    showError(e?.message);
    console.log('error', e);
  }
};

export const getTransactionHistory = (skip: number, limit: number) => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.qs_Hisory(skip, limit);
    // console.log('res:::::getTransactionHistory:::::', response);
    if (response?.success) {
      dispatch(setQbsHistory(response?.data));
    }
  } catch (e) {
    logger(e);
  }
};

export const getStaking= (data: any ) => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.Staking_Home(data);
    if (response?.success) {
      dispatch(setStaking(response?.data))
    }
  } catch (e) {
  }
};




