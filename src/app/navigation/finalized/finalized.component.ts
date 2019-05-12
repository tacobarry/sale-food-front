import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/core/model/purchase.model';
import { SandwichEnum } from 'src/app/core/enum/sandwich-enum.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finalized',
  templateUrl: './finalized.component.html',
  styleUrls: ['./finalized.component.scss']
})
export class FinalizedComponent implements OnInit {

  private purchase: Purchase;
  private amount: number;
  private urlImage: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.purchase = history.state.purchase;
    // console.log(this.purchase.value, this.purchase);
    this.amount = this.purchase.value || 0;
    this.urlImage = SandwichEnum.X_BACON;
  }

  startAgain() {
    this.router.navigate(['/']);
  }

}
