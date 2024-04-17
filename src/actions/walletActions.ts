import {appOperation} from '../appOperation';
import {logger, showError} from '../helper/logger';
import {
  GenerateAddressProps,
  WithdrawCurrencyProps,
  WithdrawInrProps,
} from '../helper/types';
import NavigationService from '../navigation/NavigationService';
import {setLoading} from '../slices/authSlice';
import {
  setAdminBankDetails,
  setTradeHistory,
  setTransactionHistory,
  setUserWallet,
  setWalletAddress,
  setWalletBalance,
  setWalletHistory,
} from '../slices/walletSlice';
import {AppDispatch} from '../store/store';

export const getUserPortfolio = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.user_portfolio();
    if (response.success) {
      dispatch(setWalletBalance(response?.data));
    }
  } catch (e) {
    logger(e);
  } finally {
    // dispatch(setLoading(false));
  }
};

export const getUserWallet = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(setLoading(true));
    const response: any = await appOperation.customer.user_wallet();

    if (response.success) {
      dispatch(setUserWallet(response?.data));
    }
  } catch (e) {
    logger(e);
  } finally {
    // dispatch(setLoading(false));
  }
};
export const generateAddress =
  (data: GenerateAddressProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch(setWalletAddress(''));
      const response: any = await appOperation.customer.generate_address(data);
      // console.log('rs', response);l

      if (response.success) {
        dispatch(setWalletAddress(response?.data));
      } else {
        showError(response?.message);
      }
    } catch (e) {
      logger(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const withdrawCoin =
  (data: WithdrawCurrencyProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.withdraw_currency(data);
      // console.log('rs', response);

      if (response.success) {
        showError(response?.message);
        NavigationService.goBack();
      } else {
        showError(response?.message);
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getAdminBankDetails = () => async (dispatch: AppDispatch) => {
  try {
    const response: any = await appOperation.customer.admin_bank_details();

    if (response.success) {
      dispatch(setAdminBankDetails(response?.data[0]));
    }
  } catch (e) {
    logger(e);
  }
};

export const depositInr = (data: FormData) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const response: any = await appOperation.customer.deposit_inr(data);
    // console.log('rs', response);

    if (response.success) {
      showError(response?.message);
      NavigationService.goBack();
    } else {
      showError(response?.message);
    }
  } catch (e) {
    logger(e);
    showError(e?.message);
  } finally {
    dispatch(setLoading(false));
  }
};

export const getWalletHistory = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(setLoading(true));
    const response: any = await appOperation.customer.wallet_history();

    if (response.success) {
      dispatch(setWalletHistory(response?.data));
    }
  } catch (e) {
    logger(e);
  } finally {
    // dispatch(setLoading(false));
  }
};
export const getTradeHistory = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(setLoading(true));
    const response: any = await appOperation.customer.trade_history();

    if (response.success) {
      dispatch(setTradeHistory(response?.data));
    }
  } catch (e) {
    logger(e);
  } finally {
    // dispatch(setLoading(false));
  }
};

export const verifyDeposit = () => async (dispatch: AppDispatch) => {
  try {
    // dispatch(setLoading(true));
    const response: any = await appOperation.customer.verify_deposit();
    console.log('res', response);

    // if (response.success) {
    //   dispatch(setTradeHistory(response?.data));
    // }
  } catch (e) {
    logger(e);
  }
};

export const withdrawInr =
  (data: WithdrawInrProps) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.withdraw_inr(data);
      // console.log('res', response);

      showError(response?.message);
      if (response?.success) {
        NavigationService.goBack();
      }
    } catch (e) {
      logger(e);
      showError(e?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const getTransactionHistory =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));
      const response: any = await appOperation.customer.transaction_history(id);

      if (response.success) {
        dispatch(setTransactionHistory(response?.data));
      }
    } catch (e) {
      logger(e);
    } finally {
   console.log('Finally');
   
    }
  };
