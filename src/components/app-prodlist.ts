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
  productpicture: string;
  alertstocks: number;
  criticalstocks: number;
}
  
@customElement('app-prodlist')
export class AppProdlist extends LitElement {

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

    <div class="container mt=5">
            <h1>Products List</h1>

            <table class="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Descriptions</th>
                <th scope="col">Qty</th>
                <th scope="col">Unit</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>

            ${this.products.map(
              (item) => html `
              <tr key=${item.id}>
                 <td>${item.id}</td>
                 <td>${item.descriptions}</td>
                 <td>${item.qty}</td>
                 <td>${item.unit}</td>
                 <td>&#8369;${this.toDecimal(item.sellPrice)}</td>
               </tr>
               `
        )}

            </tbody>
            </table>

        <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a @click="${this._lastPage}" class="page-link" href="/#">Last</a></li>
          <li class="page-item"><a @click="${this._prevPage}" class="page-link" href="/#">Previous</a></li>
          <li class="page-item"><a @click="${this._nextPage}" class="page-link" href="/#">Next</a></li>
          <li class="page-item"><a @click="${this._firstPage}" class="page-link" href="/#">First</a></li>
          <li class="page-item page-link text-danger">Page&nbsp;${this.page} of&nbsp;${this.totpage}</li>
        </ul>
      </nav>
    <Footer/>
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
