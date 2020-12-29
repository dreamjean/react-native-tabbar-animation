import * as shape from "d3-shape";
import React from "react";
import Svg, { Path } from "react-native-svg";

import { colors } from "../config";

const BarCurve = ({ tabWidth, height, activeBackgroundColor }) => {
  const ruler = tabWidth / 4;
  const getPath = () => {
    const tab = shape.line().curve(shape.curveBasis)([
      [0, 0],
      [ruler, 0],
      [ruler * 2.4, 2],
      [ruler * 3, height],
      [tabWidth, height],
      [ruler * 5, height],
      [ruler * 5.6, 2],
      [ruler * 7, 0],
      [tabWidth * 2, 0],
    ]);

    return `${tab} M ${tabWidth * 2} 0 V ${height} H 0 V 0`;
  };

  const d = getPath();

  return (
    <Svg width={tabWidth * 2} height={height}>
      <Path
        {...{ d }}
        fill={activeBackgroundColor ? activeBackgroundColor : colors.background}
      />
    </Svg>
  );
};

export default BarCurve;
