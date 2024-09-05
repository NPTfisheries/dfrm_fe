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
    // console.log('getFilterOptions');

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
      case 102:
        return this.iptdsEsc();
      case 103:
        return this.iptdsLgr();
      case 104:
        return this.iptdsRecruits();
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
      placeholder: 'Survey Year',
      argName: 'SurveyYear'
    },
    {
      argName: 'DatasetID'  // via project name
    },
    // {
    //   argName: 'LocationLabel'
    // }
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

  iptdsEsc(): filterOptions[] {
    return [
      {
        options: [
          { 'value': 'Age Escapement', 'label': 'Age Escapement' },
          { 'value': 'Age Proportion', 'label': 'Age Proportion' },
          { 'value': 'Detection Efficiency', 'label': 'Detection Efficiency' },
          { 'value': 'Female Escapement', 'label': 'Female Escapement' },
          { 'value': 'Female Proportion', 'label': 'Female Proportion' },
          { 'value': 'Population Escapement', 'label': 'Population Escapement' },
          { 'value': 'Site Escapement', 'label': 'Site Escapement' }
        ],
        placeholder: 'Variable',
        argName: 'Variable'
      },
      {
        options: this.buildIntArray(2010, this.current_year), // 2010-
        placeholder: 'Spawn Year',
        argName: 'SpawnYear'
      },
      {
        options: [
          { 'value': 'Chinook salmon', 'label': 'Chinook salmon' },
          { 'value': 'Steelhead', 'label': 'Steelhead' }
        ],
        placeholder: 'Species',
        argName: 'Species'
      },
      {
        options: [
          { 'value': 'Spring/Summer', 'label': 'Spring/Summer' },
          { 'value': 'Summer', 'label': 'Summer' }
        ],
        placeholder: 'Run',
        argName: 'Run'
      },
      {
        options: [
          { 'value': 'CRLAP', 'label': 'CRLAP' },
          { 'value': 'CRLMA-s', 'label': 'CRLMA-s' },
          { 'value': 'CRLOC', 'label': 'CRLOC' },
          { 'value': 'CRLOC-s', 'label': 'CRLOC-s' },
          { 'value': 'CRLOL', 'label': 'CRLOL' },
          { 'value': 'CRLOL-s', 'label': 'CRLOL-s' },
          { 'value': 'CRPOT', 'label': 'CRPOT' },
          { 'value': 'CRSEL-s', 'label': 'CRSEL-s' },
          { 'value': 'CRSFC-s', 'label': 'CRSFC-s' },
          { 'value': 'GRCAT', 'label': 'GRCAT' },
          { 'value': 'GRJOS-s', 'label': 'GRJOS-s' },
          { 'value': 'GRLMT-s', 'label': 'GRLMT-s' },
          { 'value': 'GRLOO', 'label': 'GRLOO' },
          { 'value': 'GRLOS', 'label': 'GRLOS' },
          { 'value': 'GRLOS/GRMIN', 'label': 'GRLOS/GRMIN' },
          { 'value': 'GRMIN', 'label': 'GRMIN' },
          { 'value': 'GRUMA', 'label': 'GRUMA' },
          { 'value': 'GRUMA-s', 'label': 'GRUMA-s' },
          { 'value': 'GRWAL-s', 'label': 'GRWAL-s' },
          { 'value': 'GRWEN', 'label': 'GRWEN' },
          { 'value': 'IRBSH', 'label': 'IRBSH' },
          { 'value': 'IRMAI', 'label': 'IRMAI' },
          { 'value': 'IRMAI-s', 'label': 'IRMAI-s' },
          { 'value': 'MFBEA', 'label': 'MFBEA' },
          { 'value': 'MFBIG', 'label': 'MFBIG' },
          { 'value': 'MFBIG-s', 'label': 'MFBIG-s' },
          { 'value': 'MFUMA-s', 'label': 'MFUMA-s' },
          { 'value': 'SCLAW', 'label': 'SCLAW' },
          { 'value': 'SCUMA', 'label': 'SCUMA' },
          { 'value': 'SEMEA', 'label': 'SEMEA' },
          { 'value': 'SEUMA/SEMEA/SEMOO', 'label': 'SEUMA/SEMEA/SEMOO' },
          { 'value': 'SFEFS', 'label': 'SFEFS' },
          { 'value': 'SFMAI', 'label': 'SFMAI' },
          { 'value': 'SFMAI-s', 'label': 'SFMAI-s' },
          { 'value': 'SFSEC', 'label': 'SFSEC' },
          { 'value': 'SFSEC-s', 'label': 'SFSEC-s' },
          { 'value': 'SNASO', 'label': 'SNASO' },
          { 'value': 'SNASO-s', 'label': 'SNASO-s' },
          { 'value': 'SNTUC', 'label': 'SNTUC' },
          { 'value': 'SNTUC-s', 'label': 'SNTUC-s' },
          { 'value': 'SREFS', 'label': 'SREFS' },
          { 'value': 'SREFS-s', 'label': 'SREFS-s' },
          { 'value': 'SRLEM', 'label': 'SRLEM' },
          { 'value': 'SRLEM-s', 'label': 'SRLEM-s' },
          { 'value': 'SRLMA', 'label': 'SRLMA' },
          { 'value': 'SRLSR', 'label': 'SRLSR' },
          { 'value': 'SRLSR-s', 'label': 'SRLSR-s' },
          { 'value': 'SRNFS', 'label': 'SRNFS' },
          { 'value': 'SRNFS-s', 'label': 'SRNFS-s' },
          { 'value': 'SRPAH', 'label': 'SRPAH' },
          { 'value': 'SRPAH-s', 'label': 'SRPAH-s' },
          { 'value': 'SRPAN', 'label': 'SRPAN' },
          { 'value': 'SRPAN-s', 'label': 'SRPAN-s' },
          { 'value': 'SRUMA', 'label': 'SRUMA' },
          { 'value': 'SRUMA-s', 'label': 'SRUMA-s' },
          { 'value': 'SRVAL', 'label': 'SRVAL' },
          { 'value': 'SRYFS', 'label': 'SRYFS' }
        ],
        placeholder: 'TRT Population ID',
        argName: 'TRT_POPID'
      }
    ]
  }

  iptdsLgr(): filterOptions[] {
    return [
      {
        options: this.buildIntArray(2010, this.current_year), // 2010-
        placeholder: 'Spawn Year',
        argName: 'SpawnYear'
      },
      {
        options: [
          { 'value': 'Chinook', 'label': 'Chinook' },
          { 'value': 'Chinook Salmon', 'label': 'Chinook Salmon' },
          { 'value': 'Steelhead', 'label': 'Steelhead' }
        ],
        placeholder: 'Species',
        argName: 'Species'
      },
      {
        options: [
          { 'value': 'Spring/Summer', 'label': 'Spring/Summer' },
          { 'value': 'Summer', 'label': 'Summer' },
        ],
        placeholder: 'Run',
        argName: 'Run'
      }
    ]
  }

  iptdsRecruits(): filterOptions[] {
    return [
      {
        options: [
          { 'value': 'Recruits', 'label': 'Recruits' },
          { 'value': 'Spawners', 'label': 'Spawners' },
          { 'value': 'lambda', 'label': 'lambda' }
        ],
        placeholder: 'Variable',
        argName: 'Variable'
      },
      {
        options: this.buildIntArray(2010, this.current_year), // 2010-
        placeholder: 'Brood Year',
        argName: 'BroodYear'
      },
      {
        options: [
          { 'value': 'Chinook Salmon', 'label': 'Chinook Salmon' },
          { 'value': 'Steelhead', 'label': 'Steelhead' }
        ],
        placeholder: 'Species',
        argName: 'Species'
      },
      {
        options: [
          { 'value': 'Spring/Summer', 'label': 'Spring/Summer' },
          { 'value': 'Summer', 'label': 'Summer' }
        ],
        placeholder: 'Run',
        argName: 'Run'
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
      options: [
        { 'value': 'BDA', 'label': 'BDA' },
        { 'value': 'CDR', 'label': 'CDR' },
        { 'value': 'IMN', 'label': 'IMN' },
        { 'value': 'JLV', 'label': 'JLV' },
        { 'value': 'NPC', 'label': 'NPC' },
        { 'value': 'PAK', 'label': 'PAK' },
        { 'value': 'SCS', 'label': 'SCS' }
      ],
      placeholder: 'MRR Project',
      argName: 'MRRProject'
    },
    {
      options: [
        { 'value': 'CLWR', 'label': 'CLWR' },
        { 'value': 'CLWRSF', 'label': 'CLWRSF' },
        { 'value': 'IMNTRP', 'label': 'IMNTRP' },
        { 'value': 'JACKSC', 'label': 'JACKSC' },
        { 'value': 'JOHNSC', 'label': 'JOHNSC' },
        { 'value': 'JOHTRP', 'label': 'JOHTRP' },
        { 'value': 'LOLOC', 'label': 'LOLOC' },
        { 'value': 'LOLTRP', 'label': 'LOLTRP' },
        { 'value': 'LSFTRP', 'label': 'LSFTRP' },
        { 'value': 'MCCA', 'label': 'MCCA' },
        { 'value': 'NEWSOC', 'label': 'NEWSOC' },
        { 'value': 'NPTH', 'label': 'NPTH' },
        { 'value': 'SECTRP', 'label': 'SECTRP' },
        { 'value': 'SFCTRP', 'label': 'SFCTRP' },
        { 'value': 'SIXMIC', 'label': 'SIXMIC' }
      ],
      placeholder: 'Event Site',
      argName: 'EventSite'
    },
    {
      options: [
        { 'value': 'Mark', 'label': 'Mark' },
        { 'value': 'Passive Recapture', 'label': 'Passive Recapture' },
        { 'value': 'Recapture', 'label': 'Recapture' },
        { 'value': 'Recovery', 'label': 'Recovery' },
        { 'value': 'Tally', 'label': 'Tally' }
      ],
      placeholder: 'Event Type',
      argName: 'EventType'
    },
    {
      options: [
        { 'value': 'BSEINE', 'label': 'Beach Seine' },
        { 'value': 'DIPNET', 'label': 'Dip Net' },
        { 'value': 'FYKNET', 'label': 'Fyke Net' },
        { 'value': 'HOOK', 'label': 'Hook and Line' },
        { 'value': 'SCREWT', 'label': 'Screw Trap' },
        { 'value': 'SHOCK', 'label': 'Electro-Shock' },
        { 'value': 'WTRAP', 'label': 'Weir Trap' }
      ],
      placeholder: 'Capture Method',
      argName: 'CaptureMethod'
    },
    {
      options: [
      { 'value': '00U', 'label': '00U' },
      { 'value': '05U', 'label': '05U' },
      { 'value': '11H', 'label': '11H' },
      { 'value': '11U', 'label': '11U' },
      { 'value': '11W', 'label': '11W' },
      { 'value': '12H', 'label': '12H' },
      { 'value': '12U', 'label': '12U' },
      { 'value': '12W', 'label': '12W' },
      { 'value': '13H', 'label': '13H' },
      { 'value': '13U', 'label': '13U' },
      { 'value': '13W', 'label': '13W' },
      { 'value': '15U', 'label': '15U' },
      { 'value': '15W', 'label': '15W' },
      { 'value': '25H', 'label': '25H' },
      { 'value': '25W', 'label': '25W' },
      { 'value': '30W', 'label': '30W' },
      { 'value': '32H', 'label': '32H' },
      { 'value': '32U', 'label': '32U' },
      { 'value': '32W', 'label': '32W' },
      { 'value': '34W', 'label': '34W' },
      { 'value': '35H', 'label': '35H' },
      { 'value': '35U', 'label': '35U' },
      { 'value': '3RU', 'label': '3RU' },
      { 'value': '3RW', 'label': '3RW' },
      { 'value': '45W', 'label': '45W' },
      { 'value': '7RW', 'label': '7RW' },
      { 'value': '85W', 'label': '85W' },
      { 'value': '8RW', 'label': '8RW' },
      { 'value': '90U', 'label': '90U' },
      { 'value': 'A0W', 'label': 'A0W' },
      { 'value': 'BH', 'label': 'BH' },
      { 'value': 'BL', 'label': 'BL' },
      { 'value': 'BM', 'label': 'BM' },
      { 'value': 'BU', 'label': 'BU' },
      { 'value': 'CM', 'label': 'CM' },
      { 'value': 'D0W', 'label': 'D0W' },
      { 'value': 'DA', 'label': 'DA' },
      { 'value': 'ERU', 'label': 'ERU' },
      { 'value': 'G0W', 'label': 'G0W' },
      { 'value': 'I0W', 'label': 'I0W' },
      { 'value': 'J0W', 'label': 'J0W' },
      { 'value': 'L0W', 'label': 'L0W' },
      { 'value': 'LD', 'label': 'LD' },
      { 'value': 'LU', 'label': 'LU' },
      { 'value': 'MS', 'label': 'MS' },
      { 'value': 'NFD', 'label': 'NFD' },
      { 'value': 'PM', 'label': 'PM' },
      { 'value': 'RS', 'label': 'RS' },
      { 'value': 'SC', 'label': 'SC' },
      { 'value': 'SD', 'label': 'SD' },
      { 'value': 'SS', 'label': 'SS' }
    ],
      placeholder: 'SRR Code', // SpeciesRunRearType
      argName: 'SRRcode'
    },
    {
      options: this.buildIntArray(2002, this.current_year),
      placeholder: 'Migration Year',
      argName: 'MigrationYear'
    },
    {
      options: this.buildIntArray(2000, this.current_year),
      placeholder: 'Brood Year',
      argName: 'BroodYear'
    }//,
      // {
      //   options: this.buildIntArray(2002, this.current_year),
      //   placeholder: 'Calendar Year',
      //   argName: 'CalendarYear'
      // }
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
      options: this.buildIntArray(1999, this.current_year),
      placeholder: 'Year (required)',
      argName: 'Year',
      required: true,
    },
    // {
    //   options: [],
    //   placeholder: 'Location',
    //   argName: 'LocationId'
    // },
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
