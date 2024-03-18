import { useState, useEffect } from "react";
import { Dimensions, ScaledSize } from "react-native";

type Dimension = {
  dWidth: number;
  dHeight: number;
};

export function useDimension(): Dimension {
  const [dimensions, setDimensions] = useState<Dimension>(getDimensions());

  useEffect(() => {
    const onChange = (result: { window: ScaledSize }) => {
      setDimensions(getDimensions());
    };

    // Adding event listener
    const subscription = Dimensions.addEventListener("change", onChange);

    // Cleanup
    return () => subscription?.remove();
  }, []);

  return dimensions;
}

function getDimensions(): Dimension {
  const { width: dWidth, height: dHeight } = Dimensions.get("window");
  return { dWidth, dHeight };
}

export default useDimension;
