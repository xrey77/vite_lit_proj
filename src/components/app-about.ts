import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-about')
export class AppAbout extends LitElement {

  render() {
    return html`
    <div class="card text-bg-info mb-3 mt-3 mx-3">
    <div class="card-header"><h3 class="text-center">About Us</h3></div>
    <div class="card-body">
      <h5 class="card-title">Info and Key Aspects</h5>
      <p class="card-text">
      The Repco Supercars Championship is Australia's premier national motorsport category and a major international touring car series, known for its competitive racing and diverse range of events, including the iconic Bathurst 1000 race. It features high-performance V8-powered production cars and showcases top drivers and teams in a thrilling battle for championship glory.<br/><br/>
      <strong>Origin and Evolution:</strong><br/>
      The championship originated from the Australian Touring Car Championship and has undergone several name changes over the years, including the V8 Supercar Championship Series and the Virgin Australia Supercar Championship.<br/><br/>
      <stron>The Sport:</strong><br/>
      It is a touring car racing series, meaning the cars are based on production-model vehicles, albeit highly modified for competition. <br/><br/>
      <strong>Brands and Manufacturers:</strong><br/>
      Major automotive manufacturers and their iconic brands, like Ford Mustang and Holden Commodore (though now phased out), have historically competed in the series.<br/><br/>
      <strong.>The Repco Partnership:</strong><br/>
      Repco is a prominent automotive parts and accessories retailer in Australia and New Zealand that has been a long-time supporter of motorsport, having a rich history in racing and also becoming a major partner of the series. 
      
      
      
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
