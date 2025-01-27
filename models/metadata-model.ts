import { CapColor, JigsawSize, MugColor, PrintSize, TShirtColor, TShirtPrintSize, TShirtSize } from "@/context/image-context";
import { SerializedFile } from "@/utils/functions/serialize-file";

export interface MetadataModel {
  file: SerializedFile;
  preview: string;
  printSize?: PrintSize;
  isFramed?: boolean;
  mugColor?: MugColor;
  changesColor?: boolean;
  tColor?: TShirtColor;
  tSize?: TShirtSize;
  tPrintSize?: TShirtPrintSize;
  capColor?: CapColor;
  jigsawSize?: JigsawSize;
}
