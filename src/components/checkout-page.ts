import { LitElement, html } from 'lit';

export class CheckoutPage extends LitElement {
    
  static properties = {
    isComplete: { type: Boolean },
  };
    isComplete: boolean;

  constructor() {
    super();
    this.isComplete = false;
  }

  connectedCallback() {
    super.connectedCallback();
    // Add a listener for the browser's popstate event
    window.addEventListener('popstate', this.handlePopstate);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Clean up the event listener when the component is removed
    window.removeEventListener('popstate', this.handlePopstate);
  }

  handlePopstate = (event) => {
    if (this.isComplete) {
      // If the purchase is complete, prevent the user from going back
      // by pushing the current state back onto the history stack.
      history.pushState(null, '', window.location.href);
      alert("You cannot go back during a completed checkout process.");
    }
  };

  completePurchase() {
    this.isComplete = true;
    console.log('Purchase completed!');
    // Redirect the user to a new "thank you" page
    // Using a simple navigation for this example
    window.location.href = '/thank-you';
  }

  render() {
    return html`
      <h1>Checkout</h1>
      <p>Please complete your purchase.</p>
      <button @click=${this.completePurchase}>Complete Purchase</button>
    `;
  }
}

customElements.define('checkout-page', CheckoutPage);