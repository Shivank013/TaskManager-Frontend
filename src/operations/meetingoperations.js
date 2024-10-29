import { apiConnector } from "./apiconnector";
import { meetingendpoints } from "./apis";
import { toast } from "react-hot-toast";

const {
    CREATE_MEETING_API,
    UPDATE_DESCRIPTION_API,
    UPDATE_END_TIME_API,
    UPDATE_LOCATION_API,
    UPDATE_MEETING_LINK_API,
    UPDATE_REMINDER_TIME_API,
    GET_MEETING_DETAILS_API,
    DELETE_MEETING_API
} = meetingendpoints;

export function deleteMeeting(eventId) {
    const toastId = toast.loading("Deleting meeting...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("POST", DELETE_MEETING_API, 
                { eventId },
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting deleted successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Create a new meeting
export function createMeeting(title, description, start, end, location, meetingLink, reminderTime) {
    const toastId = toast.loading("Creating meeting...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("POST", CREATE_MEETING_API, 
                { title, description, start, end, location, meetingLink, reminderTime }, 
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting created successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error creating meeting");
        }
    };
}

// Update meeting description
export function updateMeetingDescription(meetingId, description) {
    const toastId = toast.loading("Updating meeting description...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_DESCRIPTION_API, { meetingId, description }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting description updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error updating meeting description");
        }
    };
}

// Update meeting end time
export function updateMeetingEndTime(meetingId, end) {
    const toastId = toast.loading("Updating meeting end time...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_END_TIME_API, { meetingId, end }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting end time updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error updating meeting end time");
        }
    };
}

// Update meeting location
export function updateMeetingLocation(meetingId, location) {
    const toastId = toast.loading("Updating meeting location...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_LOCATION_API, { meetingId, location }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting location updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error updating meeting location");
        }
    };
}

// Update meeting link
export function updateMeetingLink(meetingId, meetingLink) {
    const toastId = toast.loading("Updating meeting link...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_MEETING_LINK_API, { meetingId, meetingLink }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting link updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error updating meeting link");
        }
    };
}

// Update reminder time
export function updateMeetingReminderTime(meetingId, reminderTime) {
    const toastId = toast.loading("Updating meeting reminder time...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_REMINDER_TIME_API, { meetingId, reminderTime }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting reminder time updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error updating meeting reminder time");
        }
    };
}

// Get meeting details
export function getMeetingDetails(meetingId) {
    const toastId = toast.loading("Fetching meeting details...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("GET", `${GET_MEETING_DETAILS_API}/${meetingId}`, null, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Meeting details fetched successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw new Error(error.response?.data?.message || "Error fetching meeting details");
        }
    };
}
