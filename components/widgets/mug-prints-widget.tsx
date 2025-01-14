import {
  ImageFile,
  MugColor,
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
import { Checkbox } from "../ui/checkbox";
import { Trash } from "lucide-react";
import { useEffect } from "react";

export default function MugPrintsWidget() {
  const {
    selectedImages,
    removeImage,
    updateMugColor,
    updateColorChanges,
  } = useImageContext();

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
                  <label className="text-sm">Mug Color</label>
                    <Select
                      defaultValue={MugColor.WHITE}
                      onValueChange={(value) => {
                        updateMugColor(index, value as MugColor);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print size" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(MugColor)
                          .filter((mugColor) => typeof mugColor === "string")
                          .map((mugColor, index) => (
                            <SelectItem key={index} value={mugColor}>
                              {mugColor}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2 w-48 flex space-x-2.5 items-center">
                    <span className="">Mug changes color?</span>
                    <Checkbox
                      className="text-cinereous"
                      checked={image.changesColor}
                      onCheckedChange={(checked) => {
                        if (typeof checked === "boolean") {
                          updateColorChanges(index, checked);
                        }
                      }}
                    />
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
