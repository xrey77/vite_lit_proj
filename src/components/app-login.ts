import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement, query, state, property } from 'lit/decorators.js';
import axios from "axios";
import jQuery from 'jquery';
import './app-mfa';

const api = axios.create({
  baseURL: "https://localhost:7292",
  headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
});

@customElement('app-login')
export class AppLogin extends LitElement {

    @query('form')
    formElement!: HTMLFormElement;

    @state()
    private message = '';
    
    @property({ type: Boolean })
    isdisable = false;

  render() {
    
    return html`
    <div class="modal fade" id="staticLogin" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticLoginLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header bg-primary">
          <h1 class="modal-title fs-5 text-white" id="staticLoginLabel">Users Login</h1>
          <button id="closeLogin" @click=${this._closeLogin} type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit=${this._submitLogin} autocomplete="off">
            <div class="mb-3">
                <input type="text" required class="form-control" id="uname" name="uname" ?disabled=${this.isdisable} placeholder="enter Username"/>
            </div>          
            <div class="mb-3">
                <input type="password" required class="form-control" id="pword" name="pword" ?disabled=${this.isdisable} placeholder="enter Password"/>
            </div>          
            <button type="submit" class="btn btn-primary mx-1" ?disabled=${this.isdisable}>login</button>
            <button id="loginReset" type="reset" class="btn btn-primary">reset</button>
            <button id="mfaModal" type="button" class="btn btn-warning d-none" data-bs-toggle="modal" data-bs-target="#staticMfa"></buttom>
          </form>
        </div>
        <div class="modal-footer">
            <div class="w-100 text-center text-danger">${this.message}</div>
        </div>
      </div>
    </div>
  </div>
  <app-mfa></app-mfa>
    `;    
  }

  createRenderRoot() {
    return this;
  }

  private _closeLogin(event: Event) {
    event.preventDefault();    
    this.message = '';
    // jQuery("#closeLogin").trigger("click");
  }

  private _submitLogin(event: Event) {
    event.preventDefault();
    const formData = new FormData(this.formElement);
    const data: { [key: string]: string } = {};
    this.message = "please wait...";
    this.isdisable = true;

    formData.forEach((value, key) => {
      data[key] = value.toString();
      const jsondata = JSON.stringify({ username: data.uname, password: data.pword });
      api.post("/signin", jsondata)
      .then((res: any) => {
              this.message = res.data.message;
              if (res.data.qrcodeurl !== null) {
                  sessionStorage.setItem('USERID',res.data.id);
                  sessionStorage.setItem('TOKEN',res.data.token);
                  sessionStorage.setItem('ROLE',res.data.roles);
                  sessionStorage.setItem('USERPIC',res.data.profilepic);
                  this.isdisable = false
                  jQuery("#loginReset").trigger("click");
                  jQuery("#closeLogin").trigger("click");
                  jQuery("#mfaModal").trigger("click");
              } else {
                  sessionStorage.setItem('USERID',res.data.id);
                  sessionStorage.setItem('USERNAME',res.data.username);
                  sessionStorage.setItem('TOKEN',res.data.token);                        
                  sessionStorage.setItem('ROLE',res.data.roles);
                  sessionStorage.setItem('USERPIC',res.data.profilepic);                    
                  jQuery("#loginReset").trigger("click");
                  jQuery("#closeLogin").trigger("click");
                  this.isdisable = false;
                  location.reload();
              }
        }, (error: any) => {
              this.message = error.response.data.message;
              setTimeout(() => {
                this.message = '';
                this.isdisable = false;
              }, 3000);    
              return;    
      });        

    });

  }
}

