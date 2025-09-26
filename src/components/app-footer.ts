// src/my-footer.js
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-footer')
export class AppFooter extends LitElement {
  static styles = css`
    footer {
      padding: 1rem 2rem;
      background-color: #eee;
      text-align: center;
      color: #555;
    }
  `;

  render() {
    return html`
      <footer>
        <p>&copy; 2025, All rights reserved. Repco Supercar Inc.</p>
      </footer>
    `;
  }
}
