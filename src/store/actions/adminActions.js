import actionTypes from './actionTypes';
import {
  getAllcodeServices,
  editUser,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailDoctorService,
} from '../../services/userServices';
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });
import { ToastContainer, toast } from 'react-toastify';
import { getUser } from '../../services/userServices';
import { createNewUser } from '../../services/userServices';
import { deleteUserServices } from '../../services/userServices';

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllcodeServices('GENDER');
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(' errro by redux', error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllcodeServices('POSITION');

      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(' errro by redux', error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllcodeServices('ROLE');
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(' errro by redux', error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);

      if (res && res.errCode === 0) {
        toast.success('Create new user success');
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else if (res && res.errCode === 4) {
        toast.error('Create User Failed Because email exited');
        dispatch(saveUserFailed());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      console.log('save neww user erro', error);
    }
  };
};
export const saveUserSuccess = () => ({ type: 'CREATE_USER_SUCCESS' });

export const saveUserFailed = () => ({
  type: 'CREATE_USER_FAILED',
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_ALL_USER_START });
      let res = await getUser('ALL');
      // let res1 = await getTopDoctorHomeService('1');
      // console.log('res1', res1);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchAllUserFailed());
      console.log(' errro by redux', error);
    }
  };
};
export const fetchAllUserSuccess = (data) => ({
  type: 'FETCH_ALL_USER_SUCCESS',
  data: data,
});
export const fetchAllUserFailed = () => ({
  type: 'FETCH_ALL_USER_FAILED',
});
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_ALL_USER_START });
      let res = await deleteUserServices(userId);

      if (res && res.errCode === 0) {
        toast.success('Delete user succesfull');
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());

      console.log(' errro by redux', error);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: 'DELETE_USER_SUCCESS',
});
export const deleteUserFailed = () => ({
  type: 'DELETE_USER_FAILED',
});

export const editUserStart = (data) => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_ALL_USER_START });
      let res = await editUser(data);
      console.log('check res edit', res);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(editUserStart());
      }
    } catch (error) {
      dispatch(editUserFailed());
      console.log(' errro by redux', error);
    }
  };
};
export const editUserSuccess = () => ({
  type: 'EDIT_USER_SUCCESS',
});
export const editUserFailed = () => ({
  type: 'EDIT_USER_FAILED',
});

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService(8);

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_TOP_DOCTOR_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_TOP_DOCTOR_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_TOP_DOCTOR_FAILED',
      });
    }
  };
};
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      console.log('check data form all doctors', res);
      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_ALL_DOCTOR_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_ALL_DOCTOR_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_ALL_DOCTOR_FAILED',
      });
    }
  };
};
export const saveDetailDoctorInfor = (dataDoctor) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(dataDoctor);
      console.log('check save user', res);
      if (res && res.errCode === 0) {
        toast.success('save detail doctor success');
        dispatch({
          type: 'SAVE_DETAIL_DOCTOR_SUCCESS',
        });
      } else {
        toast.error('save detail doctor failed');
        dispatch({
          type: 'SAVE_DETAIL_DOCTOR_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      toast.error('save detail doctor failed');
      dispatch({
        type: 'SAVE_DETAIL_DOCTOR_FAILED',
      });
    }
  };
};
export const fetchDetailDoctor = (idDoctor) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailDoctorService(idDoctor);

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_DETAIL_DOCTOR_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_DETAIL_DOCTOR_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_DETAIL_DOCTOR_FAILED',
      });
    }
  };
};
export const fetchTimeSchedule = (inputType) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeServices(inputType);

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_TIME_SCHEDULE_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_TIME_SCHEDULE_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_TIME_SCHEDULE_FAILED',
      });
    }
  };
};
export const fetchPrice = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeServices('PRICE');

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_PRICE_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_PRICE_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_PRICE_FAILED',
      });
    }
  };
};
export const fetchProvince = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeServices('PROVINCE');

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_PROVINCE_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_PROVINCE_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_PROVINCE_FAILED',
      });
    }
  };
};
export const fetchPayment = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllcodeServices('PAYMENT');

      if (res && res.errCode === 0) {
        dispatch({
          type: 'FETCH_PAYMENT_SUCCESS',
          data: res.data,
        });
      } else {
        dispatch({
          type: 'FETCH_PAYMENT_FAILED',
        });
      }
    } catch (error) {
      console.log('Failed from redux');
      dispatch({
        type: 'FETCH_PAYMENT_FAILED',
      });
    }
  };
};
