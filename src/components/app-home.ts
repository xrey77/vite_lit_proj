import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-home')
export class AppHome extends LitElement {

  render() {
    return html`
    <div id="carouselExampleCaptions" class="carousel slide">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
      </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="/images/1.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item">
        <img src="/images/2.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item">
        <img src="/images/3.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item">
        <img src="/images/4.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
      <div class="carousel-item">
        <img src="/images/5.png" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>   
  <div class="card text-bg-warning mb-3 mt-3 mx-2">
  <div class="card-header"><h3 class="text-center">Supercars Championship</h3></div>
  <div class="card-body">
    <h5 class="card-title">Repco Supercar Overview</h5>
    <p class="card-text">
    Supercars events take place in all Australian states and the Northern Territory, with the Australian Capital Territory formerly holding the Canberra 400.[2] Usually, an international round is held in New Zealand, with events previously being held in China, Bahrain, the United Arab Emirates, and the United States. The Melbourne SuperSprint championship event is also held in support of the Australian Grand Prix. Race formats vary between each event, with sprint races between 100 and 200 kilometres (62 and 124 mi) in length, street races between 125 and 250 kilometres (78 and 155 mi) in length, and two-driver endurance races held at The Bend 500 and Bathurst. The series is broadcast in 137 countries and has an average event attendance of over 100,000. With over 250,000 in attendance annually, the Adelaide 500 is the most attended Supercars race in Australia.    
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
