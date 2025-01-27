export interface SerializedFile {
  name: string;
  type: string;
  size: number;
  content: string; // Base64 encoded content
}

export const serializeFile = (file: File): Promise<SerializedFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        content: reader.result as string, // Base64 string
      });
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file."));
    };

    reader.readAsDataURL(file); // Reads the file as Base64
  });
};
