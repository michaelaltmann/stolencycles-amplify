import { Flag, ThumbUp, Undo } from "@mui/icons-material";
import { IconButton, Stack, Tooltip } from "@mui/material";
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
  async function revert() {
    const draft = { ...match, status: MatchStatus.UNREVIEWED };
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
  };
  const reviewed = status != MatchStatus.UNREVIEWED;
  const visibility = reviewed ? "hidden" : "visible";
  return (
    <Stack
      sx={{
        border: "2px",
        borderColor: "black",
        borderStyle: "solid",
      }}
    >
      <Stack direction={"row"} sx={{ visibility: visibility }}>
        <AdvertisementView item={match.advertisement} />
        <TheftView item={match.theft} />
      </Stack>
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", justifyContent: "center" }}
      >
        <Tooltip title="A Match!">
          <IconButton
            sx={{ color: !reviewed ? "red" : "gray" }}
            size="small"
            disabled={MatchStatus.MATCHED === status}
            onClick={handleThumbDown}
          >
            <Flag />
          </IconButton>
        </Tooltip>
        <Tooltip title="Not a Match">
          <IconButton
            sx={{ color: !reviewed ? "green" : "gray" }}
            onClick={handleThumbUp}
            disabled={MatchStatus.MISMATCHED === status}
          >
            <ThumbUp />
          </IconButton>
        </Tooltip>
        <Tooltip title="Undo" sx={styles.button}>
          <IconButton
            size="small"
            onClick={revert}
            sx={{
              minWidth: 30,
              color: !reviewed ? "gray" : "blue",
              borderStyle: "solid",
              borderWidth: 0,
            }}
          >
            <Undo />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
