import {authorized, run} from './app';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', authorized(run));
