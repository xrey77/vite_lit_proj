import { Router } from '@vaadin/router';
import './scss/styles.scss'
import './app-element.ts'
import './components/app-home.ts';
import './components/app-profile.ts';
import './components/app-prodlist.ts';
import './components/app-prodcatalog.ts'
import './components/app-prodsearch.ts'

// Initialize the router once the DOM is loaded
window.addEventListener('load', () => {
    initRouter();
  });
  
  function initRouter() {
    const outlet = document.getElementById('outlet');
    if (outlet) {
      const router = new Router(outlet);
      router.setRoutes([
        {
          path: '/',
          component: 'app-home',
          action: async () => {
            await import('./components/app-home.ts');
          },
        },
        {
          path: '/aboutus',
          component: 'app-about',
          action: async () => {
            await import('./components/app-about.ts');
          },
        },
        {
            path: '/contactus',
            component: 'app-contact',
            action: async () => {
              await import('./components/app-contact.ts');
            },
          },
          {
            path: '/profile',
            component: 'app-profile',
            action: async () => {
              await import('./components/app-profile.ts');
            },
          },
          {
            path: '/productlist',
            component: 'app-prodlist',
            action: async () => {
              await import('./components/app-prodlist.ts');
            },
          },
          {
            path: '/productcatalog',
            component: 'app-prodcatalog',
            action: async () => {
              await import('./components/app-prodcatalog.ts');
            },
          },
          {
            path: '/productsearch',
            component: 'app-prodsearch',
            action: async () => {
              await import('./components/app-prodsearch.ts');
            },
          },


        // Fallback for non-matching routes
        {
          path: '(.*)',
          redirect: '/',
        },
      ]);
    }
  }