function modifyWorker(worker){
    if(worker.dizziness){
        let waterNeeded = worker.weight * 0.1 * worker.experience;

        worker.levelOfHydrated += waterNeeded;
        worker.dizziness = false;
    } 

    return worker;
}

console.log(modifyWorker({ weight: 80,
    experience: 1,
    levelOfHydrated: 0,
    dizziness: true }
  ));
