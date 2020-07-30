let uriList = []
for (let ii = 0; ii<245; ii++) {
    if(ii == 100) {
        uriList.push("to aq");
    } else {
        uriList.push("ola mundo");
    }
    
}


let steps = uriList.length/100;
if (!Number.isInteger(steps)) {
    steps = parseInt(steps) + 1;
}
console.log(steps);
for(let i = 0; i<steps; i++ ) {
    
    let body;
    if (i === steps-1) {
        console.log(uriList.slice(i*100,uriList.length).length)
        console.log("final");
        
    } else {
        //console.log(uriList.slice(i*100,(i*100)+100).length);
        console.log(uriList.slice(i*100,(i*100)+100));
        console.log("passo");
    }

}