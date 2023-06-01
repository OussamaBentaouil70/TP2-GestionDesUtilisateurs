import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { HttpUsersListResponse, UserType } from 'src/app/types/users.type';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: UserType[] = [];
  currentPage: number = 1;
  totalPages: number = 1;
  totalPagesArray: number[] = [];

constructor(private usersService: UsersService, private router: Router){}
  ngOnInit(): void {
   this.getUsers(this.currentPage);
  }
  getUsers(page: number): void {
    this.usersService.getUsers(page).subscribe(
      (response: HttpUsersListResponse) => {
        this.users = response.data;
        this.totalPages = response.total_pages;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }
  goToPage(pageNumber: number, event: Event): void {
    event.preventDefault(); 
  
   
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getUsers(this.currentPage);
      window.location.hash = `${pageNumber}`; 
    }
  }
  

  goToPreviousPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getUsers(this.currentPage);
    }
  }
  

  goToNextPage(event: Event): void {
    event.preventDefault();
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getUsers(this.currentPage);
    }
  }
  getPageLink(pageNumber: number): string {
    return `#${pageNumber}`;
  }
  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.usersService.deleteUser(userId).subscribe(
        () => {
          console.log('User deleted successfully.');
          this.users = this.users.filter(user => user.id !== userId);
          this.router.navigate(['/users']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }
  
}
