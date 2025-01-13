import {
    ImageFile,
    MugColor,
    PRINT_SIZES,
    TShirtColor,
    TShirtPrintSize,
    TShirtSize,
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
  
  export default function TShirtPrintsWidget() {
    const {
      selectedImages,
      removeImage,
      updateTColor,
      updateTSize,
      updateTPrintSize,
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
                      <Select
                        defaultValue={TShirtColor.WHITE}
                        onValueChange={(value) => {
                          updateTColor(index, value as TShirtColor);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select print size" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TShirtColor)
                            .filter((shirtColor) => typeof shirtColor === "string")
                            .map((shirtColor, index) => (
                              <SelectItem key={index} value={shirtColor}>
                                {shirtColor}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-2 w-48">
                      <Select
                        defaultValue={TShirtSize.M}
                        onValueChange={(value) => {
                          updateTSize(index, value as TShirtSize);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select print size" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TShirtSize)
                            .filter((shirtSize) => typeof shirtSize === "string")
                            .map((shirtSize, index) => (
                              <SelectItem key={index} value={shirtSize}>
                                {shirtSize}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-2 w-48">
                      <Select
                        defaultValue={TShirtPrintSize.POCKET}
                        onValueChange={(value) => {
                          updateTPrintSize(index, value as TShirtPrintSize);
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select print size" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(TShirtPrintSize)
                            .filter((tPrintSize) => typeof tPrintSize === "string")
                            .map((tPrintSize, index) => (
                              <SelectItem key={index} value={tPrintSize}>
                                {tPrintSize}
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
  