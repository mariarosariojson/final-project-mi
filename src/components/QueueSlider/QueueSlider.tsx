import { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function QueueSlider() {
  const [kitchenQueue, setKitchenQueue] = useState(5);

  const changeValue = (event: any, value: any) => {
    setKitchenQueue(value);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider marks aria-label="Minuter" defaultValue={5} max={60} min={5} step={5} valueLabelDisplay="auto" onChange={changeValue} />
      <div className="queue-status">
        <h3>Kötid: {kitchenQueue}minuter</h3>
      </div>
    </Box>
  );
}
