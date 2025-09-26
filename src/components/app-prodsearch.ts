import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7292",
    headers: {'Accept': 'application/json',
              'Content-Type': 'application/json'}
  })

export interface Product {
  id: number;
  category: string;
  descriptions: string
  qty: number;
  unit: string;
  costPrice: number;
  sellPrice: number;
  salePrice: number;
  productPicture: string;
  alertstocks: number;
  criticalstocks: number;
}

@customElement('app-prodsearch')
export class AppProdsearch extends LitElement {
  @property({ type: String })
  message = '';
  searchkey = '';

  @property({ type: Number })
  page = 1;
  totpage = 0;

  @state()
  private products: Product[] = [];  

  @query('form')
  formElement!: HTMLFormElement;

  toDecimal(x1: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    // Format the number
    return formatter.format(x1);
  };
  
  async getProdsearch(event: any) {
    event.preventDefault();
    this.message = 'please wait .';
    const formData = new FormData(this.formElement);
    const xdata: { [key: string]: string } = {};
    this.message = "please wait...";
    formData.forEach((value, key) => {
        xdata[key] = value.toString();
    });
    const data = JSON.stringify({ search: xdata.search});
    await api.post("/api/searchproducts",data)
    .then((res: any) => {
        this.message = res.data.message;
        this.products = res.data.products;
        setTimeout(() => {
          this.message = '';      
        }, 3000);
    
    }, (error: any) => {
      this.message = error.response.data.message;
      setTimeout(() => {
        this.message = '';      
      }, 3000);
      return;
    });  
}

  firstUpdated() {
    this.getProdsearch;
  }
  render() {
    return html`

    <div class="container mb-10">
        <h2>Products Search</h2>

        <form class="row g-3" @submit="${this.getProdsearch}" autoComplete='off'>
            <div class="col-auto">
              <input type="text" required class="form-control-sm" id="search" name="search" placeholder="enter Product keyword"/>
              <div class='text-danger searcMsg'>${this.message}</div>
            </div>
            <div class="col-auto">
              <button type="submit" class="btn btn-primary btn-sm mb-3">search</button>
            </div>

        </form>
        <div class="container mb-10">
          <div class="card-group">
        ${this.products.map(
          (item) => html `
                <div class='col-md-4'>
                <div key=${item.id} class="card card-fixed-height mx-3 mt-3">
                    <img src=${item.productPicture} class="card-img-top" alt=""/>
                    <div class="card-body">
                      <h5 class="card-title">Descriptions</h5>
                      <p class="card-text">${item.descriptions}</p>
                    </div>
                    <div class="card-footer">
                      <p class="card-text text-danger"><span class="text-dark">PRICE :</span>&nbsp;<strong>&#8369;${this.toDecimal(item.sellPrice)}</strong></p>
                    </div>  
                </div>                
                </div>`
        )}
          </div>          
        </div>
        <br/></br>
    </div>

    `;
  }

  createRenderRoot() {
    return this;
  }

  
}
