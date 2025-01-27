import { CapColor, JigsawSize, MugColor, PhotoPrintSize, TShirtColor, TShirtPrintSize, TShirtSize } from "@/context/image-context";
import { SerializedFile } from "@/utils/functions/serialize-file";

export interface ISerializedImage {
  file: SerializedFile;
  photoPrintSize?: PhotoPrintSize;
  isFramed?: boolean;
  mugColor?: MugColor;
  changesColor?: boolean;
  tColor?: TShirtColor;
  tSize?: TShirtSize;
  tPrintSize?: TShirtPrintSize;
  capColor?: CapColor;
  jigsawSize?: JigsawSize;
}
