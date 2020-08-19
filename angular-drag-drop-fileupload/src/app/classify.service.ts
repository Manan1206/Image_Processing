import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClassifyService {

  constructor(private http: HttpClient) { }

  classifyClothes(imageName) {
    console.log(imageName)
    imageName = imageName.toLowerCase().split(' ').join('-');
    let params = new HttpParams().set('image_name', imageName);
    return this.http.get('http://localhost:5000/classifyclothes', { params : params})
  }
}