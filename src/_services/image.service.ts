import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Image } from 'src/_models/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private readonly endpoint = 'images';

    constructor(private dataService: DataService<Image>) { }

    getImages(): Observable<Image[]> {
        // console.log('getImages');
        return this.dataService.getData(this.endpoint);
    }

    getImageById(id: number | string): Observable<Image | undefined> {
        return this.getImages().pipe(
            map((images: Image[]) => images.find(image => image.id == id))
        )
    }

    // getImageOptions() {
    //     return this.getImages().pipe(
    //         map((images: Image[]) =>
    //             images.map(image => ({
    //                 key: image?.id?.toString(),
    //                 value: `${image.name} (Source: ${image.source})`
    //             }))
    //         )
    //     );
    // }

    refreshImages(): Observable<Image[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearImagesCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
