import { filterOptions } from 'src/_models/interfaces';

// the argName's here need to match those in NPTController.cs
export function getFilterOptions(datastore_id: number): filterOptions[] {
  console.log('getFilterOptions');

  switch (datastore_id) {
    case 78 || 79:
      return sgsData();
    case 85 || 86:
      return juvSummaries();
    case 99:
      return weirData();
    case 100:
      return fallRR();
    case 107:
      return p4data();
    case 110:
      return spawningData();
    case 111 || 113:
      return sgsNEOR();
    case 122:
      return waterTempData();
    default:
      return [];
  }
}

// carcass and redds
function sgsData(): filterOptions[] {
  return [{
    options: [
      { 'value': 2001, 'label': '2001' },
      { 'value': 2002, 'label': '2002' },
      { 'value': 2003, 'label': '2003' },
      { 'value': 2004, 'label': '2004' },
      { 'value': 2005, 'label': '2005' },
      { 'value': 2006, 'label': '2006' },
      { 'value': 2007, 'label': '2007' },
      { 'value': 2008, 'label': '2008' },
      { 'value': 2009, 'label': '2009' },
      { 'value': 2000, 'label': '2010' },
      { 'value': 2011, 'label': '2011' },
      { 'value': 2012, 'label': '2012' },
      { 'value': 2013, 'label': '2013' },
      { 'value': 2014, 'label': '2014' },
      { 'value': 2015, 'label': '2015' },
      { 'value': 2016, 'label': '2016' },
      { 'value': 2017, 'label': '2017' },
      { 'value': 2018, 'label': '2018' },
      { 'value': 2019, 'label': '2019' },
      { 'value': 2020, 'label': '2020' },
      { 'value': 2021, 'label': '2021' },
      { 'value': 2022, 'label': '2022' },
      { 'value': 2023, 'label': '2023' },
      { 'value': 2024, 'label': '2024' }
    ],
    placeholder: 'Select Survey Year',
    argName: 'SurveyYear'
  },
  {
    argName: 'DatasetID'
  },
  {
    argName: 'LocationLabel'
  }
  ]
}

function sgsNEOR(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'Survey Year',
    argName: 'SurveyYear'
  }
  ]
}

function fallRR(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'Return Year',
    argName: 'ReturnYear'
  },
  {
    options: [],
    placeholder: 'Brood Year',
    argName: 'BroodYear'
  }
  ]
}
// same as survival
function juvSummaries(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'Species',
    argName: 'SpeciesRun'
  },
  {
    options: [],
    placeholder: 'Migration Year',
    argName: 'MigratoryYear'
  },
  {
    options: [],
    placeholder: 'BroodYear',
    argName: 'BroodYear'
  },
  {
    options: [],
    placeholder: 'Origin',
    argName: 'Origin'
  },
  {
    options: [],
    placeholder: 'Location',
    argName: 'LocationLabel'
  },
  ]
}

function p4data(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'MRR Project',
    argName: 'MRRProject'
  },
  {
    options: [],
    placeholder: 'Event Site',
    argName: 'EventSite'
  },
  {
    options: [],
    placeholder: 'Event Type',
    argName: 'EventType'
  },
  {
    options: [],
    placeholder: 'Capture Method',
    argName: 'CaptureMethod'
  },
  {
    options: [],
    placeholder: 'SRR Code',
    argName: 'SRRCode'
  },
  {
    options: [],
    placeholder: 'Migration Year',
    argName: 'MigrationYear'
  },
  {
    options: [],
    placeholder: 'Brood Year',
    argName: 'BroodYear'
  },
  {
    options: [],
    placeholder: 'Calendar Year',
    argName: 'CalendarYear'
  }
  ]
}


function reddDataNEOR(): filterOptions[] {
  return [{
    options: [],
    placeholder: '',
    argName: 'SurveyYear'
  }
  ]
}

function spawningData(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'Spawn Location',
    argName: 'SpawnLocation'
  },
  {
    options: [],
    placeholder: 'Stock',
    argName: 'Stock'
  },
  {
    options: [],
    placeholder: 'Species',
    argName: 'Species'
  },
  {
    options: [],
    placeholder: 'Run',
    argName: 'Run'
  },
  {
    options: [],
    placeholder: 'Sex',
    argName: 'Sex'
  },
  {
    options: [],
    placeholder: 'Origin',
    argName: 'Origin'
  }
  ]
}

function waterTempData(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'Year',
    argName: 'Year',
    required: true,
  },
  {
    options: [],
    placeholder: 'Location',
    argName: 'LocationId'
  },
  ]
}

function weirData(): filterOptions[] {
  return [{
    options: [],
    placeholder: 'FINS Facility',
    argName: 'Facility'
  },
  {
    options: [],
    placeholder: 'Species',
    argName: 'Species'
  },
  {
    options: [],
    placeholder: 'Run',
    argName: 'Run'
  },
  {
    options: [],
    placeholder: 'Sex',
    argName: 'Sex'
  },
  {
    options: [],
    placeholder: 'Origin',
    argName: 'Origin'
  }
  ]
}

