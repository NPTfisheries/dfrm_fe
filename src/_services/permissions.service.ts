// import { Injectable } from '@angular/core';
// import { DataService } from './data.service';
// import { Observable } from 'rxjs';

// @Injectable({
//     providedIn: 'root'
// })
// export class PermissionsService {
//     private readonly endpoint = 'facility';

//     constructor(private dataService: DataService<Facility>) { }

//     getFacilities(): Observable<Facility[]> {
//         console.log('getFacilities called.');
//         return this.dataService.getData(this.endpoint);
//     }

//     refreshFacilities(): Observable<Facility[]> {
//         return this.dataService.refreshData(this.endpoint);
//     }

//     clearFacilitiesCache(): void {
//         this.dataService.clearCache(this.endpoint);
//     }
// }
