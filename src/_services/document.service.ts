import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Document } from 'src/_models/document';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private readonly endpoint = 'document';

    constructor(private dataService: DataService<Document>) { }

    getDocuments(): Observable<Document[]> {
        console.log('getDocuments called');
        return this.dataService.getData(this.endpoint);
    }

    // getDocumentBySlug(slug: string): Observable<Document | undefined> {
    //     return this.getDocuments().pipe(
    //         map((documents: Document[]) => documents.find(Document => Document.slug == slug))
    //     )
    // }

    refreshDocuments(): Observable<Document[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearDocumentsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
