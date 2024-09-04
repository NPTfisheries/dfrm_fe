import { Injectable } from '@angular/core';
import { filterOptions } from 'src/_models/interfaces';


// the argName's here need to match those in NPTController.cs
@Injectable({ providedIn: 'root' })
export class FilterOptionsService {

  constructor(
  ) { }

  carcassData(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Survey Year',
      argName: 'SurveyYear'
    },
    {
      options: [],
      placeholder: 'Filter by Project',
      argName: 'DatasetID'
    },
    {
      options: [],
      placeholder: 'Filter by Location',
      argName: 'LocationLabel'
    }
    ]
  }

  carcassDataNEOR(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Survey Year',
      argName: 'SurveyYear'
    },
    {
      options: [],
      placeholder: 'Filter by Project',
      argName: 'DatasetID'
    },
    {
      options: [],
      placeholder: 'Filter by Location',
      argName: 'LocationLabel'
    }
    ]
  }

  fallRR(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Return Year',
      argName: 'ReturnYear'
    },
    {
      options: [],
      placeholder: 'Filter by Brood Year',
      argName: 'BroodYear'
    }
    ]
  }
  // same as survival
  juvAbundance(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Species',
      argName: 'SpeciesRun'
    },
    {
      options: [],
      placeholder: 'Filter by Migration Year',
      argName: 'MigratoryYear'
    },
    {
      options: [],
      placeholder: 'Filter by BroodYear',
      argName: 'BroodYear'
    },
    {
      options: [],
      placeholder: 'Filter by Origin',
      argName: 'Origin'
    },
    {
      options: [],
      placeholder: '',
      argName: 'LocationLabel'
    },
    ]
  }
  // same as abundance.
  juvSurvival(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Species',
      argName: 'SpeciesRun'
    },
    {
      options: [],
      placeholder: 'Filter by Migration Year',
      argName: 'MigratoryYear'
    },
    {
      options: [],
      placeholder: 'Filter by Brood Year',
      argName: 'BroodYear'
    },
    {
      options: [],
      placeholder: 'Filter by Origin',
      argName: 'Origin'
    },
    {
      options: [],
      placeholder: 'Filter by Location',
      argName: 'LocationLabel'
    },
    ]
  }

  p4data(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by MRR Project',
      argName: 'MRRProject'
    },
    {
      options: [],
      placeholder: 'Filter by Event Site',
      argName: 'EventSite'
    },
    {
      options: [],
      placeholder: 'Filter by Event Type',
      argName: 'EventType'
    },
    {
      options: [],
      placeholder: 'Filter by Capture Method',
      argName: 'CaptureMethod'
    },
    {
      options: [],
      placeholder: 'Filter by SRR Code',
      argName: 'SRRCode'
    },
    {
      options: [],
      placeholder: ' Filter by Migration Year',
      argName: 'MigrationYear'
    },
    {
      options: [],
      placeholder: 'Filter by Brood Year',
      argName: 'BroodYear'
    },
    {
      options: [],
      placeholder: 'Filter by Calendar Year',
      argName: 'CalendarYear'
    }
    ]
  }

  reddData(): filterOptions[] {
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

  reddDataNEOR(): filterOptions[] {
    return [{
      options: [],
      placeholder: '',
      argName: 'SurveyYear'
    }
    ]
  }

  spawningData(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Spawning Location',
      argName: 'SpawnLocation'
    },
    {
      options: [],
      placeholder: 'Filter by Stock',
      argName: 'Stock'
    },
    {
      options: [],
      placeholder: 'Filter by Species',
      argName: 'Species'
    },
    {
      options: [],
      placeholder: 'Filter by Run',
      argName: 'Run'
    },
    {
      options: [],
      placeholder: 'Filter by Sex',
      argName: 'Sex'
    },
    {
      options: [],
      placeholder: 'Filter by Origin',
      argName: 'Origin'
    }
    ]
  }

  waterTempData(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by Year',
      argName: 'Year',
      required: true,
    },
    {
      options: [],
      placeholder: 'Filter by Location',
      argName: 'LocationId'
    },
    ]
  }

  weirData(): filterOptions[] {
    return [{
      options: [],
      placeholder: 'Filter by FINS Facility',
      argName: 'Facility'
    },
    {
      options: [],
      placeholder: 'Filter by Species',
      argName: 'Species'
    },
    {
      options: [],
      placeholder: 'Filter by Run',
      argName: 'Run'
    },
    {
      options: [],
      placeholder: 'Filter by Sex',
      argName: 'Sex'
    },
    {
      options: [],
      placeholder: 'Filter by Origin',
      argName: 'Origin'
    }
    ]
  }

}
