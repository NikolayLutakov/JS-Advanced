class Company {
    constructor() {
        this.departments = {};
    }
    bestDepartment(){
        let maxAvgSalary = 0;
        let bestDepartment = '';
        let employees = [];
        for(const department in this.departments){
            let sumOfSalaryes = 0;
            for(const empl of this.departments[department]){
                sumOfSalaryes += empl[1];
            }
            let avg = sumOfSalaryes / this.departments[department].length

            if(maxAvgSalary < avg){
                maxAvgSalary = avg;
                bestDepartment = department;
                employees = this.departments[department]
            }
        }

        const sorted = sortEmployees();
        
        return `Best Department is: ${bestDepartment}\n`+
                `Average salary: ${maxAvgSalary.toFixed(2)}\n`+ 
                sorted.map(a => {return `${a[0]} ${a[1]} ${a[2]}`}).join('\n')
                

        function sortEmployees(){
            return employees.sort((a, b) => {
                if(b[1] > a[1]) return 1;
                if(b[1] < a[1]) return -1
                if(b[1] == a[1]) {
                    return a[0].localeCompare(b[0]);
                }
            })
        }

    }

    addEmployee(name, salary, position, department) {

        if (!validateParameters([name, salary, position, department])) {
            throw Error('Invalid input!');
        }

        if (this.departments[department] == undefined) {
            this.departments[department] = [];
        }
        
        this.departments[department].push([name, salary, position]);

        return `New employee is hired. Name: ${name}. Position: ${position}`

        function validateParameters(args) {
            for (const param of args) {
                if (param == '' || param == undefined || param == null) {
                    return false;
                }
            }

            if (args[1] < 0) {
                return false;
            }
            return true;
        }
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Construction");
c.addEmployee("Pesho", 1500, "electrical engineer", "Construction");
c.addEmployee("Slavi", 500, "dyer", "Construction");
c.addEmployee("Stan", 2000, "architect", "Construction");
c.addEmployee("Stanimir", 1200, "digital marketing manager", "Marketing");
c.addEmployee("Pesho", 1000, "graphical designer", "Marketing");
c.addEmployee("Gosho", 1350, "HR", "Human resources");
console.log(c.bestDepartment());

