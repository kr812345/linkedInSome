import fs from 'fs';
import path from 'path';

const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const MAX_FILES = 20;

export const cleanupUploads = async () => {
  try {
    if (!fs.existsSync(UPLOADS_DIR)) {
      return;
    }

    const files = fs.readdirSync(UPLOADS_DIR)
      .filter(file => file !== '.gitkeep') // preserve .gitkeep if any
      .map(file => {
        const filePath = path.join(UPLOADS_DIR, file);
        return {
          name: file,
          path: filePath,
          time: fs.statSync(filePath).mtime.getTime()
        };
      })
      .sort((a, b) => a.time - b.time); // Oldest first

    if (files.length > MAX_FILES) {
      const filesToDelete = files.slice(0, files.length - MAX_FILES);
      filesToDelete.forEach(file => {
        try {
          fs.unlinkSync(file.path);
          console.log(`[FIFO Cleanup] Deleted: ${file.name}`);
        } catch (err) {
          console.error(`[FIFO Cleanup] Error deleting ${file.name}:`, err);
        }
      });
    }
  } catch (error) {
    console.error('[FIFO Cleanup] Error reading uploads directory:', error);
  }
};

export const deleteFile = (filePath) => {
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`[Cleanup] Successfully deleted: ${filePath}`);
        }
    } catch (err) {
        console.error(`[Cleanup] Error deleting file ${filePath}:`, err);
    }
};
