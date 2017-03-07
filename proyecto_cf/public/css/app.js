import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "right-space": {
        "marginRight": 1
    },
    "remove-float": {
        "float": "none"
    },
    "top-space": {
        "marginTop": 1.5
    },
    "big-top-space": {
        "marginTop": 100
    }
});