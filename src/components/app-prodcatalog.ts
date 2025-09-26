import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
  
@customElement('app-prodcatalog')
export class AppProdcatalog extends LitElement {
  @property({ type: String })
  message = '';

  @property({ type: Number })
  page = 1;
  totpage = 0;

  @state()
  private products: Product[] = [];  

  toDecimal(x1: any) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    // Format the number
    return formatter.format(x1);
  };
  

  fetchProducts(pg: number) {
    api.get(`/api/listproducts/${pg}`)
    .then((res: any) => {
      this.products = res.data.products;
      this.totpage = res.data.totpage;
      this.page = res.data.page;
    }, (error: any) => {
            this.message = error.response.data.message;
            return;
    }); 
  }

  firstUpdated() {
    this.fetchProducts(1);
  }


  render() {
    return html`

    <div class="container mb-9">
            <h3 class='text-center'>Products Catalog</h3>
            <div class="card-group mb-8">
            ${this.products.map(
              (item) => html `
              <div class='col-md-4'>
              <div key=${item.id} class="card card-fixed-height mx-3 mt-3">
                  <img src=${item.productPicture} class="card-img-top" alt=""/>
                  <div class="card-body">
                    <h5 class="card-title">Descriptions</h5>
                    <p class="card-text desc-h">${item.descriptions}</p>
                  </div>
                  <div class="card-footer">
                    <p class="card-text text-danger"><span class="text-dark">PRICE :</span>&nbsp;<strong>&#8369;${this.toDecimal(item.sellPrice)}</strong></p>
                  </div>  
              </div>                
              </div>`

              )}
          </div>    

        <div class='container mt-4'>
        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a @click="${this._lastPage}" class="page-link" href="/#">Last</a></li>
          <li class="page-item"><a @click="${this._prevPage}" class="page-link" href="/#">Previous</a></li>
          <li class="page-item"><a @click="${this._nextPage}" class="page-link" href="/#">Next</a></li>
          <li class="page-item"><a @click="${this._firstPage}" class="page-link" href="/#">First</a></li>
          <li class="page-item page-link text-danger">Page&nbsp;${this.page} of&nbsp;${this.totpage}</li>
        </ul>
      </nav>
      <br/><br/>
      </div>

    </div>

    `;
  }

  createRenderRoot() {
    return this;
  }
  _firstPage(event: any) {
    event.preventDefault();    
    let pg = 1;
    this.page = pg;
    this.fetchProducts(pg);
    return;    
  }

  _nextPage(event: any) {
    event.preventDefault();    
    if (this.page === this.totpage) {
        return;
    }
    this.page++;
    this.fetchProducts(this.page);
    return;
  }

  _prevPage(event: any) {
    event.preventDefault();    
    if (this.page === 1) {
      return;
      }
      this.page--;
      this.fetchProducts(this.page);
      return;    
  }

  _lastPage(event: any) {
    event.preventDefault();
    let pg = this.totpage;
    this.page = pg;
    this.fetchProducts(this.page);
    return;    
  }

}
