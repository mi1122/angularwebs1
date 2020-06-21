import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import {CustomerService} from '../shared/customer.service';
import {OrderService} from './order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  orderForms : FormArray = this.fb.array([]);
  productList = [];
  customerList = [];
  orderList = [];
  notification = null;
 
  constructor(private fb: FormBuilder, private productService : ProductService ,private customerService : CustomerService, private orderService :  OrderService ) { }

  ngOnInit() {

    this.productService.getProductList().subscribe(res => this.productList = res as []);
    this.customerService.getCustomerList().subscribe(res => this.customerList = res as []);
    this.orderService.getOrderList().subscribe(res => {

      if(res == [])
      this.addOrderForm();
      else{

        (res as []).forEach((order : any) => {this.orderForms.push(this.fb.group({

          Id : [order.id],
          productQuantity : [order.productQuantity, Validators.required],
          productPrice : [order.productPrice, Validators.required],
          productId : [order.productId, Validators.min(1)],
          customerId : [order.customerId, Validators.min(1)],
        }));
      })
    };
      })
  }

  addOrderForm(){

    this.orderForms.push(this.fb.group({

      Id : [0],
      productId : [0, Validators.min(1)],
      customerId : [0, Validators.min(1)],
      productPrice : ['', Validators.required],
      productQuantity : ['', Validators.required],
  
    }));
  }


recordSubmit(fg: FormGroup){

 if(fg.value.Id == 0)
  this.orderService.postOrder(fg.value).subscribe(
     (res : any)=> { fg.patchValue({Id : res.Id});
     this.showNotification('insert');
    });
    
else
 this.orderService.putOrder(fg.value).subscribe(

(res : any) => {fg.patchValue({ Id : res.Id });
this.showNotification('update');
}
);
}


onDelete(Id,i){

  if(Id == 0)
this.orderForms.removeAt(i);

else if(confirm("Are sure you want to delete this record?"))
  this.orderService.deleteOrder(Id).subscribe(
 (res : any) => {
  this.orderForms.removeAt(i);
  this.showNotification('delete');
 }
  )
}


showNotification(category){

 switch (category) {
  case 'update':
    this.notification = {class : 'text-success', message: 'updated!'};
     break;
   case 'insert':
     this.notification = {class : 'text-success', message: 'saved!'};
     break;
    
      case 'delete':
     this.notification = {class : 'text-danger', message: 'deleted!'};
      break;

   default:
    //this.notification = {class : 'text-info', message: 'UnSuccess!'}
     break;
 }
}

}
