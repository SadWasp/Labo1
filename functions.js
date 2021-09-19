exports.isPrime = function(n) {
    for ( var i = 2; i < n; i++ ) {
        if ( n % i === 0 ) {
            return false;
        }
    }
    return true;
}

exports.primeNum = function(n) {
    var primes = [2];
    for(var i = 3; primes.length < n; i += 2) {
        var i_isPrime = true;
        for(var j = 0; j < primes.length && primes[j] * primes[j] <= i; j++) {
            if(i % primes[j] === 0){
                i_isPrime = false;
                break;
            }
        }
        if(i_isPrime){
            primes.push(i);
        }
    }
    return primes[n-1];
}

exports.factorial = function(n){
    if (n == 0 || n == 1){
        return 1;
    } else{
        return n * this.factorial(n-1);
    }
}

