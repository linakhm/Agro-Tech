import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

declare const $: any;

declare interface Categries {
  label?: string;
  cateeg?: string;
  id?: string;
  title?: string;
  class?: string;
  icon?: string;
  SubCat?: RouteInfo[];
}

declare interface Categry {
  label?: string;
  path?: string;
  cat?: string;
  title?: string;
  id?: string;
  class?: string;
  icon?: string;
  SubC?: SubCategries[];
}

declare interface SubCategries {
  label?: string;
  path?: string;
  title?: string;
  icon?: string;
  id?: string;
  class?: string;
}
declare interface RouteInfo {
  label?: string;
  category?: string;
  path?: string;
  title?: string;
  icon?: string;
  id?: string;
  class?: string;
  subCategories?: Categry[];

  //   <span class="material-symbols-outlined">
  // settings_applications
  // </span>
}
export const ROUTES: Categries[] = [
  {
    label: "menu.general-Setups",
    cateeg: "GeneralSetups",
    title: "menu.general-Setups",
    icon: "settings_applications",
    id: "GeneralSetups-dropdown",
    SubCat: [
      {
        label: "Admin",
        category: "Admin",
        icon: "3p",
        id: "Admin-dropdown",
        subCategories: [
         
       
           {
            label: "Fournisseurs",
             path: "/fournisseurs",
             title: "menu.vendors",
             icon: "person",
             class: "",
           },
          // { path: "/farms", title: "menu.farms", icon: "agriculture", class: "" },
          {
            label:"Produits",
            path: "/produits",
            title: "menu.products",
            icon: "inventory_2",
            class: "",
            },

            {
                label: "Inventaires initiaux",
                path: "/inventaires-initiaux",
                title: "menu.beginninginventories",
                icon: "inventory_2",
                class: "",
            },
            {
                label: "Inventaires externes",
                path: "/inventaires-externes",
                title: "menu.beginninginventories",
                icon: "inventory_2",
                class: "",
            },
            {
                label: "Dashboard",
                path: "/dashboard",
                title: "menu.beginninginventories",
                icon: "inventory_2",
                class: "",
            },

            


        ],
      },
    ]
  }
] 
   
      
    

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  redirect() {
    console.log("ooo");
    this.router.navigate(["/start"]);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }


  selectedType1:string=""
  selectedIndex1:number=-1
  selectedType2:string=""
  selectedIndex2:number=-1
  selectedType3:string=""
  selectedIndex3:number=-1
  selectedType4:string=""
  selectedIndex4:number=-1

  handleClickTitle1(index:number){
    this.selectedType1="title1"
    this.selectedIndex1=index
    this.selectedType2=""
    this.selectedIndex2=-1
    this.selectedType3=""
    this.selectedIndex3=-1
    this.selectedType4=""
    this.selectedIndex4=-1
  }

  // isThisvalidTitle1(index:number){
  //   if(this.selectedType=="title1" &&
  //   this.selectedIndex==index){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  handleClickTitle2(index:number){
    this.selectedType1=""
    this.selectedIndex1=-1
    this.selectedType2="title2"
    this.selectedIndex2=index
    this.selectedType3=""
    this.selectedIndex3=-1
    this.selectedType4=""
    this.selectedIndex4=-1
  }

  handleClickTitle3(index:number){
    this.selectedType1=""
    this.selectedIndex1=-1
    this.selectedType3="title3"
    this.selectedIndex3=index
    this.selectedType4=""
    this.selectedIndex4=-1
  }
  handleClickTitle4(index:number){
    this.selectedType1=""
    this.selectedIndex1=-1
    this.selectedType4="title4"
    this.selectedIndex4=index
  }

  public clickSubMenu(menu: string, target: any) {
    if (menu === "Dashboard") {
      this.router.navigate(["/dashboard"]);
    }
    let result = target.hasAttribute("id");
    if (result) {
      $(`#${menu}-dropdown`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }

  public clickMenu(menu: string, target: any) {
    let result = target.hasAttribute("name");
    // console.log(result);
    // console.log("====================================");
    // console.log(menu);
    // console.log("====================================");
    // console.log("====================================");
    // console.log(target);
    // console.log("====================================");
    if (result) {
      $(`#${menu}-dropdown`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }

  public clicksub(menu: string, target: any) {
    let result = target.hasAttribute("subcat");
    console.log(result);
    console.log("====================================");
    console.log(menu);
    console.log("====================================");
    console.log("====================================");
    console.log(target);
    console.log("====================================");
    if (result) {
      $(`#${menu}-dropdown`).toggleClass("show");
      $(`#${menu}`).toggleClass("collapsed");
    }
  }
}
