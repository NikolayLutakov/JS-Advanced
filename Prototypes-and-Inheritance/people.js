function solution() {
    class Employee {
        constructor(name, age) {
            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = []
            this.counter = 0
        }

        work() {
            let result = this.tasks[this.counter];
            this.counter++;
            if (this.counter === this.tasks.length) {
                this.counter = 0;
            }
            console.log(result);
        }

        collectSalary() {
            let money = this.dividend === undefined ? 0 : this.dividend;
            let result = `${this.name} received ${this.salary + money} this month.`
            console.log(result)
        }
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a simple task.`];
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} is working on a complicated task.`,
                `${this.name} is taking time off work.`,
                `${this.name} is supervising junior workers.`]
        }
    }

    class Manager extends Employee {
        constructor(name, age) {
            super(name, age);
            this.tasks = [`${this.name} scheduled a meeting.`,
                `${this.name} is preparing a quarterly report.`
            ]
            this.dividend = 0;
        }
    }

    return {Employee, Junior, Senior, Manager}
}