import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {Router, NavigationExtras} from "@angular/router";
import {ItemService} from "../../services/item.service";
import {Item} from "../../models/item";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public loggedIn = false;
  public keyword:string;
  public bookList:Item[] = [];

  constructor(
    public loginService: LoginService, 
    public router: Router, 
    public bookService:ItemService
  ) { }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn=true;
      },
      error => {
        this.loggedIn=false;
      }
    );
  }

  onSearchByTitle(){
    this.bookService.searchBook(this.keyword).subscribe(
      res => {
        this.bookList=res.json();

        let navigationExtras: NavigationExtras = {
            queryParams: {
                "bookList": JSON.stringify(this.bookList)
            }
        };

        this.router.navigate(['/itemList'], navigationExtras);
      },
      error => {
        console.log(error);
      }
    );
  }

  logout(){
    this.loginService.logout().subscribe(
      res => {
        location.reload();
      },
      err => console.log(err)
    );
    // location.reload();
    this.router.navigate(['/']);
  }

}
