import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Reservation, ReservationAppService, ReservationRequest } from './reservation-app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reservation-app';
  
  constructor(private reservationService:ReservationAppService){}

  rooms: Room[];
  roomSearchForm: FormGroup;
  currentCheckInVal: string;
  currentCheckOutVal: string;
  currentPrice: number;
  currentRoomNumber: number;
  currentReservations: Reservation[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.roomSearchForm = new FormGroup({
      checkin: new FormControl(''),
      checkOut: new FormControl(''),
      roomNumber: new FormControl('')
    });

    this.roomSearchForm.valueChanges.subscribe( form=>{
      this.currentCheckInVal = form.checkin;
      this.currentCheckOutVal = form.checkOut;
      

      if(form.roomNumber){
        let roomValues: string[] = form.roomNumber.split('|');
        this.currentRoomNumber = Number(roomValues[0]);
        this.currentPrice = Number(roomValues[1]);
      }

    })

    this.rooms = [new Room("127","127","150"), new Room("128", "1287", "160"), new Room("129", "1300", "200")]
  }

  createReservation(){
    this.reservationService.createReservation(
      new ReservationRequest(
        this.currentRoomNumber, this.currentCheckInVal, this.currentCheckOutVal, this.currentPrice
      )).subscribe(
        reservationResponse=> {
          console.log(reservationResponse);
          this.getAllReservation();
        }
      );
  }

  getAllReservation(){
    this.reservationService.getReservation().subscribe(
      allReservationResponse=> {
        console.log(allReservationResponse);
        this.currentReservations = allReservationResponse;
      }
    );
  }
}

export class Room {
  id: string;
  roomNumber: string;
  price: string;

  constructor(id: string, roomNumber: string, price: string){
    this.id=id;
    this.roomNumber=roomNumber;
    this.price=price;
  }
}
