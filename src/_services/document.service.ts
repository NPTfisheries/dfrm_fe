import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Observable, map } from 'rxjs';
import { Document } from 'src/_models/interfaces';
import { LookUp } from 'src/_models/interfaces';
import { LookUpService } from './lookup.service';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private readonly endpoint = 'documents';

    constructor(
        private dataService: DataService<Document>,
        private lookupService: LookUpService
    ) { }

    getDocuments(): Observable<Document[]> {
        console.log('getDocuments');
        return this.dataService.getData(this.endpoint);
    }

    // getDocumentById(id: string): Observable<Document | undefined> {
    //     return this.getDocuments().pipe(
    //         map((documents: Document[]) => documents.find(Document => Document.slug == slug))
    //     )
    // }

    getDocumentsByTypeId(document_type_id: number | string): Observable<Document[]> {
        console.log(`getDocumentsByTypeId: ${document_type_id}`);
        return this.getDocuments().pipe(
            map((documents: any[]) => documents.filter(document => document.document_type.id == document_type_id))
        );
    }

    // getDocumentTypes(): Observable<LookUp[]> {
    //     console.log('getDocumentTypes');
    //     return this.dataService.getData('lookup').pipe(
    //         map((lookups: LookUp[]) => lookups.filter(lookup => lookup.object_type == 'Document'))
    //     );
    // }

    getDocumentTypes(): Observable<LookUp[]> {
        return this.lookupService.getLookUpsByObjectType('Document')
    }

    refreshDocuments(): Observable<Document[]> {
        return this.dataService.refreshData(this.endpoint);
    }

    clearDocumentsCache(): void {
        this.dataService.clearCache(this.endpoint);
    }
}
