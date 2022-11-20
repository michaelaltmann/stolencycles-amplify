import { Stack, Box, Select, Typography, MenuItem } from "@mui/material";
import React from "react";
import API from "@aws-amplify/api";

export default function Reports(props) {
  const [report, setReport] = React.useState("countTheftsByYearMonth");
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      const data = API.get("scrape", "/report/" + report);
      setData(data);
    }
    getData();
  }, [report]);

  function handleChange(ev) {
    const { value } = ev.target;
    setReport(value);
  }
  return (
    <Stack>
      Reports
      <Select name="report" value={report} onChange={handleChange}>
        <MenuItem value={"countTheftsByYearMonth"}>Thefts By Month</MenuItem>
      </Select>
      {data && (
        <Typography
          sx={{
            fontFamily: "monospace",
          }}
        >
          {" "}
          {JSON.stringify(data, null, 3)}
        </Typography>
      )}
    </Stack>
  );
}
