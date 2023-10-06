import {
  Component,
  ElementRef,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { drawing, exportPDF } from "@progress/kendo-drawing";
import { DashboardServiceService } from "app/components/service/dashboard-service.service";
import { environment } from "environments/environment";
import {
  ChartComponent,
  SeriesLabelsContentArgs,
} from "@progress/kendo-angular-charts";
import { saveAs } from "@progress/kendo-file-saver";
import { quantity } from "chartist";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  constructor(private dashboardServiceService: DashboardServiceService) {}

  title = "";
  categories = [];
  productionAverages = [];
  data = [];
  vracPrices = [];
  years = [];
  currentPrices = [];
  exportationsInTons = [];
  exportationsInCurrency = [];
  temperatures = [];
  performances = [];
  rainfalls = [];
  yearsPart = [];
  country;
  product;
  yearsList = [];
  minDate = 2010;
  maxDate = 2023;
  column = "column";
  env = environment;
  variety = "NONE";

  @Output() averageArea;
  @Output() averageProduction;
  @Output() averageExportationPrice;
  @Output() averageQuantity;
  @ViewChild("pdfExportContainer", { static: false })
  pdfExportContainer: ElementRef;
  @ViewChild("firstChart", { static: false }) firstChart: ChartComponent;
  @ViewChild("secondChart", { static: false }) secondChart: ChartComponent;
  @ViewChild("thirdChart", { static: false }) thirdChart: ChartComponent;
  @ViewChild("fourthChart", { static: false }) fourthChart: ChartComponent;
  @ViewChild("fifthChart", { static: false }) fifthChart: ChartComponent;
  @ViewChild("sixthChart", { static: false }) sixthChart: ChartComponent;
  @ViewChild("seventhChart", { static: false }) seventhChart: ChartComponent;
  @ViewChild("eightChart", { static: false }) eightChart: ChartComponent;

  ngOnInit() {
    if (localStorage.getItem("product")) {
      this.title = this.transformText(localStorage.getItem("product"));
      this.product = localStorage.getItem("product");
    }
    if (localStorage.getItem("country")) {
      this.country = localStorage.getItem("country");
    }

    if (localStorage.getItem("variety")) {
      this.variety = localStorage.getItem("variety");
    }
    if (this.product != "OLIVE_OIL") {
      this.getDetailsPerCountryAndProductAndVariety();
    } else {
      this.getDetailsPerCountryAndProduct();
    }
    this.getAverageAreaPerGovAndCountryAndProduct();
  }

  exportCharts() {
    const group = new drawing.Group();
    group.append(this.firstChart.exportVisual());
    group.append(this.secondChart.exportVisual());
    group.append(this.seventhChart.exportVisual());
    group.append(this.eightChart.exportVisual());

    if (this.exportationsInTons.length > 0) {
      group.append(this.thirdChart.exportVisual());
    }
    if (this.exportationsInCurrency.length > 0) {
      group.append(this.fourthChart.exportVisual());
    }
    if (this.data.length > 0) {
      group.append(this.fifthChart.exportVisual());
    }
    if (this.productionAverages.length > 0) {
      group.append(this.sixthChart.exportVisual());
    }
    exportPDF(group, {
      paperSize: "A4",
      landscape: true,
      multiPage: true,
    }).then((dataURI) => {
      saveAs(dataURI, "rapport.pdf");
    });
  }
  onYearSelected() {
    this.getDetailsPerCountryAndProductAndVarietyAndYear();
  }

  exportChart(value): void {
    var visual;

    switch (value) {
      case 1:
        visual = this.firstChart.exportVisual();
        break;
      case 2:
        visual = this.secondChart.exportVisual();
        break;
      case 3:
        visual = this.thirdChart.exportVisual();
        break;
      case 4:
        visual = this.fourthChart.exportVisual();
        break;
      case 5:
        visual = this.fifthChart.exportVisual();
        break;
      case 6:
        visual = this.sixthChart.exportVisual();
        break;
      case 7:
        visual = this.seventhChart.exportVisual();
        break;
      case 8:
        visual = this.eightChart.exportVisual();
        break;
      default:
        break;
    }

    exportPDF(visual, {
      paperSize: "A4",
      landscape: true,
    }).then((dataURI) => {
      saveAs(dataURI, "chart.pdf");
    });
  }

  transformText(text: string): string {
    // Replace underscores with spaces
    const words = text.split("_").map((word) => word.toLowerCase());

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the words with spaces
    const transformedText = capitalizedWords.join(" ");

    return transformedText;
  }

  onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  getAverageAreaPerGovAndCountryAndProduct() {
    this.dashboardServiceService
      .averageAreaPerGovAndCountryAndProduct(this.country, this.product)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          const transformedData = response.map((item: any) => {
            return {
              kind: item.governorate,
              share: item.average,
              productionAverage: item.productionAverage,
            };
          });
          const categories = response.map((item: any) => {
            return item.governorate;
          });

          const productionAverages = response.map((item: any) => {
            return item.productionAverage;
          });

          // Assign transformed data to public data property
          this.data = transformedData;
          this.categories = categories;
          this.productionAverages = productionAverages;
        }
      });
  }

  getDetailsPerCountryAndProduct() {
    this.dashboardServiceService
      .detailsPerCountryAndProduct(this.country, this.product)
      .subscribe((response) => {
        if (response != null && response != undefined) {
          const vracPrices = response.map((item: any) => {
            return item.priceWithoutInflation
              ? item.priceWithoutInflation
              : 0.0;
          });

          const currentPrices = response.map((item: any) => {
            return item.currentPrice ? item.currentPrice : 0.0;
          });

          const years = response
            .map((item: any) => {
              return item.year;
            })
            .filter(this.onlyUnique);

          const exportationsInTons = response
            .map((item: any) => {
              return item.exportationInTons;
            })
            .filter((el) => el != null);
          const exportationsInCurrency = response
            .map((item: any) => {
              return item.exportationInDT;
            })
            .filter((el) => el != null);

          const rainfalls = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageRainfall;
            });
          const temperatures = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageTemperature;
            });

          const performances = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.performanceInTonnesPerHectare * 1000;
            });
          const productions = response.map((item: any) => {
            return item.productionPerTons ? item.productionPerTons : 0.0;
          });
          const areas = response.map((item: any) => {
            return item.area;
          });
          const exportations = response.map((item: any) => {
            return item.exportationInDT ? item.exportationInDT : 0.0;
          });
          const quatities = response.map((item: any) => {
            return item.exportationInTons ? item.exportationInTons : 0.0;
          });

          const sumAr = areas.reduce((a, b) => a + b, 0);
          const sumProd = productions.reduce((a, b) => a + b, 0);
          const sumExp = exportations.reduce((a, b) => a + b, 0);
          const sumQuant = quatities.reduce((a, b) => a + b, 0);

          this.vracPrices = vracPrices;
          this.years = years;
          this.yearsPart = years.filter((el) => el >= 2010 && el <= 2017);
          this.yearsList = years;

          this.currentPrices = currentPrices;
          this.exportationsInTons = exportationsInTons;
          this.exportationsInCurrency = exportationsInCurrency;
          this.performances = performances;
          this.rainfalls = rainfalls;
          this.temperatures = temperatures;
          this.averageArea = (sumAr / areas.length || 0).toFixed(2);
          this.averageProduction = (sumProd / productions.length || 0).toFixed(
            2
          );
          this.averageExportationPrice = (
            sumExp / exportations.length || 0
          ).toFixed(2);
          this.averageQuantity = (sumQuant / quantity.length || 0).toFixed(2);
        }
      });
  }

  getDetailsPerCountryAndProductAndVarietyAndYear() {
    this.dashboardServiceService
      .detailsPerCountryAndProductAndVarietyAndYear(
        this.country,
        this.product,
        this.variety,
        this.minDate,
        this.maxDate
      )
      .subscribe((response) => {
        if (response != null && response != undefined) {
          const vracPrices = response.map((item: any) => {
            return item.priceWithoutInflation
              ? item.priceWithoutInflation
              : 0.0;
          });

          const currentPrices = response.map((item: any) => {
            return item.currentPrice ? item.currentPrice : 0.0;
          });

          const years = response
            .map((item: any) => {
              return item.year;
            })
            .filter(this.onlyUnique);

          const exportationsInTons = response
            .map((item: any) => {
              return item.exportationInTons;
            })
            .filter((el) => el != null);
          const exportationsInCurrency = response
            .map((item: any) => {
              return item.exportationInDT;
            })
            .filter((el) => el != null);

          const rainfalls = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageRainfall;
            });
          const temperatures = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageTemperature;
            });

          const performances = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.performanceInTonnesPerHectare * 1000;
            });
          const productions = response.map((item: any) => {
            return item.productionPerTons ? item.productionPerTons : 0.0;
          });
          const areas = response.map((item: any) => {
            return item.area;
          });
          const exportations = response.map((item: any) => {
            return item.exportationInDT ? item.exportationInDT : 0.0;
          });
          const quatities = response.map((item: any) => {
            return item.exportationInTons ? item.exportationInTons : 0.0;
          });

          const sumAr = areas.reduce((a, b) => a + b, 0);
          const sumProd = productions.reduce((a, b) => a + b, 0);
          const sumExp = exportations.reduce((a, b) => a + b, 0);
          const sumQuant = quatities.reduce((a, b) => a + b, 0);

          this.vracPrices = vracPrices;
          this.years = years;
          this.yearsPart = years.filter((el) => el >= 2010 && el <= 2017);

          this.currentPrices = currentPrices;
          this.exportationsInTons = exportationsInTons;
          this.exportationsInCurrency = exportationsInCurrency;
          this.performances = performances;
          this.rainfalls = rainfalls;
          this.temperatures = temperatures;
          this.averageArea = (sumAr / areas.length || 0).toFixed(2);
          this.averageProduction = (sumProd / productions.length || 0).toFixed(
            2
          );
          this.averageExportationPrice = (
            sumExp / exportations.length || 0
          ).toFixed(2);
          this.averageQuantity = (sumQuant / quantity.length || 0).toFixed(2);
        }
      });
  }

  getDetailsPerCountryAndProductAndVariety() {
    this.dashboardServiceService
      .detailsPerCountryAndProductAndVariety(
        this.country,
        this.product,
        this.variety
      )
      .subscribe((response) => {
        if (response != null && response != undefined) {
          const vracPrices = response.map((item: any) => {
            return item.priceWithoutInflation
              ? item.priceWithoutInflation
              : 0.0;
          });

          const currentPrices = response.map((item: any) => {
            return item.currentPrice ? item.currentPrice : 0.0;
          });

          const years = response
            .map((item: any) => {
              return item.year;
            })
            .filter(this.onlyUnique);

          const exportationsInTons = response
            .map((item: any) => {
              return item.exportationInTons;
            })
            .filter((el) => el != null);

          const exportationsInCurrency = response
            .map((item: any) => {
              return item.exportationInDT;
            })
            .filter((el) => el != null);

          const rainfalls = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageRainfall;
            });
          const temperatures = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.averageTemperature;
            });

          const performances = response
            .filter((el) => el.year >= 2010 && el.year <= 2017)
            .map((item: any) => {
              return item.performanceInTonnesPerHectare * 1000;
            });
          const productions = response.map((item: any) => {
            return item.productionPerTons ? item.productionPerTons : 0.0;
          });
          const areas = response.map((item: any) => {
            return item.area;
          });
          const exportations = response.map((item: any) => {
            return item.exportationInDT ? item.exportationInDT : 0.0;
          });
          const quatities = response.map((item: any) => {
            return item.exportationInTons ? item.exportationInTons : 0.0;
          });

          const sumAr = areas.reduce((a, b) => a + b, 0);
          const sumProd = productions.reduce((a, b) => a + b, 0);
          const sumExp = exportations.reduce((a, b) => a + b, 0);
          const sumQuant = quatities.reduce((a, b) => a + b, 0);

          this.vracPrices = vracPrices;
          this.years = years;
          this.yearsPart = years.filter((el) => el >= 2010 && el <= 2017);
          this.yearsList = years;

          this.currentPrices = currentPrices;
          this.exportationsInTons = exportationsInTons;
          this.exportationsInCurrency = exportationsInCurrency;
          this.performances = performances;
          this.rainfalls = rainfalls;
          this.temperatures = temperatures;
          this.averageArea = (sumAr / areas.length || 0).toFixed(2);
          this.averageProduction = (sumProd / productions.length || 0).toFixed(
            2
          );
          this.averageExportationPrice = (
            sumExp / exportations.length || 0
          ).toFixed(2);
          this.averageQuantity = (sumQuant / quantity.length || 0).toFixed(2);
        }
      });
  }

  labelContent(e: SeriesLabelsContentArgs): string {
    return `${e.category}: ${e.value}`;
  }
}
