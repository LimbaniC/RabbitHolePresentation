import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    api_load_test: {
      executor: 'ramping-arrival-rate',
      startRate: 50, 
      timeUnit: '1s',
      preAllocatedVUs: 100,
      maxVUs: 500,
      stages: [
        { target: 200, duration: '2m' },  
        { target: 200, duration: '3m' },  
      ],
    },
  },

  thresholds: {
    http_req_duration: ['p(95)<500'],  
    http_req_failed: ['rate<0.01'],  
  },
};

export default function () {
  const res = http.get('http://localhost:3000/currency-cache/ETH/ZAR');

  check(res, {
    'status 200': (r) => r.status === 200,
  });
}