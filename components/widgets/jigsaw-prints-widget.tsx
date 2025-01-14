import {
  CapColor,
  ImageFile,
  JigsawSize,
  PRINT_SIZES,
  useImageContext,
} from "@/context/image-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Trash } from "lucide-react";

export default function JigsawPrintsWidget() {
  const { selectedImages, removeImage, updateJigsawSize } = useImageContext();

  return (
    <div>
      {selectedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Selected Images</h3>
          <div className="space-y-2">
            {selectedImages.map((image, index) => (
              <div
                key={`${image.file.name}-${index}`}
                className="flex items-center p-3 bg-gray-50 rounded-lg"
              >
                <div className="aspect-square w-16 h-16">
                  <img
                    src={image.preview}
                    alt={image.file.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {image.file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {(image.file.size / 1024).toFixed(1)} KB
                  </p>
                  <div className="mt-2 w-48">
                    <label className="text-sm">Jigsaw Size</label>

                    <Select
                      defaultValue={JigsawSize.MEDIUM}
                      onValueChange={(value) =>
                        updateJigsawSize(index, value as JigsawSize)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print size" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(JigsawSize)
                          .filter((size) => typeof size === "string")
                          .map((size, index) => (
                            <SelectItem key={index} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <button
                  onClick={() => removeImage(index)}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <Trash className="text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
