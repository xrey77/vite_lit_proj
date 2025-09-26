import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import axios from 'axios';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

@customElement('app-mfa')
export class AppMfa extends LitElement {
  
  @property({ type: Boolean })
  isdisable = false;

  @property({ type: String })    
  otp = '';
  userid = '';

  @query('form')
  formElement!: HTMLFormElement;    

  @state()
  private message = '';
  
  firstUpdated() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const uid = window.sessionStorage.getItem('USERID');
        if (uid !== null) {
          this.userid = uid;
        }
    }
  }

  render() {
    return html`
    <div class="modal fade" id="staticMfa" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticMfaLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-warning">
          <h1 class="modal-title fs-5" id="staticMfaLabel">OTP Authenticator</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit="${this._submitMfa}" autocomplete="off">
          <div class="mb-3">
              <input type="text" required class="form-control" id="otp" name="otp" ?disabled="${this.isdisable}" placeholder="enter 6-digit OTP code"/>
          </div>          
          <button type="submit" class="btn btn-warning mx-1" ?disabled="${this.isdisable}">login</button>
          <button type="reset" class="btn btn-warning">reset</button>
        </form>          
        </div>
        <div class="modal-footer">
          <div class="w-100 text-center text-danger">${this.message}</div>
        </div>
      </div>
    </div>
  </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

  private _submitMfa(event: Event) {
    event.preventDefault();
    this.isdisable = true;
    this.message = "wait..validating OTP..";
    const formData = new FormData(this.formElement);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
      const jsonData =JSON.stringify({ id: this.userid, otp: data.otp });
      api.post("/validateotp", jsonData)
      .then((res: any) => {
              this.message = res.data.message;              
              sessionStorage.setItem("USERNAME", res.data.username);
              window.setTimeout(() => {
                this.message = '';
                window.location.reload();
                this.isdisable = false;
              }, 3000);
        }, (error: any) => {
              this.message = error.response.data.message;
              window.setTimeout(() => {
                this.isdisable = false;
                this.message = '';
                this.otp = '';           
                return
              }, 3000);        
      });    
    });  
  }
}
