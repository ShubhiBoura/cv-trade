import {AppOperation} from './../../index';
import {CUSTOMER_TYPE} from '../../types';
import {
  AddToFavoriteProps,
  AlertsProps,
  CancelOrderProps,
  ChangePasswordProps,
  CurrencyPreferenceProps,
  DeleteAccountProps,
  DownloadTradeReportProps,
  GenerateAddressProps,
  GetFeeDetailProps,
  OpenOrdersProps,
  PastOrdersProps,
  PlaceOrderProps,
  RatingProps,
  WithdrawCurrencyProps,
  WithdrawInrProps,
} from '../../../helper/types';

export default (appOperation: AppOperation) => ({
  qbs_history: () =>
    appOperation.get('qbs/history', undefined, undefined, CUSTOMER_TYPE),

  banner_list: () =>
    appOperation.get('admin/banner_list', undefined, undefined, CUSTOMER_TYPE),
  get_profile: () =>
    appOperation.get(`user/profile`, undefined, undefined, CUSTOMER_TYPE),
  edit_profile: (data: FormData) =>
    appOperation.put('user/edit-profile', data, CUSTOMER_TYPE),
  change_password: (data: ChangePasswordProps) =>
    appOperation.put('user/change-account-password', data, CUSTOMER_TYPE),
  change_currency: (data: CurrencyPreferenceProps) =>
    appOperation.put('user/currency-preference', data, CUSTOMER_TYPE),
  user_portfolio: () =>
    appOperation.get(
      'wallet/estimated-portfolio',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  user_wallet: () =>
    appOperation.get('wallet/user-wallet', undefined, undefined, CUSTOMER_TYPE),
  generate_address: (data: GenerateAddressProps) =>
    appOperation.put('wallet/generate-address', data, CUSTOMER_TYPE),
  withdraw_currency: (data: WithdrawCurrencyProps) =>
    appOperation.post('wallet/withdrawal-currency', data, CUSTOMER_TYPE),
  admin_bank_details: () =>
    appOperation.get(
      'admin/admin_bank_details',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  deposit_inr: (data: FormData) =>
    appOperation.post('wallet/deposit_inr', data, CUSTOMER_TYPE),
  wallet_history: () =>
    appOperation.get(
      'transaction/wallet-history',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  trade_history: () =>
    appOperation.get(
      'transaction/trade-history',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  verify_deposit: () =>
    appOperation.get(
      'wallet/verify-deposit',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  withdraw_inr: (data: WithdrawInrProps) =>
    appOperation.post('wallet/withdraw_inr', data, CUSTOMER_TYPE),
  kyc_verification: (data: any) =>
    appOperation.post('user/submit-kyc', data, CUSTOMER_TYPE),
  price_alert: (data: AlertsProps) =>
    appOperation.put('notification/price-alert', data, CUSTOMER_TYPE),
  commission_alert: (data: AlertsProps) =>
    appOperation.put('notification/commission-alert', data, CUSTOMER_TYPE),
  trade_setting: (data: AlertsProps) =>
    appOperation.put(
      'exchange/skip-buy-sell-confirmation',
      data,
      CUSTOMER_TYPE,
    ),
  fee_setting: (data: AlertsProps) =>
    appOperation.put('exchange/fee-setting', data, CUSTOMER_TYPE),
  favorite_list: () =>
    appOperation.get(
      'user/favorite-list?type=mobile',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  user_bank_detail: () =>
    appOperation.get(
      'user/get_user_bank_details',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  add_new_bank: (data: FormData) =>
    appOperation.post('user/user_bank_details', data, CUSTOMER_TYPE),
  edit_bank: (data: FormData) =>
    appOperation.post('user/edit-bank-details', data, CUSTOMER_TYPE),
  delete_bank: (data: any) =>
    appOperation.post('user/delete-user-bank', data, CUSTOMER_TYPE),
  add_rating: (data: RatingProps) =>
    appOperation.post('user/rating', data, CUSTOMER_TYPE),
  notification_list: () =>
    appOperation.get(
      'admin/notification-list',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  send_kgin_otp: (data: any) =>
    appOperation.post('user/send-kgin-otp', data, CUSTOMER_TYPE),
  update_kgin: (data: any) =>
    appOperation.post('user/verify-kgin-otp', data, CUSTOMER_TYPE),
  user_refer_code: () =>
    appOperation.get(
      'user/user_refer_code',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  user_refer_count: () =>
    appOperation.get(
      'user/total_refer_count',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  favorite_array: () =>
    appOperation.get('user/favorite-list', undefined, undefined, CUSTOMER_TYPE),
  add_to_favorite: (data: AddToFavoriteProps) =>
    appOperation.post('user/favorite-coin', data, CUSTOMER_TYPE),
  past_orders: (data: PastOrdersProps) =>
    appOperation.post('exchange/past-order', data, CUSTOMER_TYPE),
  open_orders: (data: OpenOrdersProps) =>
    appOperation.post('exchange/historical-data', data, CUSTOMER_TYPE),
  cancel_order: (data: CancelOrderProps) =>
    appOperation.post('exchange/cancel-order', data, CUSTOMER_TYPE),
  place_order: (data: PlaceOrderProps) =>
    appOperation.post('exchange/place-order', data, CUSTOMER_TYPE),
  transaction_history: (id: string) =>
    appOperation.get(
      `mobile/wallet-history?short_name=${id}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  fee_detail: (data: GetFeeDetailProps) =>
    appOperation.post('exchange/coin-details', data, CUSTOMER_TYPE),
  delete_account: (data: DeleteAccountProps) =>
    appOperation.post('user/delete-account', data, CUSTOMER_TYPE),
  download_trade_report: (data: DownloadTradeReportProps) =>
    appOperation.post('user/download-trade-report', data, CUSTOMER_TYPE),
  two_factor_auth_qr: () =>
    appOperation.get(
      'user/generate-google-qr',
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  enable_two_fa: (data: any) =>
    appOperation.put('user/enable-2fa', data, CUSTOMER_TYPE),
  convert_history: () =>
    appOperation.get('swap/history', undefined, undefined, CUSTOMER_TYPE),
  conversion_rate: (data: any) =>
    appOperation.post('swap/convert-token', data, CUSTOMER_TYPE),
  swap_token: (data: any) =>
    appOperation.post('swap/swap-token', data, CUSTOMER_TYPE),

  coin_list: () =>
    appOperation.get('coin/get-coin', undefined, undefined, CUSTOMER_TYPE),

  qs_BuySell: (data: any) =>
    appOperation.post('qbs/quick_buy_sell', data, CUSTOMER_TYPE),

  qs_Hisory: (skip: number, limit: number) =>
    appOperation.get(
      `qbs/history?skip=${skip}&limit=${limit}`,
      undefined,
      undefined,
      CUSTOMER_TYPE,
    ),
  Staking_Home: (data: any) =>
    appOperation.get(
      'staking/availabe_staking',
      undefined, undefined,
      CUSTOMER_TYPE,
    ),
});
