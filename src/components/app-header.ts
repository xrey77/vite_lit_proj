import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import '../scss/styles.scss';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './app-login.ts';
import './app-register.ts';

@customElement('app-header')
export class AppHeader extends LitElement {
  
  @property({ type: String })    
   username = '';
   userpic = '';

  firstUpdated() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
        const uname = window.sessionStorage.getItem('USERNAME');
        if (uname !== null) {
          this.username = uname;
        }
    }

    if (typeof window !== 'undefined' && window.sessionStorage) {
        const upic = window.sessionStorage.getItem('USERPIC');
        if (upic !== null) {
            this.userpic = upic;
        }
    }
  }

  render() {
    return html`
      <header>
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/"><img class="logo" src="/images/logo.png" alt=""/></a>
            <button class="navbar-toggler" type="button"  data-bs-toggle="offcanvas" data-bs-target="#offcanvasMenu" aria-controls="offcanvasWithBothOptions">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/aboutus">About Us</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Products
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="/productlist">Products List</a></li>
                    <li><a class="dropdown-item" href="productcatalog">Products Catalog</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="productsearch">Product Search</a></li>
                  </ul>
                </li>
                <li class="nav-item">
                  <a href="/contactus" class="nav-link">Contact Us</a>
                </li>
              </ul>

              ${this.username === '' 
              ? html `
              <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                  <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                </li>

                <li class="nav-item">
                  <a href="#" class="nav-link" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                </li>
              </ul>`
              : html `
              
              <ul class="navbar-nav mr-auto">
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img class="user" src="${this.userpic}" />&nbsp;${this.username }
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <a @click="${this._logout}" class="dropdown-item" href="/">LogOut</a>
                </li>
                  <li>
                    <a class="dropdown-item" href="/profile">Profile</a> 
                </li>
                  <li><hr class="dropdown-divider"></li>
                  <li>
                    <a class="dropdown-item" href="/#">Messenger</a> 
                  </li>
                </ul>
              </li>              
            </ul>

              `}

            </div>
          </div>
        </nav>    
      </header>
      <app-login></app-login>
      <app-register></app-register>

      <div class="offcanvas offcanvas-end" data-bs-scroll="true" id="offcanvasMenu" aria-labelledby="offcanvasWithBothOptionsLabel">
      <div class="offcanvas-header bg-primary">
        <h5 class="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Drawer Menu</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
    
        <ul class="nav flex-column">
          <li class="nav-item" data-bs-dismiss="offcanvas">
            <a class="nav-link emboss-menu" aria-current="page" href="/aboutus">About Us</a>
          </li>
          <li class="nav-item"><hr/></li>
          <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle emboss-menu" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul class="dropdown-menu">
                  <li data-bs-dismiss="offcanvas"><a class="dropdown-item" href="/productlist">Products List</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><a class="dropdown-item" href="/productcatalog">Products Catalog</a></li>
                  <li><hr class="dropdown-divider"/></li>
                  <li data-bs-dismiss="offcanvas"><a class="dropdown-item" href="/productsearch">Product Search</a></li>
                </ul>
            </li>
    
            <li class="nav-item"><hr/></li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <a class="nav-link emboss-menu" aria-current="page" href="/contactus">Contact Us</a>
            </li>
            <li class="nav-item"><hr/></li>    
            </ul>
                 ${this.username === ''
                 ? html `
                  <ul class="nav flex-column">
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticLogin">Login</a>
                    </li>
                    <li class="nav-item"><hr/></li>
                    <li class="nav-item" data-bs-dismiss="offcanvas">
                      <a class="nav-link emboss-menu" href="/#" data-bs-toggle="modal" data-bs-target="#staticRegister">Register</a>
                    </li>            
                  </ul>`
                  : html `
                  
                  <ul class="navbar-nav mr-auto">              
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="/#" role="button" data-bs-toggle="dropdown" aria-expanded="false">                   
                       <img class="user" src="${this.userpic}" />&nbsp;${this.username}
                   </a>
                    <ul class="dropdown-menu">
                      <li data-bs-dismiss="offcanvas">
                        <a @click="${this._logout}" class="dropdown-item" href="#">LogOut</a>
                      </li>
                      <li class="nav-item"><hr/></li>
                      <li data-bs-dismiss="offcanvas">
                        <a class="dropdown-item" href="/profile">Profile</a> 
                      </li>
                      <li><hr class="dropdown-divider"/></li>
                      <li data-bs-dismiss="offcanvas">
                        <a class="dropdown-item" href="#">Messenger</a>
                      </li>
                    </ul>
                  </li>          
                  <li class="nav-item"><hr/></li>                                        
                </ul>      

                  `}



       </div>
      </div>

    `;
  }

  createRenderRoot() {
    return this;
  }

  _logout(event: Event) {
    event.preventDefault();
    sessionStorage.removeItem('USERID');
    sessionStorage.removeItem('USERNAME');
    sessionStorage.removeItem('USERPIC');
    sessionStorage.removeItem('TOKEN');
    window.history.pushState(null, '', window.location.href);
    location.href = '/';
    
  }

}
