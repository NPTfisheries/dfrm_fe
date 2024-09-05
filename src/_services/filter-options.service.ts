import { Injectable, Inject } from '@angular/core';
import { filterOptions } from 'src/_models/interfaces';
import { CdmsService } from './cdms.service';

@Injectable({
  providedIn: 'root'
})
export class filterOptionsService {

  current_year = new Date().getFullYear()

  constructor(@Inject(CdmsService) private cdmsService: CdmsService) { }

  // the argName's here need to match those in NPTController.cs
  getFilterOptions(datastore_id: number): filterOptions[] {
    console.log('getFilterOptions');

    switch (datastore_id) {
      case 78:
      case 79:
        return this.sgsData();
      case 85:
        return this.juvAbundance();
      case 86:
        return this.juvSurvival();
      case 99:
        return this.weirData();
      case 100:
        return this.fallRR();
      case 107:
        return this.p4data();
      case 110:
        return this.spawningData();
      case 111:
      case 113:
        return this.sgsNEOR();
      case 122:
        return this.waterTempData();
      default:
        return [];
    }
  }

  // carcass and redds
  sgsData(): filterOptions[] {
    return [{
      options: this.buildIntArray(2001, this.current_year),
      placeholder: 'Select Survey Year',
      argName: 'SurveyYear'
    },
    {
      argName: 'DatasetID'  // via project name
    },
    {
      argName: 'LocationLabel'
    }
    ]
  }

  sgsNEOR(): filterOptions[] {
    return [{
      options: this.buildIntArray(1948, this.current_year), // 1948- (not every year, but oh well.)
      placeholder: 'Survey Year',
      argName: 'SurveyYear'
    }
    ]
  }

  fallRR(): filterOptions[] {
    return [{
      options: this.buildIntArray(2003, this.current_year),  // 2003-
      placeholder: 'Return Year',
      argName: 'ReturnYear'
    },
    {
      options: this.buildIntArray(2001, this.current_year), // 2001-
      placeholder: 'Brood Year',
      argName: 'BroodYear'
    }
    ]
  }

  juvAbundance(): filterOptions[] {
    return [{
      options: [
        { 'value': 'S_CHN', 'label': 'Spring Chinook' },
        { 'value': 'S_STH', 'label': 'Summer Steelhead' }
      ],
      placeholder: 'Species',
      argName: 'SpeciesRun'
    },
    {
      options: this.buildIntArray(1999, this.current_year), // 1999-
      placeholder: 'Migration Year',
      argName: 'MigratoryYear'
    },
    // {
    //   options: this.buildIntArray(1997, this.current_year), // 1997-
    //   placeholder: 'BroodYear',
    //   argName: 'BroodYear'
    // },
    {
      options: [
        { 'value': 'Lake Creek: Lake Creek RST', 'label': 'Lake Creek RST' },
        { 'value': 'Imnaha River: Imnaha River RST', 'label': 'Imnaha River RST' },
        { 'value': 'Johnson Creek: Johnson Creek RST', 'label': 'Johnson Creek RST' },
        { 'value': 'Lolo Creek: Lolo Creek RST', 'label': 'Lolo Creek RST' },
        { 'value': 'Newsome Creek: Newsome Creek RST', 'label': 'Newsome Creek RST' },
        { 'value': 'Secesh River: Lower Secesh River RST', 'label': 'Lower Secesh River RST' },
        { 'value': 'Secesh River: Upper Secesh River RST', 'label': 'Upper Secesh River RST' },
        { 'value': 'South Fork Clearwater River: SF Clearwater River RST', 'label': 'SF Clearwater River RST' }
      ],
      placeholder: 'Location',
      argName: 'LocationLabel'
    },
    ]
  }

  juvSurvival(): filterOptions[] {
    return [{
      options: [
        { 'value': 'F_CHN', 'label': 'Fall Chinook' },
        { 'value': 'S_CHN', 'label': 'Spring Chinook' },
        { 'value': 'S_STH', 'label': 'Summer Steelhead' }
      ],
      placeholder: 'Species',
      argName: 'SpeciesRun'
    },
    {
      options: this.buildIntArray(1999, this.current_year), // 1999-
      placeholder: 'Migration Year',
      argName: 'MigratoryYear'
    },
    // {
    //   options: this.buildIntArray(1997, this.current_year), // 1997-
    //   placeholder: 'BroodYear',
    //   argName: 'BroodYear'
    // },
    {
      options: [
        { 'value': 'Hatchery', 'label': 'Hatchery' },
        { 'value': 'Natural', 'label': 'Natural' }
      ],
      placeholder: 'Origin',
      argName: 'Origin'
    },
    {
      options: [
        { 'value': 'Lake Creek: Lake Creek RST', 'label': 'Lake Creek RST' },
        { 'value': 'Imnaha River: Imnaha River RST', 'label': 'Imnaha River RST' },
        { 'value': 'Johnson Creek: Johnson Creek RST', 'label': 'Johnson Creek RST' },
        { 'value': 'Lolo Creek: Lolo Creek RST', 'label': 'Lolo Creek RST' },
        { 'value': 'Newsome Creek: Newsome Creek RST', 'label': 'Newsome Creek RST' },
        { 'value': 'Secesh River: Lower Secesh River RST', 'label': 'Lower Secesh River RST' },
        { 'value': 'Secesh River: Upper Secesh River RST', 'label': 'Upper Secesh River RST' },
        { 'value': 'South Fork Clearwater River: SF Clearwater River RST', 'label': 'SF Clearwater River RST' }
      ],
      placeholder: 'Location',
      argName: 'LocationLabel'
    },
    ]
  }

  p4data(): filterOptions[] {
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
      options: this.buildIntArray(1997, this.current_year),
      placeholder: 'Migration Year',
      argName: 'MigrationYear'
    },
    {
      options: this.buildIntArray(1997, this.current_year),
      placeholder: 'Brood Year',
      argName: 'BroodYear'
    },
    {
      options: this.buildIntArray(1997, this.current_year),
      placeholder: 'Calendar Year',
      argName: 'CalendarYear'
    }
    ]
  }

  spawningData(): filterOptions[] {
    return [{
      options: [
        { 'value': 'BCH Spawn Building', 'label': 'BCH Spawn Building' },
        { 'value': 'Bliss to CJ Strike', 'label': 'Bliss to CJ Strike' },
        { 'value': 'CFH: On-site', 'label': 'CFH: On-site' },
        { 'value': 'CFH: Powell', 'label': 'CFH: Powell' },
        { 'value': 'DNFH HP3 SF Localized', 'label': 'DNFH HP3 SF Localized' },
        { 'value': 'DNFH: On-site', 'label': 'DNFH: On-site' },
        { 'value': 'Eagle Anadromous Building', 'label': 'Eagle Anadromous Building' },
        { 'value': 'Eagle Captive Building', 'label': 'Eagle Captive Building' },
        { 'value': 'East Fork', 'label': 'East Fork' },
        { 'value': 'KNFH: Spawning', 'label': 'KNFH: Spawning' },
        { 'value': 'LGH Spawning Room', 'label': 'LGH Spawning Room' },
        { 'value': 'Lyons Ferry Fish Hatchery', 'label': 'Lyons Ferry Fish Hatchery' },
        { 'value': 'MFH: On-site', 'label': 'MFH: On-site' },
        { 'value': 'MFH: SFSR Satellite', 'label': 'MFH: SFSR Satellite' },
        { 'value': 'NPT Hatchery Spawning', 'label': 'NPT Hatchery Spawning' },
        { 'value': 'OFH: On-site', 'label': 'OFH: On-site' },
        { 'value': 'PFH: On-site', 'label': 'PFH: On-site' },
        { 'value': 'RRFH: On-site', 'label': 'RRFH: On-site' },
        { 'value': 'SFH: East Fork', 'label': 'SFH: East Fork' },
        { 'value': 'SFH: On-site', 'label': 'SFH: On-site' },
        { 'value': 'Spawning building', 'label': 'Spawning building' }
      ],
      placeholder: 'Spawn Location',
      argName: 'SpawnLocation'
    },
    {
      options: [
        { 'value': 'Carson SCS', 'label': 'Carson SCS' },
        { 'value': 'Clear Creek', 'label': 'Clear Creek' },
        { 'value': 'Clearwater', 'label': 'Clearwater' },
        { 'value': 'Clearwater River', 'label': 'Clearwater River' },
        { 'value': 'Dworshak', 'label': 'Dworshak' },
        { 'value': 'Dworshak (Chinook)', 'label': 'Dworshak (Chinook)' },
        { 'value': 'Dworshak B (Steelhead)', 'label': 'Dworshak B (Steelhead)' },
        { 'value': 'East Fork Salmon River', 'label': 'East Fork Salmon River' },
        { 'value': 'Imnaha (29H)', 'label': 'Imnaha (29H)' },
        { 'value': 'IPC Sturgeon', 'label': 'IPC Sturgeon' },
        { 'value': 'Johnson Creek', 'label': 'Johnson Creek' },
        { 'value': 'Kooskia (Chinook)', 'label': 'Kooskia (Chinook)' },
        { 'value': 'Lookingglass Creek (81H)', 'label': 'Lookingglass Creek (81H)' },
        { 'value': 'Oxbow', 'label': 'Oxbow' },
        { 'value': 'Pahsimeroi', 'label': 'Pahsimeroi' },
        { 'value': 'Panther Cr', 'label': 'Panther Cr' },
        { 'value': 'Powell', 'label': 'Powell' },
        { 'value': 'Powell/SFSR', 'label': 'Powell/SFSR' },
        { 'value': 'Rapid River', 'label': 'Rapid River' },
        { 'value': 'S.F Clearwater/Dworshak', 'label': 'S.F Clearwater/Dworshak' },
        { 'value': 'S.F. Clearwater', 'label': 'S.F. Clearwater' },
        { 'value': 'S.F. Salmon River', 'label': 'S.F. Salmon River' },
        { 'value': 'Sawtooth', 'label': 'Sawtooth' },
        { 'value': 'SF Steelhead', 'label': 'SF Steelhead' },
        { 'value': 'Snake', 'label': 'Snake' },
        { 'value': 'Snake River', 'label': 'Snake River' },
        { 'value': 'Snake River - Redfish Lake', 'label': 'Snake River - Redfish Lake' },
        { 'value': 'Snake River-Redfish Lake', 'label': 'Snake River-Redfish Lake' },
        { 'value': 'Upper Salmon River', 'label': 'Upper Salmon River' }
      ],
      placeholder: 'Stock',
      argName: 'Stock'
    },
    {
      options: [
        { 'value': 'Chinook', 'label': 'Chinook' },
        { 'value': 'Sockeye', 'label': 'Sockeye' },
        { 'value': 'Steelhead', 'label': 'Steelhead' },
        { 'value': 'White Sturgeon', 'label': 'White Sturgeon' }
      ],
      placeholder: 'Species',
      argName: 'Species'
    },
    {
      options: [
        { 'value': 'Fall', 'label': 'Fall' },
        { 'value': 'Spring', 'label': 'Spring' },
        { 'value': 'Summer', 'label': 'Summer' },
      ],
      placeholder: 'Run',
      argName: 'Run'
    },
    {
      options: [
        { 'value': 'Female', 'label': 'Female' },
        { 'value': 'Male', 'label': 'Male' },
      ],
      placeholder: 'Sex',
      argName: 'Sex'
    },
    {
      options: [
        { 'value': 'Hatchery', 'label': 'Hatchery' },
        { 'value': 'Hatchery Steelhead', 'label': 'Hatchery Steelhead' },
        { 'value': 'Hatchery, Natural', 'label': 'Hatchery, Natural' },
        { 'value': 'Hatchery-Integrated', 'label': 'Hatchery-Integrated' },
        { 'value': 'Hatchery-Segregated', 'label': 'Hatchery-Segregated' },
        { 'value': 'Hatchery-Segregated-Pah', 'label': 'Hatchery-Segregated-Pah' },
        { 'value': 'Hatchery-Segregated-USAL', 'label': 'Hatchery-Segregated-USAL' },
        { 'value': 'Natural', 'label': 'Natural' },
        { 'value': 'Natural Steelhead', 'label': 'Natural Steelhead' },
        { 'value': 'Uncategorized', 'label': 'Uncategorized' },
        { 'value': 'Unknown', 'label': 'Unknown' }
      ],
      placeholder: 'Origin',
      argName: 'Origin'
    }
    ]
  }

  waterTempData(): filterOptions[] {
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

  weirData(): filterOptions[] {
    return [{
      options: [
        { 'value': 'Big Canyon Fish Hatchery', 'label': 'Big Canyon Fish Hatchery' },
        { 'value': 'Clearwater Fish Hatchery', 'label': 'Clearwater Fish Hatchery' },
        { 'value': 'CTUIR', 'label': 'CTUIR' },
        { 'value': 'Dworshak National Fish Hatchery', 'label': 'Dworshak National Fish Hatchery' },
        { 'value': 'Eagle Fish Hatchery', 'label': 'Eagle Fish Hatchery' },
        { 'value': 'IDFG Region 2 Research Weirs', 'label': 'IDFG Region 2 Research Weirs' },
        { 'value': 'IDFG Region 7 Research Weirs', 'label': 'IDFG Region 7 Research Weirs' },
        { 'value': 'Kooskia National Fish Hatchery', 'label': 'Kooskia National Fish Hatchery' },
        { 'value': 'Little Sheep Creek Fish Hatchery', 'label': 'Little Sheep Creek Fish Hatchery' },
        { 'value': 'Lookingglass Fish Hatchery', 'label': 'Lookingglass Fish Hatchery' },
        { 'value': 'Lyons Ferry Fish Hatchery', 'label': 'Lyons Ferry Fish Hatchery' },
        { 'value': 'McCall Fish Hatchery', 'label': 'McCall Fish Hatchery' },
        { 'value': 'NPT GRSME Program', 'label': 'NPT GRSME Program' },
        { 'value': 'NPT Hatchery', 'label': 'NPT Hatchery' },
        { 'value': 'NPT IRSSSM Program', 'label': 'NPT IRSSSM Program' },
        { 'value': 'NPT JCAPE Program', 'label': 'NPT JCAPE Program' },
        { 'value': 'NPT LSRCP Imnaha Program', 'label': 'NPT LSRCP Imnaha Program' },
        { 'value': 'NPT SBSA Program', 'label': 'NPT SBSA Program' },
        { 'value': 'NPTH M&E Program', 'label': 'NPTH M&E Program' },
        { 'value': 'Oxbow Fish Hatchery', 'label': 'Oxbow Fish Hatchery' },
        { 'value': 'Pahsimeroi Fish Hatchery', 'label': 'Pahsimeroi Fish Hatchery' },
        { 'value': 'Rapid River Fish Hatchery', 'label': 'Rapid River Fish Hatchery' },
        { 'value': 'Sawtooth Fish Hatchery', 'label': 'Sawtooth Fish Hatchery' },
        { 'value': 'Shoshone-Bannock Tribes', 'label': 'Shoshone-Bannock Tribes' },
        { 'value': 'Wallowa Fish Hatchery', 'label': 'Wallowa Fish Hatchery' },
      ],
      placeholder: 'FINS Facility',
      argName: 'Facility'
    },
    {
      options: [
        { 'value': 'Bridge Lip Sucker', 'label': 'Bridge Lip Sucker' },
        { 'value': 'Brook Trout', 'label': 'Brook Trout' },
        { 'value': 'Brown Trout', 'label': 'Brown Trout' },
        { 'value': 'Bull Trout', 'label': 'Bull Trout' },
        { 'value': 'Chinook', 'label': 'Chinook' },
        { 'value': 'Chisel Mouth', 'label': 'Chisel Mouth' },
        { 'value': 'Coho', 'label': 'Coho' },
        { 'value': 'Cutthroat', 'label': 'Cutthroat' },
        { 'value': 'Hybrid Sucker', 'label': 'Hybrid Sucker' },
        { 'value': 'Largescale Sucker', 'label': 'Largescale Sucker' },
        { 'value': 'Mtn White Fish', 'label': 'Mtn White Fish' },
        { 'value': 'Northern Pike Minnow', 'label': 'Northern Pike Minnow' },
        { 'value': 'Peamouth', 'label': 'Peamouth' },
        { 'value': 'Rainbow Trout', 'label': 'Rainbow Trout' },
        { 'value': 'Smallmouth Bass', 'label': 'Smallmouth Bass' },
        { 'value': 'Sockeye', 'label': 'Sockeye' },
        { 'value': 'Steelhead', 'label': 'Steelhead' },
        { 'value': 'Sucker', 'label': 'Sucker' },
        { 'value': 'White Fish', 'label': 'White Fish' }
      ],
      placeholder: 'Species',
      argName: 'Species'
    },
    {
      options: [
        { 'value': 'Fall', 'label': 'Fall' },
        { 'value': 'Spring', 'label': 'Spring' },
        { 'value': 'Summer', 'label': 'Summer' },
        { 'value': 'Winter', 'label': 'Winter' }

      ],
      placeholder: 'Run',
      argName: 'Run'
    },
    {
      options: [
        { 'value': 'Female', 'label': 'Female' },
        { 'value': 'Male', 'label': 'Male' },
        { 'value': 'Unknown', 'label': 'Unknown' },
      ],
      placeholder: 'Sex',
      argName: 'Sex'
    },
    {
      options: [
        { 'value': ' Natural', 'label': ' Natural' },
        { 'value': 'Big Canyon hatchery', 'label': 'Big Canyon hatchery' },
        { 'value': 'Big Canyon natural', 'label': 'Big Canyon natural' },
        { 'value': 'Fall Brood', 'label': 'Fall Brood' },
        { 'value': 'Hatchery', 'label': 'Hatchery' },
        { 'value': 'Hatchery Steelhead', 'label': 'Hatchery Steelhead' },
        { 'value': 'Hatchery-Integrated', 'label': 'Hatchery-Integrated' },
        { 'value': 'Hatchery-Segregated', 'label': 'Hatchery-Segregated' },
        { 'value': 'Hatchery-Segregated-Pah', 'label': 'Hatchery-Segregated-Pah' },
        { 'value': 'Hatchery-Segregated-USAL', 'label': 'Hatchery-Segregated-USAL' },
        { 'value': 'Hatchery-Stray', 'label': 'Hatchery-Stray' },
        { 'value': 'Hatchery-Supplementation', 'label': 'Hatchery-Supplementation' },
        { 'value': 'Native', 'label': 'Native' },
        { 'value': 'Natural', 'label': 'Natural' },
        { 'value': 'Natural Steelhead', 'label': 'Natural Steelhead' },
        { 'value': 'Production', 'label': 'Production' },
        { 'value': 'Uncategorized', 'label': 'Uncategorized' },
        { 'value': 'Unknown', 'label': 'Unknown' },
        { 'value': 'Wild', 'label': 'Wild' }
      ],
      placeholder: 'Origin',
      argName: 'Origin'
    }
    ]
  }

  private buildIntArray(min: number, max: number) {
    let options = [];
    let i = min;

    while (i <= max) {
      options.push({ 'value': i, 'label': String(i) });
      i++;
    }

    return options;
  }

}
