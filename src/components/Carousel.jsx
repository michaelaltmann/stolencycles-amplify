import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";

function Carousel(props) {
  const { images } = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const changeSlide = () => {
    if (activeStep < maxSteps - 1) handleNext();
    else setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1, display: "inline" }}>
      {images[activeStep].label && (
        <Paper
          square
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            height: 50,
            pl: 2,
            bgcolor: "background.default",
          }}
        >
          <Typography>{images[activeStep].label}</Typography>
        </Paper>
      )}
      {images.map((step, index) => (
        <div key={step.label}>
          {Math.abs(activeStep - index) == 0 ? (
            <CardMedia
              onClick={changeSlide}
              sx={{
                height: 200,
              }}
              image={step.imgPath}
            />
          ) : null}
        </div>
      ))}
    </Box>
  );
}

export default Carousel;
