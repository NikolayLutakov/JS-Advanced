function solve() {

   document.querySelector('#btnSend').addEventListener('click', onClick);

   function onClick() {
      const input = document.getElementById('inputs').querySelector('textarea').value;

      const restaurants = input.replace(/\n/g, '').replace('[', '').replace(']', '').replace(/\"\,\"/g, '*').replace(/\"/g, '').split('*');
      const restaurantsList = {};
      for (const restaurant of restaurants) {
         const tokens = restaurant.split(' - ');       
         const restaurantName = tokens[0];
         const workers = tokens[1].split(', ');
         
         if(restaurantsList[restaurantName] == undefined){
            restaurantsList[restaurantName] = {};
         }
         
         for (const worker of workers) {
            const workerTokens = worker.split(' ');

            const workerName = workerTokens[0];
            const workerPay = Number(workerTokens[1]);

            restaurantsList[restaurantName][workerName] = workerPay;
         }
      }
      
      let best = 0;
      let maxAvg = 0;
      let bestRestaurantName = '';

      for (const restaurant in restaurantsList) {
         let bestSalary = 0
         let sum = 0
         let cnt = 0;
         for (const worker in restaurantsList[restaurant]) {
            const salary = restaurantsList[restaurant][worker]
            if (salary > bestSalary) {
               bestSalary = salary
            }
            sum += salary;
            cnt++;
         }

         let avgSalary = sum / cnt;

         if (avgSalary > maxAvg) {
            maxAvg = avgSalary;
            bestRestaurantName = restaurant
            best = bestSalary;
         }
      }

      let sorted = [];
      for (const worker in restaurantsList[bestRestaurantName]) {
         sorted.push([worker, restaurantsList[bestRestaurantName][worker]]);
      }

      sorted.sort(function (a, b) {
         return b[1] - a[1];
      })
      
      const bestRestaurantSting = `Name: ${bestRestaurantName} Average Salary: ${maxAvg.toFixed(2)} Best Salary: ${best.toFixed(2)}`;
      const workersNamesString = sorted.map(a => {return `Name: ${a[0]} With Salary: ${a[1]}`}).join(' ');

      document.getElementById('bestRestaurant').querySelector('p').textContent = bestRestaurantSting;
      document.getElementById('workers').querySelector('p').textContent = workersNamesString;
   }
}
