import { Container } from '@mui/material';
import { CirclePicker, GithubPicker } from 'react-color';
import { colors } from "../Colors";

export function ColorSelector(props) {
  const { color, handleColorChanged } = props
  if (colors) {
    const fullColor = colors.find((c) => c.name === color);
    const rgb = fullColor ? fullColor.rgb.toLowerCase() : undefined;
    const colorHexes = colors.map((c) => {
      return c.rgb.toLowerCase();
    });
    return (
      <Container
        style={{
          backgroundColor: "rgb(220,220,220)",
          marginTop: "2px",
          marginBottom: "2px",
          padding: "4px",
        }}
      >
        <CirclePicker
          color={rgb}
          colors={colorHexes}
          width="100%"
          triangle="hide"
          circleSize={25}
          circleSpacing={2}
          onChangeComplete={handleColorChanged}
        />
      </Container>
    );
  } else {
    return <></>;
  }
}