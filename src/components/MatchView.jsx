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
    const draft = {
      ...match,
      status:
        status === MatchStatus.MATCHED
          ? MatchStatus.UNREVIEWED
          : MatchStatus.MATCHED,
    };
    setMatch(draft);
    await MatchRepository.update(draft);
  }
  async function handleThumbUp() {
    const draft = {
      ...match,
      status:
        status === MatchStatus.MISMATCHED
          ? MatchStatus.UNREVIEWED
          : MatchStatus.MISMATCHED,
    };
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
            <IconButton sx={{ color: "red" }} onClick={handleThumbDown}>
              {matched ? <Flag /> : <FlagOutlined />}
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="Not a Match">
          <span>
            <IconButton sx={{ color: "green" }} onClick={handleThumbUp}>
              {mismatched ? <ThumbUp /> : <ThumbUpOutlined />}
            </IconButton>
          </span>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
