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
    },
    "large-padding": {
        "paddingTop": 10,
        "paddingRight": 15,
        "paddingBottom": 10,
        "paddingLeft": 15
    },
    "black": {
        "backgroundColor": "rgb(43, 43, 43)"
    },
    "white-text": {
        "color": "#fff"
    },
    "white": {
        "backgroundColor": "white"
    },
    "nav": {
        "textAlign": "right"
    },
    "nav ul li": {
        "display": "inline-block",
        "marginRight": 1,
        "fontSize": 1.2
    },
    "nav li a": {
        "color": "white"
    },
    "nav li a:hover": {
        "color": "white"
    },
    "border": {
        "border": "solid 1px #eee"
    },
    "tr:nth-of-type(odd)": {
        "backgroundColor": "#eee"
    }
});