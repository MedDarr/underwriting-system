import { AppModule } from './app.module';

const app = new AppModule();

console.log('Underwriting system backend prototype started');
console.log('Available controllers:');
console.log('- applicationsController');
console.log('- securityChecksController');
console.log('- scoringController');
console.log('- recommendationsController');
console.log('- auditController');

export { app };
