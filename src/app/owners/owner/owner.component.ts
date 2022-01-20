import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import {Owner} from '../owner.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OwnerService} from '../owner.service';
import {Location} from '@angular/common';
import {Car} from '../../interface';


@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  params: Params = {};
  submitted = false;
  owner!: Owner;
  form!: FormGroup;
  private subscription: Subscription;
  private SubOwner!: Subscription;
  private error: any;
  id!: number | null | undefined;
  FirstName!: string;
  LastName!: string;
  MiddleName!: string;
  brand!: string;
  year!: number;
  model!: string;
  number!: string;
  hidden!: boolean;


  addCarSub = new Subject<any>();
  eventAddCar = false;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private ownerService: OwnerService, private fb: FormBuilder) {

    this.subscription = route.params.subscribe(params => this.params.owner_id = params.id);
    console.log(this.params);


    this.form = this.fb.group({
      id: [this.params.owner_id, [Validators.required]],
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      MiddleName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[ABCEHIKMOPTX]{2}\d{4}(?<!0{4})[ABCEHIKMOPTX]{2}$')]],
      brand: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      model: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  ngOnInit(): void {

    this.SubOwner = this.ownerService.getOwnerById(this.params.owner_id).subscribe(data => {
        this.owner = data;
        console.log(this.owner);
      },
      error => {
        this.error = error.message;
        console.log(error);
      }, );

    setTimeout(() => {
      this.form = this.fb.group({
        id: [this.params.owner_id, [Validators.required]],
        FirstName: [this.owner.FirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        LastName: [this.owner.LastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        MiddleName: [this.owner.MiddleName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      });
    }, 1000);

    this.subscription = this.getAddCar().subscribe(data => { if (data.event === 'addCar') {
      console.log(data.event);

      this.form = this.fb.group({
        id: [this.params.owner_id, [Validators.required]],
        FirstName: [this.owner.FirstName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        LastName: [this.owner.LastName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        MiddleName: [this.owner.MiddleName, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        number: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[ABCEHIKMOPTX]{2}\d{4}(?<!0{4})[ABCEHIKMOPTX]{2}$')]],
        brand: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
        model: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
        year: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      });
    } });
  }


  submit() {
    this.submitted = true;

    const car: Car = {
      number: this.form.value.number,
      brand: this.form.value.brand,
      model: this.form.value.model,
      year: this.form.value.year,
    };
    const car1 = [car];
    console.log(this.owner.cars);

    const owner: Owner = {
      id: this.form.value.id,
      FirstName: this.form.value.FirstName,
      LastName: this.form.value.LastName,
      MiddleName: this.form.value.MiddleName,
      cars: this.owner.cars?.concat(car1)
    };
    console.log(this.owner.cars?.concat(car1));
    console.log(owner);
    this.ownerService.editOwner(owner).subscribe(() => this.router.navigate(['']));


  }


  removeCar(car: Car) {
    this.ownerService.editOwnerCar(car, this.owner)?.subscribe(() => this.router.navigate(['/owner/', this.owner.id]));
  }

  back() {
    this.router.navigate(['']);
  }

  getAddCar(): Observable<any> {
    return this.addCarSub.asObservable();
  }

  addCar(event: Event) {
    this.hidden = false;
    this.eventAddCar = true;
    this.addCarSub.next({event: 'addCar'});
  }

}
