import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Image } from 'src/_models/image';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private readonly endpoint = 'image';

    constructor(private dataService: DataService<Image>) { }

    getImages(): Observable<Image[]> {
        console.log('getImages');
        return this.dataService.getData(this.endpoint);
    }

    // getImageById(slug: string): Observable<Image | undefined> {
    //     return this.getImages().pipe(
    //         map((projects: Image[]) => projects.find(image => image.slug == slug))
    //     )
    // }

    refreshImages(): Observable<Image[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearImagesCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
