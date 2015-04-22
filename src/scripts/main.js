import {authorized} from './app';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', authorized(function(result, event) {
  console.log(result);
}));
