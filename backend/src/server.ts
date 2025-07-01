import { log } from 'console';
import app from './app';

app.listen(3001, () => {
  log('Listen port 3001')
});