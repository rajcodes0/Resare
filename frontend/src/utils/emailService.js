import api from "./api";

/**
 * Email Service for frontend
 * Handles all email-related operations
 */

export const emailService = {
  /**
   * Subscribe to newsletter
   * @param {string} email - Email address to subscribe
   * @returns {Promise} Response from server
   */
  subscribeNewsletter: async (email) => {
    try {
      const response = await api.post("/api/v1/email/subscribe", { email });
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to subscribe to newsletter" }
      );
    }
  },

  /**
   * Send contact/feedback email
   * @param {Object} data - Contact data
   * @param {string} data.name - Sender's name
   * @param {string} data.email - Sender's email
   * @param {string} data.subject - Email subject
   * @param {string} data.message - Email message
   * @returns {Promise} Response from server
   */
  sendContactMessage: async (data) => {
    try {
      const response = await api.post("/api/v1/email/contact", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send message" };
    }
  },

  /**
   * Share file via email
   * @param {Object} data - Share data
   * @param {string} data.fileId - File ID to share
   * @param {string} data.recipientEmail - Email of recipient
   * @param {string} data.message - Optional personal message
   * @returns {Promise} Response from server
   */
  shareFileViaEmail: async (data) => {
    try {
      const response = await api.post("/api/v1/email/share-file", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to share file" };
    }
  },

  /**
   * Send collaboration invite
   * @param {Object} data - Invite data
   * @param {string} data.recipientEmail - Email of recipient
   * @param {string} data.projectId - Project ID (optional)
   * @param {string} data.message - Optional invite message
   * @returns {Promise} Response from server
   */
  sendCollaborationInvite: async (data) => {
    try {
      const response = await api.post("/api/v1/email/collaborate", data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to send invite" };
    }
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email format
   */
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Get email preferences for current user
   * @returns {Promise} User's email preferences
   */
  getEmailPreferences: async () => {
    try {
      const response = await api.get("/api/v1/email/preferences");
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch email preferences" }
      );
    }
  },

  /**
   * Update email preferences
   * @param {Object} preferences - Email preferences object
   * @returns {Promise} Response from server
   */
  updateEmailPreferences: async (preferences) => {
    try {
      const response = await api.put("/api/v1/email/preferences", preferences);
      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message: "Failed to update email preferences",
        }
      );
    }
  },
};

export default emailService;
