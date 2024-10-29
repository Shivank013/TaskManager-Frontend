import { apiConnector } from "./apiconnector";
import { userendpoints } from "./apis";
import { toast } from "react-hot-toast";

const {
  LOGIN_API,
  SENDOTP_API,
  SIGNUP_API,
  CHANGE_PASSWORD_API,
  RESET_PASSWORD_TOKEN_API,
  RESET_PASSWORD_API,
  UPDATE_PROFILE_API,
  DELETE_ACCOUNT_API,
  GET_USER_DETAILS_API,
  UPDATE_DISPLAY_PICTURE_API,
  UPDATE_NOTIFICATION_STATUS_API,
  UPDATE_NICKNAME_API,
} = userendpoints;

// Login API
export function login(email, password) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      toast.dismiss(toastId);
      toast.success("Login successful!");

      return JSON.stringify(response.data.token);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Login failed: ${error.message}`);
      throw error;
    }
  };
}

// Signup API
export function signup(firstName, lastName, email, password, confirmPassword, profession, notification, nickname, otp) {
  const toastId = toast.loading("Loading...");
  
  return async () => {
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        profession,
        notification,
        nickname,
        otp,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Signup successful!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Signup failed: ${error.message}`);
      throw error;
    }
  };
}

// Send OTP API
export function sendOtp(email) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("OTP sent successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Sending OTP failed: ${error.message}`);
      throw error;
    }
  };
}

// Change Password API
export function changePassword(oldPassword, newPassword, confirmNewPassword) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await apiConnector("PUT", CHANGE_PASSWORD_API, {
        oldPassword,
        newPassword,
        confirmNewPassword,
      }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Password changed successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Changing password failed: ${error.message}`);
      throw error;
    }
  };
}

// Generate Reset Password Token API
export function resetPasswordToken(email) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, { email });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Reset password token sent!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Generating reset token failed: ${error.message}`);
      throw error;
    }
  };
}

// Reset Password API
export function resetPassword(password, confirmPassword, token) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Password reset successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Resetting password failed: ${error.message}`);
      throw error;
    }
  };
}

// Update Profile API
export function updateProfile(firstName, lastName, profession) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, {
        firstName,
        lastName,
        profession,
      }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Profile updated successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Updating profile failed: ${error.message}`);
      throw error;
    }
  };
}

// Delete Account API
export function deleteAccount() {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await apiConnector("DELETE", DELETE_ACCOUNT_API, {}, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Account deleted successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Deleting account failed: ${error.message}`);
      throw error;
    }
  };
}

// Get User Details API
export async function getUserDetails() {
  const toastId = toast.loading("Loading...");

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found. Please log in.");
    }
    const parsedToken = JSON.parse(token);

    const response = await apiConnector("GET", GET_USER_DETAILS_API, {}, {
      Authorization: `Bearer ${parsedToken}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.dismiss(toastId);
    toast.success("User details fetched successfully!");
    return response.data; 
  } catch (error) {
    toast.dismiss(toastId);
    toast.error(`Fetching user details failed: ${error.message}`);
    throw error;
  }
}

// Update Display Picture API
export function updateDisplayPicture(image) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await apiConnector("PUT", UPDATE_DISPLAY_PICTURE_API, { image }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Display picture updated successfully!");
      return response;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Updating display picture failed: ${error.message}`);
      throw error;
    }
  };
}

// Update Notification Status API
export function updateNotificationStatus(notification) {
  const toastId = toast.loading("Loading...");

  return async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await apiConnector("PUT", UPDATE_NOTIFICATION_STATUS_API, { notification }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Notification status updated successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Updating notification status failed: ${error.message}`);
      throw error;
    }
  };
}

// Update Nickname API
export function updateNickname(nickname) {
  const toastId = toast.loading("Loading...");

  return async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await apiConnector("PUT", UPDATE_NICKNAME_API, { nickname }, {
        Authorization: `Bearer ${token}`,
      });

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.dismiss(toastId);
      toast.success("Nickname updated successfully!");
      return response.data;
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`Updating nickname failed: ${error.message}`);
      throw error;
    }
  };
}
