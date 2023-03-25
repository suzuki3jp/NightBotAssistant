import { Base } from './Base';
import { subscribeEvents } from './events/index';

const base = new Base();

subscribeEvents(base);
