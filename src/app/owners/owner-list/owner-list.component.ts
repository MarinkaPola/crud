import {Component, OnInit} from '@angular/core';
import {Owner} from '../owner.model';
import {OwnerService} from '../owner.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {

  owner: Owner = {
    id: null,
    FirstName: '',
    LastName: '',
    MiddleName: '',
    cars: [],

  };
  edit = true;
  add = false;
  owners: Owner[] = [];
  private response: any;

  constructor(private ownerService: OwnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.getOwners();
  }

  private getOwners() {
    this.ownerService.getOwners().subscribe(owners => this.owners = owners);
  }

  public addOwner() {
    this.ownerService.createOwner(this.owner).subscribe(owner => {this.owner = owner; console.log(this.owner); });
    setTimeout(() => { this.router.navigate(['/owner/', this.owner.id]); }, 2000);

  }

  public OwnerEdit(owner: Owner) {
    this.router.navigate(['/owner/', owner.id]);
  }



  public removeOwner(owner: Owner) {
    console.log(owner);
    this.ownerService.deleteOwner(owner).subscribe(owner => {
      this.response = owner;
    }, );
    this.getOwners();
  }


  public showOwner(owner: Owner) {
    console.log(owner);
    this.router.navigate(['/owner/', owner.id]);
  }
}
