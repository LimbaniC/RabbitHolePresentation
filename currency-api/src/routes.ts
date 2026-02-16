import { Router } from 'express';

const router = Router();



const currencyRates: { [key: string]: number } = {
    algeria: 134.5,
    angola: 825.3,
    benin: 655.7,
    botswana: 13.2,
    burkinaFaso: 655.7,
    burundi: 2850.0,
    cameroon: 655.7,
    capeVerde: 104.2,
    centralAfricanRepublic: 655.7,
    chad: 655.7,
    comoros: 464.5,
    congo: 655.7,
    democraticRepublicOfCongo: 2450.0,
    djibouti: 177.7,
    egypt: 30.9,
    equatorialGuinea: 655.7,
    eritrea: 15.0,
    eswatini: 18.2,
    ethiopia: 55.3,
    gabon: 655.7,
    gambia: 63.5,
    ghana: 12.1,
    guinea: 8600.0,
    guineaBissau: 655.7,
    ivoryCoast: 655.7,
    kenya: 129.5,
    lesotho: 18.2,
    liberia: 155.0,
    libya: 4.8,
    madagascar: 4500.0,
    malawi: 1025.0,
    mali: 655.7,
    mauritania: 35.5,
    mauritius: 45.3,
    morocco: 10.1,
    mozambique: 63.9,
    namibia: 18.2,
    niger: 655.7,
    nigeria: 745.0,
    rwanda: 1250.0,
    saoTomeAndPrincipe: 23500.0,
    senegal: 655.7,
    seychelles: 13.8,
    sierraLeone: 19750.0,
    somalia: 570.0,
    southAfrica: 18.2,
    southSudan: 130.2,
    sudan: 600.0,
    tanzania: 2350.0,
    togo: 655.7,
    tunisia: 3.1,
    uganda: 3750.0,
    zambia: 22.5,
    zimbabwe: 322.0,
};

// Function to generate a random rate within ±20% of the base rate with a 50% chance of staying the same
const getRandomRate = (country: keyof typeof currencyRates): number => {
    const baseRate = currencyRates[country];
    if (!baseRate) {
        throw new Error('Invalid currency country');
    }
    if (Math.random() < 0.5) {
        return baseRate; // 50% chance to return the base rate
    }
    const minRate = baseRate * 0.95; // 20% less
    const maxRate = baseRate * 1.05; // 20% more
    const randomRate = parseFloat((Math.random() * (maxRate - minRate) + minRate).toFixed(2));

    currencyRates[country] = randomRate; // Update the base rate with the new random rate
    return randomRate;

};

// Update routes to pass the country name
Object.keys(currencyRates).forEach(country => {
    const formattedCountry = country.replace(/([A-Z])/g, '-$1').toLowerCase();
    router.get(`/currencies/${formattedCountry}`, (req, res) => {
        res.json({ rate: getRandomRate(country as keyof typeof currencyRates) });
    });
});

export default router; 
