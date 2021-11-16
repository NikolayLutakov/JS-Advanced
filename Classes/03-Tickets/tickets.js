const { Ticket } = require("./Ticket");

function manage(inputTickets, sorting){
    const tickets = [];

    const sortMapper = {
        destination: () =>{
            return tickets.sort((a, b) => a.destination.localeCompare(b.destination))
        },
        price: () =>{
            return tickets.sort((a, b) => a.price-b.price);
        },
        status: () =>{
            return tickets.sort((a, b) => a.status.localeCompare(b.status))
        }
    }

    inputTickets.map(t => {
        const tokens = t.split('|')

        const ticket = new Ticket(tokens[0], Number(tokens[1]), tokens[2]);
        tickets.push(ticket); 
    });

    const sorted = sortMapper[sorting]();
    return sorted;
}

manage(['Philadelphia|94.20|available',
'New York City|95.99|available',
'New York City|95.99|sold',
'Boston|126.20|departed'],
'destination'
)