import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import axios from "axios";
import jQuery from 'jquery';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

@customElement('app-register')
export class AppRegister extends LitElement {

  @query('form')
  formElement!: HTMLFormElement;    

  @state()
  private message = '';

  render() {
    return html`
    <div class="modal fade" id="staticRegister" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticRegisterLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-success">
          <h1 class="modal-title fs-5 text-white" id="staticRegisterLabel">Modal title</h1>
          <button @click=${this._closeRegister} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit=${this._submitRegistration} autocomplete="off">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <input type="text" required class="form-control" id="ftname" name="ftname" placeholder="enter First Name" autocomplete="off"/>
              </div>          
            </div>
            <div class="col">
              <div class="mb-3">
                <input type="text" required class="form-control" id="ltname" name="ltname" placeholder="enter Last Name"/>
              </div>          
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <input type="text" required class="form-control" id="email" name="email" placeholder="enter Email Address"/>
              </div>          
            </div>
            <div class="col">
              <div class="mb-3">
                <input type="text" required class="form-control" id="mobile" name="mobile" placeholder="enter Mobile No."/>
              </div>          
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <input type="text" required class="form-control" id="uname" name="uname" placeholder="enter Username"/>
              </div>          
            </div>
            <div class="col">
              <div class="mb-3">
                <input type="password" required class="form-control" id="pword" name="pword" placeholder="enter Password"/>
              </div>          
            </div>
          </div>


          <button type="submit" class="btn btn-success mx-1">register</button>
          <button type="reset" class="btn btn-success">reset</button>
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

  private _closeRegister(event: Event) {
    event.preventDefault();
    jQuery("#closeLogin").trigger("click");
  }

  private _submitRegistration(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const data: { [key: string]: string } = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
      this.message = "please wait...";
      const jsondata =JSON.stringify({ lastname: data.ltname, firstname: data.ftname,email: data.email, mobile: data.mobile,username: data.uname, password: data.pword });
      api.post("/signup", jsondata)
      .then((res: any) => {
            this.message = res.data.message;
            window.setTimeout(() => {
              this.message = '';
            }, 3000);
            return;
        }, (error: any) => {
              this.message = error.response.data.message;
      });
      window.setTimeout(() => {
        this.message = '';
      }, 3000);

    });  
  }
}