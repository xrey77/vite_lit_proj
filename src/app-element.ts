import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { customElement } from 'lit/decorators.js';
import {LitElement, html, css} from 'lit';

import './components/app-header.ts';
import './components/app-footer.ts';

@customElement('app-element')
export class AppElement extends LitElement {
  static styles = css`
  `;  
  render() {
    return html`
    `;
  }

  createRenderRoot() {
    return this;
  }

}
