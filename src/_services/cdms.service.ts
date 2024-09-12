import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: 'root' })
export class CdmsService {

    // apiUrl: string = 'https://npt-cdms.nezperce.org';
    apiUrl: string = ''; // necessary for proxy to function (dev)
    apiVersion: string = '/services/api/v1/';
    authCookie!: string;

    allowed_datastores = [78, 79, 85, 86, 92, 97, 99, 100, 102, 103, 104, 107, 110, 111, 113, 122] // Age: 80

    constructor(
        private http: HttpClient,
    ) { }

    whoami(){
        return this.get('account/whoami')
    }

    login(username: string, api_key: string) {
        const endpoint = 'account/login';
        const reqUrl = `${this.apiUrl}${this.apiVersion}${endpoint}`;
        const body = { Username: username, Password: api_key };
        const headers = new HttpHeaders({
            'Prefer': 'respond-async',
            'Content-Type': 'application/json'
        });

        return this.http.post(reqUrl, body, { headers, observe: 'response', withCredentials: true }).pipe(
            map((response: any) => {
                console.log('Login Response:', response);
                if (response.status === 200) {
                    console.log(`Logged in as: ${response.body.User['Fullname']}`);
                    this.authCookie = response.headers.get('Set-Cookie');
                    console.log('Set-Cookie:', this.authCookie);
                }
                return response;
            })
        );
    }

    getDataset(datased_id: number) {
        return this.get('dataset/getdataset').pipe(
            map((dataset: any[]) => {
                console.log(dataset);
                return dataset
            })
        );
    }

    getDatasetsList(datastoreId?: number) {
        // get full list
        return this.get('dataset/getdatasetslist').pipe(
            map((datasets: any[]) => {
                // console.log(datasets);
                return datasets
                    .filter((dataset: any) => datastoreId ? dataset.DatastoreId === datastoreId : true)
                    .map((dataset: any) => ({
                        'datasetId': dataset.Id,
                        'projectName': dataset.ProjectName,
                        'projectId': dataset.ProjectId,
                        'datastoreName': dataset.DatastoreName,
                        'datastoreId': dataset.DatastoreId
                    }));
            })
        );
    }

    getDatastores() {
        return this.get('datastore/getdatastores').pipe(
            map((datastores: any[]) => {
                // console.log(datastores);
                return datastores
                    .filter((datastore: any) => this.allowed_datastores.includes(datastore.Id))
                    .map((datastore: any) => ({
                        'Id': datastore.Id,
                        'Name': datastore.Name
                    }))
                    .sort((a: any, b: any) => a.Name.localeCompare(b.Name));
            })

        );
    }

    getProjects() {
        return this.get('project/getprojects').pipe(
            map((projects: any[]) => {
                return projects.map((project: any) => ({
                    'Id': project.Id,
                    'Name': project.Name
                }));
            })
        );
    }

    getProjectDatasets(projectId: number) {
        let params = { 'id': projectId };

        return this.get('project/getprojectdatasets', params);
    }

    // CDMS queries
    getDatastoreView(datastoreId: number, projectId?: string): Observable<any> {
        const reqUrl = `${this.apiUrl}${this.apiVersion}npt/getfulldatasetview`;
        let params = new HttpParams().set('id', datastoreId);

        if (projectId) {
            params = params.set('ProjectId', projectId);
        }

        return this.http.get(reqUrl, { params }).pipe(
            map(response => response)
        );
    }

    // PIKUN queries
    getCarcassData(params: { [key: string]: any }) {
        console.log('getCarcassData');
        return this.get('npt/getsgscarcassdata', params)
    }

    getCarcassDataNEOR(params: { [key: string]: any }) {
        console.log('getCarcassDataNEOR');
        return this.get('npt/getsgscarcassdataneor', params)
    }

    getFallRR(params: { [key: string]: any }) {
        console.log('getFallRR');
        return this.get('npt/getfcrrdata', params)
    }

    getIPTDSesc(params: { [key: string]: any }) {
        console.log('getIPTDSesc');
        return this.get('npt/getiptdsescdata', params)
    }

    getIPTDSlgr(params: { [key: string]: any }) {
        console.log('getIPTDSlgr');
        return this.get('npt/getiptdslgrdata', params)
    }

    getIPTDSrecruits(params: { [key: string]: any }) {
        console.log('getIPTDSrecruits');
        return this.get('npt/getiptdsrecruitsdata', params)
    }

    getJuvAbundance(params: { [key: string]: any }) {
        console.log('getJuvAbundance');
        return this.get('npt/getjuvabundancedata', params)
    }

    getJuvSurvival(params: { [key: string]: any }) {
        console.log('getJuvSurvival');
        return this.get('npt/getjuvsurvivaldata', params)
    }

    getP4data(params: { [key: string]: any }) {
        console.log('getP4data');
        return this.get('npt/getp4data', params)
    }

    getReddData(params: { [key: string]: any }) {
        console.log(`getReddData, params: ${params}`);
        return this.get('npt/getsgsredddata', params)
    }

    getReddDataNEOR(params: { [key: string]: any }) {
        console.log('getReddDataNEOR');
        return this.get('npt/getsgsredddataneor', params)
    }

    getSpawningData(params: { [key: string]: any }) {
        console.log('getSpawningData');
        return this.get('npt/getfinsspawningdata', params)
    }

    getWaterTempData(params: { [key: string]: any }) {
        console.log('getWaterTempData');
        return this.get('npt/getwatertempdata', params)
    }

    getWeirData(params: { [key: string]: any }) {
        console.log('getWeirData');
        return this.get('npt/getfinsweirdata', params)
    }


    // helper
    get(endpoint: string, params?: { [key: string]: any }) {
        const reqUrl = `${this.apiUrl}${this.apiVersion}${endpoint}`;

        let requestParams = new HttpParams();
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    requestParams = requestParams.append(key, params[key].toString());
                }
            });
        }

        // return this.http.get(reqUrl, { params: requestParams, observe: 'response', withCredentials: true }).pipe(
        // observe:'response' breaks localhost for some reason. 
        return this.http.get(reqUrl, { params: requestParams, withCredentials: true }).pipe(
                map((response: any) => {
                return response;
            })
        );
    }

}