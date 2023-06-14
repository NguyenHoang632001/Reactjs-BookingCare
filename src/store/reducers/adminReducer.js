import actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  gender: [],
  roles: [],
  position: [],
  userRedux: [],
  topDoctors: [],
  allDoctors: [],
  detailDoctor: '',
  allTimeSchedule: [],
  priceArr: [],
  provinceArr: [],
  paymentArr: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.gender = action.data;
      state.isLoading = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoading = true;
      state.gender = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.position = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.position = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_START:
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.userRedux = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.userRedux = [];
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.EDIT_USER_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SAVE_DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    //detail doctor
    case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
      state.detailDoctor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_TIME_SCHEDULE_SUCCESS:
      state.allTimeSchedule = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TIME_SCHEDULE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_SUCCESS:
      state.priceArr = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PRICE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_SUCCESS:
      state.provinceArr = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PROVINCE_FAILED:
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_SUCCESS:
      state.paymentArr = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PAYMENT_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
