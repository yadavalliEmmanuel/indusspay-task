import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss'],
})

export class EmployeeCreateComponent implements OnInit {
  genders=['male','female'];

  @Input() employeeDetails = {createdAt:'', first_name: '',last_name:'', emailId: '',age: '', gender:'', mobilenumber: '' , pan_no:'' , adhaar_no:'' , status: false };

  constructor(public restApi: RestApiService, public router: Router) {}

  // {
  //   "createdAt":"2024-02-05",
  //   "first_name":"testval",
  //   "last_name":"data",
  //   "emailId":"test@gmail.com",
  //   "age":20,
  //   "gender":"Male",
  //   "mobilenumber":8956231478,
  //   "pan_no":"CGBPA001",
  //   "adhaar_no":"895678954569",
  //   "status":true
  // }

  // post  Contact/profile
  // put /Contact/profile/1
  

  ngOnInit() {
    console.log(this.employeeDetails , 'create')
  }

  addEmployee(form: any) {
   
    if (form.valid) {
      this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.router.navigate(['/employees-list']);
    });
    } else {
      console.log('Form is invalid');
    }
  
    // this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
    //   this.router.navigate(['/employees-list']);
    // });
  }
}