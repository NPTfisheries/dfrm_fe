import { environment } from "src/environments/environment";

export function buildImageUrl(imageUrl: string | undefined) {
    // console.log('buildImageUrl:', `${environment.apiUrl}${imageUrl}`)
    
    if(environment.apiUrl === '') {
        // console.log('using localhost');
        // console.log('buildImageUrl ACTIVATED!');
        return `http://localhost:8000/media/${imageUrl}`
    }

    return `${imageUrl}`;
}