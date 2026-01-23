/**
 * DOWNLOAD FILE CONTROLLER
 * At this point:
 * - authMiddleware already ran
 * - checkFileAccess already ran
 * - req.file is guaranteed to exist and be allowed
 */
export const downloadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file || !file.document?.url) {
      return res.status(404).json({
        message: "File data not available",
      });
    }

    // Option 1: Redirect to Cloudinary (recommended)
    return res.redirect(file.document.url);

    // Option 2 (later): Stream file manually if needed
  } catch (error) {
    return res.status(500).json({
      message: "Failed to download file",
      error: error.message,
    });
  }
};
