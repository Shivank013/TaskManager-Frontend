const BASE_URL = "https://taskmanager-backend-vi8d.onrender.com"

export const userendpoints = {
  SENDOTP_API: BASE_URL + "/user/sendotp",
  SIGNUP_API: BASE_URL + "/user/signup",
  LOGIN_API: BASE_URL + "/user/login",
  CHANGE_PASSWORD_API: BASE_URL + "/user/changepassword",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/user/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/user/reset-password",
  UPDATE_PROFILE_API: BASE_URL + "/user/update-profile",
  DELETE_ACCOUNT_API: BASE_URL + "/user/delete-account",
  GET_USER_DETAILS_API: BASE_URL + "/user/user-details",
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/user/update-display-picture",
  UPDATE_NOTIFICATION_STATUS_API: BASE_URL + "/user/update-notification-status",
  UPDATE_NICKNAME_API: BASE_URL + "/user/update-nickname",
};

export const eventendpoints = {
  DELETE_EVENT_API: BASE_URL + "/event/delete", 
  CREATE_EVENT_API: BASE_URL + "/event/create",
  UPDATE_DESCRIPTION_API: BASE_URL + "/event/update-description",
  UPDATE_END_TIME_API: BASE_URL + "/event/update-end-time",
  UPDATE_LOCATION_API: BASE_URL + "/event/update-location",
  UPDATE_REMINDER_TIME_API: BASE_URL + "/event/update-reminder-time",
  UPDATE_RECURRING_STATUS_API: BASE_URL + "/event/update-recurring-status",
  GET_EVENT_DETAILS_API: BASE_URL + "/event/details", // Pass eventId as a path parameter
};

export const meetingendpoints = {
  DELETE_MEETING_API: BASE_URL + "/meeting/delete", 
  CREATE_MEETING_API: BASE_URL + "/meeting/create",
  UPDATE_DESCRIPTION_API: BASE_URL + "/meeting/update-description",
  UPDATE_END_TIME_API: BASE_URL + "/meeting/update-end-time",
  UPDATE_LOCATION_API: BASE_URL + "/meeting/update-location",
  UPDATE_MEETING_LINK_API: BASE_URL + "/meeting/update-meeting-link",
  UPDATE_REMINDER_TIME_API: BASE_URL + "/meeting/update-reminder-time",
  GET_MEETING_DETAILS_API: BASE_URL + "/meeting/details", // Pass meetingId as a path parameter
};