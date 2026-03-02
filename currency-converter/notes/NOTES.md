Notes go here

Currency converter pseudocode 

1. Check key-value store
2. If cached and fresh → return rate (converting one to another)
3. Else:
     - Call external exchange-rate API
     - Store 
     - Return result

Testing 
1. Image size : docker images
2. Time to first and second response : time curl -s http://localhost:3000/currency-cache/ETH/ZAR 
