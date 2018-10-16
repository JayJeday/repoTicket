import { Component, OnInit, Input } from '@angular/core';
import {Ticket} from  '../../core/models/ticket.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {TicketService} from '../../core/services/ticket.service'
import { Subscription } from 'rxjs/Subscription';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Summary } from 'src/app/dashboard/summary.model';


@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {

  @Input()listType;
  
  //by default
  @Input()filteredType;
  @Input()filteredProperty;

  //show normal list or filtered
  comp:string;
  techName:String;

  toogle:boolean = true;
  


  constructor(private ticketService:TicketService,
     private router: Router,
     private route: ActivatedRoute) { }

     
  ngOnInit() {
    this.ticketService.getTickets();
    
    console.log(this.ticketService.ticketList);
    
    console.log(this.filteredType);
    console.log(this.filteredProperty);
   
    //the data that the activated route bring
    //this.route.data.subscribe((data)=>{
     // this.filteredProperty = data['prop'];
      //enable specific button
     // if(this.filteredProperty ==='Status'){
        //by default filter for open
     //   this.filteredType = 'open';
     // }

     // if(this.filteredProperty === 'Category'){
      //  this.filteredType = 'computers';
     // }
      
   //});

    //pass value between component
   // this.ticketService.summaryActivated.next(this.ticketService.summary);
    
   //this.ticketService.filterChanged.next(this.ticketService.summary);

  }
  
  onTicketStatusFilter(){
    //toggle
    if(this.toogle){
      //search for close
      this.filteredType = 'close';
      this.toogle = !this.toogle;
    }else{
      this.filteredType = 'open';
     this.toogle =  !this.toogle;
    }
  }
  
  onTicketCategoryFilter(){
    //toggle
    if(this.toogle){
      //search for close
      this.filteredType = 'computers';
      this.toogle = !this.toogle;
    }else{
      this.filteredType = 'cell phones';
     this.toogle =  !this.toogle;
    }
  }

}
