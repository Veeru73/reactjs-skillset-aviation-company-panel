import axios from "axios";
const baseUrl = process.env.REACT_APP_baseUrl;

const getHeader = () => {
  const authToken = localStorage.getItem("authToken");

  const headers = {
    Authorization: "Bearer " + authToken, //the token is a variable which holds the token
  };

  return headers;
};

const postRequest = async (path, data) => {
  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };
  try {
    const response = await axios({
      method: "POST",
      url: `${baseUrl}${path}`,
      data,
      headers: getHeader(),
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.msg;
    return res;
  }
  return res;
};

const deleteRequest = async (path, data) => {
  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "DELETE",
      url: `${baseUrl}${path}`,
      data,
      headers: getHeader(),
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.msg;
    return res;
  }
  return res;
};

const putRequest = async (path, data) => {
  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "PUT",
      url: `${baseUrl}${path}`,
      data,
      headers: getHeader(),
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.msg;
    return res;
  }
  return res;
};

const getRequest = async (path) => {
  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}${path}`,
      // params: data,
      headers: getHeader(),
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.msg;
    return res;
  }
  return res;
};

const patchRequest = async (path, data) => {
  let res = {
    success: false,
    message: "Something went wrong, please try again later",
  };

  try {
    const response = await axios({
      method: "PATCH",
      url: `${baseUrl}${path}`,
      data,
      headers: getHeader(),
    });
    res = response.data;
  } catch (err) {
    res.message = err.response?.data.message || err.msg;
    return res;
  }
  return res;
};

export const login = async (data) => {
  const path = "/company/auth/login";
  return await postRequest(path, data);
};

export const getPrivileges = async () => {
  const path = "/company/privilege/getPrivileges";
  return await getRequest(path);
}

export const getUsers = async (role, page) => {
  const path = `/company/user/getUsers/${role}?page=${page}`;
  return await getRequest(path);
}

export const addUser = async (data) => {
  const path = `/company/user/addUser`;
  return await postRequest(path, data);
}

export const assignLicenseToStudent = async (studentId) => {
  const path = `/company/user/assignLicenseToStudent/${studentId}`;
  return await putRequest(path);
}

export const getEvents = async (page) => {
  const path = `/vendor/event?page=${page}`;
  return await getRequest(path);
};

export const updateEventStatus = async (eventId, data) => {
  const path = `/admin/event/update-status/${eventId}`;
  return await patchRequest(path, data)
}

export const createArtist = async (data) => {
  const path = `/vendor/user/create-artist`;
  return await postRequest(path, data);
}

export const getArtists = async (page) => {
  const path = `/vendor/user/artists?page=${page}`;
  return await getRequest(path);
}

export const getOrders = async (page) => {
  const path = `/vendor/order?page=${page}`;
  return await getRequest(path);
}

export const getAnalytics = async () => {
  const path = `/vendor/analytics`;
  return await getRequest(path);
}

// export const eventDetail = async (eventId) => {
//   const path = `/vendor/event/${eventId}`;
//   return await getRequest(path);
// }