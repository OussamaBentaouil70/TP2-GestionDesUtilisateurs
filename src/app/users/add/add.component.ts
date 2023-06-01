import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  first_name: string = "";
  last_name: string = "";
  email: string = "";
  avatar: string = "";
  showAlert: boolean = false;
  constructor(private userService: UsersService, private router: Router){}
  ngOnInit(): void {
   
  }
  onSubmit(): void {
    if (!this.first_name || !this.last_name || !this.email || !this.avatar) {
      return;
    }
  const  newUser = {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      avatar: this.avatar
    };
    
    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        this.showAlert = true;
        this.clearForm();
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
     //   this.router.navigate(["/users"]);

      },
      (error) => {
        console.error('Failed to create user:', error);

      }
    );

  }
  
  clearForm() {
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.avatar= "";
  }
}
