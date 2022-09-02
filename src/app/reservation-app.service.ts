import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationAppService {

  constructor(private http:HttpClient) { }

  private baseUrl:string= 'http://localhost:8080';
  private reservationUrl:string= this.baseUrl + '/room/v1/reservation/';

  getReservation(): Observable<Reservation[]> {
    console.log("I am here");
    return this.http.get<Reservation[]>(this.reservationUrl);
  }

  createReservation(body: ReservationRequest): Observable<Reservation> {
    let httpOption = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Reservation>(this.reservationUrl, body, httpOption);
  }
}

export class ReservationRequest {
  roomNumber: number;
  checkIn: string;
  checkOut: string;
  price: number;

  constructor(roomNumber: number, checkIn: string, checkOut: string, price: number){
    this.roomNumber = roomNumber;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.price = price;
  }
}

export interface Reservation{
  id: string;
  roomNumber: number;
  checkIn: Date;
  checkOut: Date;
  price: number;
}
