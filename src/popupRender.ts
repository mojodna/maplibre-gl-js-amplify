import { Feature, Point, Position } from "geojson";
import { strHasLength } from "./utils";
import { PopupRenderFunction, UnclusteredOptions } from "./types";
import { COLOR_BLACK, COLOR_WHITE, POPUP_BORDER_COLOR } from "./constants";

export function getPopupRenderFunction(
  unclusteredLayerId: string,
  {
    popupBackgroundColor: background = COLOR_WHITE,
    popupBorderColor: borderColor = POPUP_BORDER_COLOR,
    popupBorderWidth: borderWidth = 2,
    popupFontColor: fontColor = COLOR_BLACK,
    popupPadding: padding = 20,
    popupBorderRadius: radius = 4,
    popupTitleFontWeight: fontWeight = "bold",
  }: UnclusteredOptions
): PopupRenderFunction {
  return (selectedFeature: Feature) => {
    let title: string, address: string | Position;

    // Try to get Title and address from existing feature properties
    if (strHasLength(selectedFeature.properties.place_name)) {
      const placeName = selectedFeature.properties.place_name.split(",");
      title = placeName[0];
      address = placeName.splice(1, placeName.length).join(",");
    } else {
      title = "Coordinates";
      address = (selectedFeature.geometry as Point).coordinates;
    }

    return `
      <div class="${unclusteredLayerId}-popup" style="background: ${background}; border: ${borderWidth}px solid ${borderColor}; color: ${fontColor}; border-radius: ${radius}px; padding: ${padding}px; word-wrap: break-word; margin: -10px -10px -15px;">
        <div class="${unclusteredLayerId}-popup-title" style="font-weight: ${fontWeight};">
          ${title}
        </div>
        <div class="${unclusteredLayerId}-popup-address">
          ${address}
        </div>
      </div>`;
  };
}
