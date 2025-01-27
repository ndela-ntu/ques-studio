import { SerializedFile } from "./serialize-file";

export const deserializeFile = (serializedFile: SerializedFile): File => {
  const { name, type, content } = serializedFile;

  // Extract the Base64 portion of the content
  const base64String = content.split(",")[1];
  const binaryString = atob(base64String); // Decode Base64
  const arrayBuffer = new Uint8Array(binaryString.length);

  // Convert binary string to Uint8Array
  for (let i = 0; i < binaryString.length; i++) {
    arrayBuffer[i] = binaryString.charCodeAt(i);
  }

  // Recreate the File object
  return new File([arrayBuffer], name, { type });
};
