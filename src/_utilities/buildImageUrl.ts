import { environment } from "src/environments/environment";

export function buildImageUrl(imageUrl: string | undefined) {
    // console.log('buildImageUrl:', `${environment.apiUrl}${imageUrl}`)    
    // all imageUrl should return in this format '/media/images/folder/imagename.jpg'

    // treatment for development / docker
    if(environment.apiUrl === '') {
        // console.log('using localhost');
        return `http://localhost:8000${imageUrl}`
    }

    return `${environment.apiUrl}${imageUrl}`;
}