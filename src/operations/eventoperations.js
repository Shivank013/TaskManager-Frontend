import { apiConnector } from "./apiconnector";
import { eventendpoints } from "./apis";
import { toast } from "react-hot-toast";

const {
    CREATE_EVENT_API,
    UPDATE_DESCRIPTION_API,
    UPDATE_END_TIME_API,
    UPDATE_LOCATION_API,
    UPDATE_REMINDER_TIME_API,
    UPDATE_RECURRING_STATUS_API,
    GET_EVENT_DETAILS_API,
    DELETE_EVENT_API
} = eventendpoints;

export function deleteEvent(eventId) {
    const toastId = toast.loading("Deleting event...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("POST", DELETE_EVENT_API,
                { eventId },
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Event deleted successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Create a new event
export function createEvent(title, description, start, end, location, reminderTime, recurring, recurrencePattern) {
    const toastId = toast.loading("Creating event...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("POST", CREATE_EVENT_API,
                { title, description, start, end, location, reminderTime, recurring, recurrencePattern },
                { Authorization: `Bearer ${token}` }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Event created successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Update event description
export function updateDescription(eventId, description) {
    const toastId = toast.loading("Updating description...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_DESCRIPTION_API, { eventId, description }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Description updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Update event end time
export function updateEndTime(eventId, end) {
    const toastId = toast.loading("Updating end time...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_END_TIME_API, { eventId, end }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("End time updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Update event location
export function updateLocation(eventId, location) {
    const toastId = toast.loading("Updating location...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_LOCATION_API, { eventId, location }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Location updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Update reminder time
export function updateReminderTime(eventId, reminderTime) {
    const toastId = toast.loading("Updating reminder time...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_REMINDER_TIME_API, { eventId, reminderTime }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Reminder time updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Update recurring status and pattern
export function updateRecurringStatus(eventId, recurring, recurrencePattern) {
    const toastId = toast.loading("Updating recurring status...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("PUT", UPDATE_RECURRING_STATUS_API, { eventId, recurring, recurrencePattern }, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Recurring status updated successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}

// Get event details
export function getEventDetails(eventId) {
    const toastId = toast.loading("Fetching event details...");

    return async () => {
        const token = JSON.parse(localStorage.getItem("token"));
        try {
            const response = await apiConnector("GET", `${GET_EVENT_DETAILS_API}/${eventId}`, null, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Event details fetched successfully!");
            toast.dismiss(toastId);
            return response.data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error(`Error: ${error.message}`);
            throw error;
        }
    };
}
