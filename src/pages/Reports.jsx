import { Stack, Box, Select, Typography, MenuItem } from "@mui/material";
import React from "react";
import API from "@aws-amplify/api";
import { Vega, VegaLite } from "react-vega";

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

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dataArray = data?.map((x) => {
    return {
      month: months[x.month],
      count: x.count,
      year: x.year > 2010 ? x.year - 2020 : 0,
    };
  });

  const spec = {
    $schema: "https://vega.github.io/schema/vega/v5.json",
    description: "A basic grouped bar chart example.",
    width: 600,
    height: 240,
    padding: 5,

    data: [
      {
        name: "table",
        values: dataArray,
      },
    ],

    scales: [
      {
        name: "yscale",
        type: "band",
        domain: months,
        range: "height",
        padding: 0.2,
      },
      {
        name: "xscale",
        type: "linear",
        domain: { data: "table", field: "count" },
        range: "width",
        round: true,
        zero: true,
        nice: true,
      },
      {
        name: "color",
        type: "ordinal",
        domain: { data: "table", field: "year" },
        range: ["red", "blue", "purple"],
      },
      {
        name: "pos",
        type: "band",
        range: [0, { signal: "bandwidth('yscale')" }],
        domain: { data: "table", field: "year" },
      },
    ],

    axes: [
      {
        orient: "left",
        scale: "yscale",
        tickSize: 0,
        labelPadding: 4,
        zindex: 1,
      },
      { orient: "bottom", scale: "xscale" },
    ],

    marks: [
      {
        type: "group",

        from: {
          facet: {
            data: "table",
            name: "facet",
            groupby: "month",
          },
        },

        encode: {
          enter: {
            y: { scale: "yscale", field: "month" },
          },
        },

        signals: [{ name: "height", update: "bandwidth('yscale')" }],

        marks: [
          {
            name: "bars",
            from: { data: "facet" },
            type: "rect",
            encode: {
              enter: {
                y: { scale: "pos", field: "year" },
                height: { scale: "pos", band: 1 },
                x: { scale: "xscale", field: "count" },
                x2: { scale: "xscale", value: 0 },
                fill: { scale: "color", field: "year" },
              },
            },
          },
        ],
      },
    ],
  };

  const vegaData = [
    {
      table: dataArray,
    },
  ];

  console.log(vegaData);
  return (
    <Stack>
      Reports
      <Select name="report" value={report} onChange={handleChange}>
        <MenuItem value={"countTheftsByYearMonth"}>Thefts By Month</MenuItem>
      </Select>
      {data && (
        <>
          <Typography
            sx={{
              fontFamily: "monospace",
              textAlign: "left",
            }}
          >
            {/*JSON.stringify(dataArray, null, 3) */}
          </Typography>
          <VegaLite spec={spec} data={vegaData} />
        </>
      )}
    </Stack>
  );
}
