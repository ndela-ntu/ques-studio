import {
  ImageFile,
  PRINT_SIZES,
  useImageContext,
} from "@/context/widget-context";
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

export default function PhotoPrintsWidget() {
  const { selectedImages, addImages, removeImage, updateIsFramed, updatePrintSize } =
    useImageContext();
    
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
                    <Select
                      defaultValue={image.printSize?.id ?? "a4"}
                      onValueChange={(value) => updatePrintSize(index, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select print size" />
                      </SelectTrigger>
                      <SelectContent>
                        {PRINT_SIZES.map((size) => (
                          <SelectItem key={size.id} value={size.id}>
                            {size.name} ({size.dimensions})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="mt-2 w-32 flex space-x-2.5 items-center">
                    <span className="">Add Frame?</span>
                    <Checkbox
                      className="text-cinereous"
                      checked={image.isFramed}
                      onCheckedChange={(checked) => {
                        if (typeof checked === "boolean") {
                          updateIsFramed(index, checked);
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
