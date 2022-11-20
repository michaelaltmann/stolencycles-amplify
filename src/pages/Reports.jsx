import { Stack, Box, Select, Typography, MenuItem } from "@mui/material";
import React from "react";
import API from "@aws-amplify/api";

export default function Reports(props) {
  const [report, setReport] = React.useState("countTheftsByYearMonth");
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const d = await API.get("scrape", "/report/" + report);
      setData(d);
    }
    fetchData();
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
            textAlign: "left",
          }}
        >
          {" "}
          <pre>{JSON.stringify(data, null, 3)}</pre>
        </Typography>
      )}
    </Stack>
  );
}
