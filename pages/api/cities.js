// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      region: "AHAFO",
      cities: ["GOASO"],
    },
    {
      region: "ASHANTI",
      cities: ["KUMASI", 'Kejetia'],
    },
    {
      region: "BONO EAST",
      cities: ["TECHIMAN"],
    },
    {
      region: "BRONG AHAFO",
      cities: ["SUNYANI"],
    },
    {
      region: "CENTRAL",
      cities: ["CAPE COAST", 'Gomoa'],
    },
    {
      region: "EASTERN",
      cities: ["KOFORIDUA"],
    },
    {
      region: "GREATER ACCRA",
      cities: ["Accra", 'East Legon', 'East Adenta'],
    },
    {
      region: "NORTH EAST",
      cities: ["NALERIGU"],
    },
    {
      region: "NORTHERN",
      cities: ["TAMALE"],
    },
    {
      region: "OTI",
      cities: ["DAMBAI"],
    },
    {
      region: "SAVANNAH",
      cities: ["DAMONGO"],
    },{
      region: "UPPER EAST",
      cities: ["BOLGATANGA"],
    },{
      region: "UPPER WEST",
      cities: ["WA"],
    },{
      region: "WESTERN",
      cities: ["SEKONDI-TAKORADI"],
    },{
      region: "WESTERN NORTH",
      cities: ["SEFWI WIASO"],
    },{
      region: "VOLTA",
      cities: ["HO", 'HOHOE', 'KETA'],
    },
  ]);
}
