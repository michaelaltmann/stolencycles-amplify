import {
  Flag,
  FlagOutlined,
  ThumbUp,
  ThumbUpOutlined,
  Undo,
} from "@mui/icons-material";
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

  const unreviewed = status === MatchStatus.UNREVIEWED;
  const mismatched = status === MatchStatus.MISMATCHED;
  const matched = status === MatchStatus.MATCHED;
  const visibility = unreviewed ? "visible" : "hidden";
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
          <span>
            <IconButton
              sx={{ color: "red" }}
              disabled={!unreviewed}
              onClick={handleThumbDown}
            >
              {matched ? <Flag /> : <FlagOutlined />}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Not a Match">
          <span>
            <IconButton
              sx={{
                color: "green",
              }}
              disabled={!unreviewed}
              onClick={handleThumbUp}
            >
              {mismatched ? <ThumbUp /> : <ThumbUpOutlined />}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Undo">
          <span>
            <IconButton
              sx={{
                minWidth: 30,
                color: !unreviewed ? "gray" : "blue",
                borderStyle: "solid",
                borderWidth: 0,
              }}
              disabled={unreviewed}
              onClick={revert}
            >
              <Undo />
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
