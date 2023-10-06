import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}
  productName: string;
  varietyName: string;

  country: string;

  ngOnInit(): void {}
  ngOnChanges(): void {}

  onSelectedProduct(value: string) {
    this.productName = value;
    localStorage.setItem("product", this.productName);
    if (this.productName == "POTATOES") {
      localStorage.setItem("variety", this.varietyName);
    } else {
      localStorage.setItem("variety", "NONE");
    }
  }
  onSelectedVariety(value) {
    this.varietyName = value;
    if (this.productName == "POTATOES") {
      localStorage.setItem("variety", this.varietyName);
    } else {
      localStorage.setItem("variety", "NONE");
    }
  }
  onSelectedCountry(value: string) {
    this.country = value;
    localStorage.setItem("country", this.country);
  }
  onClick() {
    this.router.navigate(["/dashboard/products"]);
  }
}
