import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor( private http : HttpClient ) {
  }


  getOrderList(){
    return this.http.get(environment.BaseURI + '/orders' );
  }


  postOrder(formData){
  return this.http.post(environment.BaseURI + '/orders' , formData);
}


putOrder(formData){
  return this.http.put(environment.BaseURI + '/orders/' + formData.Id, formData);
}


deleteOrder(id){
  return this.http.delete(environment.BaseURI +'/orders/'+ id);
}


}


