import {createSlice} from '@reduxjs/toolkit';
import {WalletSliceProps} from '../helper/types';
export const initialState: WalletSliceProps = {
  walletBalance: 0,
  userWallet: [],
  walletAddress: '',
  adminBankDetails: undefined,
  walletHistory: [],
  tradeHistory: [],
  selectedWalletHistory: undefined,
  selectedTradeHistory: undefined,
  transactionHistory: [],
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletBalance: (state, {payload}) => {
      state.walletBalance = payload;
    },
    setUserWallet: (state, {payload}) => {
      state.userWallet = payload;
    },
    setWalletAddress: (state, {payload}) => {
      state.walletAddress = payload;
    },
    setAdminBankDetails: (state, {payload}) => {
      state.adminBankDetails = payload;
    },
    setWalletHistory: (state, {payload}) => {
      state.walletHistory = payload;
    },
    setTradeHistory: (state, {payload}) => {
      state.tradeHistory = payload;
    },
    setSelectedWalletHistory: (state, {payload}) => {
      state.selectedWalletHistory = payload;
    },
    setSelectedTradeHistory: (state, {payload}) => {
      state.selectedTradeHistory = payload;
    },
    setTransactionHistory: (state, {payload}) => {
      state.transactionHistory = payload;
    },
  },
});
export const {
  setWalletBalance,
  setUserWallet,
  setWalletAddress,
  setAdminBankDetails,
  setWalletHistory,
  setTradeHistory,
  setSelectedWalletHistory,
  setSelectedTradeHistory,
  setTransactionHistory,
} = walletSlice.actions;
export const walletReducer = walletSlice.reducer;
