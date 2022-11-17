import { Flag, ThumbDown, ThumbUp } from "@mui/icons-material";
import { Button, IconButton, Stack, Tooltip } from "@mui/material";
import { borderColor } from "@mui/system";
import { useState } from "react";
import { MatchStatus } from "../models";
import MatchRepository from "../repositories/MatchRepository";
import { AdvertisementView } from "./AdvertisementView";
import { TheftView } from "./TheftView";

export function MatchView(props) {
  const [match, setMatch] = useState(props.item);
  const { status } = match;

  async function handleThumbDown() {
    const draft = { ...match, status: MatchStatus.MATCHED };
    setMatch(draft);
    await MatchRepository.update(draft);
  }
  async function handleThumbUp() {
    const draft = { ...match, status: MatchStatus.MISMATCHED };
    setMatch(draft);
    await MatchRepository.update(draft);
  }

  const styles = {
    card: {
      maxWidth: 750,
      margin: 5,
    },
    media: {
      height: 140,
    },
    upButtonDisabled: {
      color: "paleGreen",
    },
    upButton: {
      color: "green",
    },
    downButton: {
      color: "red",
    },
  };
  const visibility = status === MatchStatus.UNREVIEWED ? "visible" : "hidden";
  return (
    <Stack
      sx={{
        border: "2px",
        borderColor: "black",
        borderStyle: "solid",
        visibility: visibility,
      }}
    >
      <Stack direction={"row"}>
        <AdvertisementView item={match.advertisement} />
        <TheftView item={match.theft} />
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Tooltip title="A Match!">
          <IconButton
            sx={styles.downButton}
            size="small"
            disabled={MatchStatus.MATCHED === status}
            onClick={handleThumbDown}
          >
            <Flag />
          </IconButton>
        </Tooltip>
        <Tooltip title="Not a Match">
          <IconButton
            sx={styles.upButton}
            onClick={handleThumbUp}
            disabled={MatchStatus.MISMATCHED === status}
          >
            <ThumbUp />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
