import { environment } from "src/environments/environment";

export function buildImageUrl(imageUrl: string) {
    console.log('buildImageUrl:', `${environment.apiUrl}${imageUrl}`)
    
    if(environment.apiUrl === '') {
        console.log('using localhost');
        return `http://localhost:8000${imageUrl}`
    }

    return `${environment.apiUrl}${imageUrl}`;
}