import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gifs, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifsService {
    public gifList: Gifs[] = [];

    private _tagsHistory : string[] = [];
    private apikey       : string = 'mLFNXjgevvJICJa3Id1ysjrZeevOeOQQ';
    private servicesUrl  : string = 'https://api.giphy.com/v1/gifs';

    constructor(private http: HttpClient) {
        this.loadLocalStorage();
        console.log('Tags Gifs Services')
     }  

    get tagsHistory(){
        return[ ...this._tagsHistory];
    }   

    private organizeHistory(tag: string){
        if(this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag );
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,9);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void {
        if(!localStorage.getItem('history')) return;
        this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
        if( this._tagsHistory.length === 0) return;
        this.searchTag( this._tagsHistory[0]);
    }

     searchTag( tag:string): void {
        if(tag.length === 0) return;        
        this.organizeHistory(tag);

        const params = new HttpParams()
                .set('api_key',this.apikey)
                .set('limit','10')
                .set('q',tag);

        this.http.get<SearchResponse>(this.servicesUrl+'/search?'+params)
        .subscribe( resp =>{
            this.gifList = resp.data;
        });

        //fetch('https://api.giphy.com/v1/gifs/search?api_key=mLFNXjgevvJICJa3Id1ysjrZeevOeOQQ&q=naruto&limit=10')
        //.then( resp => resp.json())
        //.then( data => console.log(data))

    }
}