import { Router } from 'express';

const router = Router();


const currencyRates: { [key: string]: number } = {
    DZD: 134.5, // Algeria
    AOA: 825.3, // Angola
    XOF: 655.7, // Benin
    BWP: 13.2,  // Botswana
    BIF: 2850.0, // Burundi
    CVE: 104.2, // Cape Verde
    KMF: 464.5, // Comoros
    XAF: 655.7, // Congo
    CDF: 2450.0, // Democratic Republic of Congo
    DJF: 177.7, // Djibouti
    EGP: 30.9, // Egypt
    GQE: 655.7, // Equatorial Guinea
    ERI: 15.0, // Eritrea
    ESW: 18.2, // Eswatini
    ETH: 55.3, // Ethiopia
    GAB: 655.7, // Gabon
    GMB: 63.5, // Gambia
    GHA: 12.1, // Ghana
    GIN: 8600.0, // Guinea
    GNB: 655.7, // Guinea-Bissau
    CIV: 655.7, // Ivory Coast
    KEN: 129.5, // Kenya
    LSO: 18.2, // Lesotho
    LBR: 155.0, // Liberia
    LYD: 4.8, // Libya
    MGA: 4500.0, // Madagascar
    MWI: 1025.0, // Malawi
    MAL: 655.7, // Mali
    MRT: 35.5, // Mauritania
    MUS: 45.3, // Mauritius
    MAR: 10.1, // Morocco
    MOZ: 63.9, // Mozambique
    NAD: 18.2, // Namibia
    NER: 655.7, // Niger
    NGN: 745.0, // Nigeria
    RWA: 1250.0, // Rwanda
    STP: 23500.0, // Sao Tome and Principe
    SEN: 655.7, // Senegal
    SYC: 13.8, // Seychelles
    SLE: 19750.0, // Sierra Leone
    SOM: 570.0, // Somalia
    ZAR: 18.2, // South Africa
    SUD: 130.2, // South Sudan
    TAN: 2350.0, // Tanzania
    TGO: 655.7, // Togo
    TUN: 3.1, // Tunisia
    UGA: 3750.0, // Uganda
    ZMB: 22.5, // Zambia
    ZWE: 322.0, // Zimbabwe
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
    router.get(`/currencies/${country}`, (req, res) => {
        res.json({ rate: getRandomRate(country as keyof typeof currencyRates) });
    });
});

export default router;
