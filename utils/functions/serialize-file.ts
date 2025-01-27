export interface SerializedFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  content: string; // Base64 encoded content
}

export const serializeFile = (file: File): Promise<SerializedFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("FileReader did not return a string"));
        return;
      }

      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        content: reader.result,
      });
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsDataURL(file);
  });
};
