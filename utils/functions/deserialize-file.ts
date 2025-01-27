import { SerializedFile } from "./serialize-file";

export const deserializeFile = (serializedFile: SerializedFile): File => {
  const { name, type, content, lastModified } = serializedFile;
  
  // Validate the data URL format
  if (!content.startsWith('data:')) {
    throw new Error('Invalid data URL format');
  }
  
  // Extract the Base64 portion of the content
  const [header, base64String] = content.split(',');
  if (!base64String) {
    throw new Error('Invalid data URL format: missing base64 content');
  }
  
  try {
    const binaryString = atob(base64String);
    const arrayBuffer = new Uint8Array(binaryString.length);
    
    // Convert binary string to Uint8Array
    for (let i = 0; i < binaryString.length; i++) {
      arrayBuffer[i] = binaryString.charCodeAt(i);
    }
    
    // Recreate the File object with lastModified
    return new File([arrayBuffer], name, { 
      type,
      lastModified 
    });
  } catch (error) {
    throw new Error('Failed to decode base64 content');
  }
};