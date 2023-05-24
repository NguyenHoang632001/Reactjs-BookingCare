import axios from '../axios';
const handleLoginUser = (email, password) => {
  return axios.post('/api/login', { email, password });
};
const getUser = (inputId) => {
  return axios.get(`/api/get-user?id=${inputId}`);
};
const createNewUser = (data) => {
  return axios.post('/api/create-new-user', {
    ...data,
  });
};
const deleteUserServices = (userId) => {
  console.log('id from delete sẻvice', userId);
  return axios.post('/api/delete-user', { id: userId });
};
const editUser = (data) => {
  return axios.put('/api/edit-user', {
    id: data.id,

    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    gender: data.gender,
    roleId: data.roleId,
    phoneNumber: data.phoneNumber,
    positionId: data.positionId,
    avatar: data.avatar,
  });
};
const getAllcodeServices = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctor = (data) => {
  return axios.post('/api/save-infor-doctors', data);
};
const getDetailDoctorService = (id) => {
  return axios.get(`/api/get-detail-a-doctor?id=${id}`);
};
const bulkCreateScheduleService = (data) => {
  return axios.post('/api/bulk-create-schedule', data);
};
const getScheduleByDateService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraDoctorById = (doctorId) => {
  return axios.get(`api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getScheduleForUserService = (timeType, date) => {
  return axios.get(
    `api/get-schedule-for-user?timeType=${timeType}&date=${date}`
  );
};
export {
  handleLoginUser,
  getUser,
  createNewUser,
  deleteUserServices,
  editUser,
  getAllcodeServices,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailDoctorService,
  bulkCreateScheduleService,
  getScheduleByDateService,
  getExtraDoctorById,
  getScheduleForUserService,
};
