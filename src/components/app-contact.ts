import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-contact')
export class AppContact extends LitElement {

  render() {
    return html`
    <div class="card text-bg-success mb-3 mt-3 mx-3"">
    <div class="card-header"><h3 class="text-center">Contact Us</h3></div>
    <div class="card-body">
      <h5 class="card-title">Success card title</h5>
      <p class="card-text">
      To contact our organization running the Repco Supercars Championship, visit our official Supercars website at <a class="text-white" href="Supercars.com">Supercars.com</a> or find ourt contact information by searching online for "Supercars contact". 
      <br/><br/>
      <strong>Our Official Website:</strong><br/>
    You can find detailed information and potentially contact forms or email addresses on the Supercars official website.
    <br/><br/>
    <strong>General Search:</strong><br/>
    Performing a search for "Repco Supercars contact" or "Supercars contact" will lead you to the correct website and its contact details.
    <br/><br/>
    Supercars<br/>

    PO Box 607, SOUTHPORT BC, QLD, 4215
    </br>
    45 Nerang Street, Southport, QLD, 4215
    <br/>
    Ph. 07 5630 0364
    <br/>
    Hours of operation – Mon-Fri 9am-5pm    
      </p>
    </div>
  </div>    
  <app-footer></app-footer>
    `;
  }

  createRenderRoot() {
    return this;
  }

}
