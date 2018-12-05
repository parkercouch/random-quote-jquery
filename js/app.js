// Backup quotes if server is slow
const quotes = [
    {
        text: "So I'm just supposed to say something profound?",
        author: "Some Person",
    },
    {
        text: "Here is another one",
        author: "Me",
    },
    {
        text: "Hi!",
        author: "Everyone",
    },
]

const fetchQuote = function () {
    // Try to fetch random quote, if it takes 500ms then use local
    fetchWithTimeout('https://talaikis.com/api/quotes/random/', 500)
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            // console.log(myJson);
            updateText(myJson);
        })
        .catch(function() {
            // console.log('FAILED!!, Pulling local quote');
            randomQuote(quotes);
        });
};


// randomQuote :: [{quote,utterer}] -> {quote,utterer}
const randomQuote = function (quoteList) {
    return quoteList[Math.floor(Math.random() * quoteList.length)];
};

// updateText :: {quote, author} -> Void
const updateText = function (quote) {
    $('.quote-text').fadeOut(function() {
        $(this).text(`" ${quote.quote} "`).fadeIn();
    })
    $('.quote-author').fadeOut(function() {
        $(this).text(`- ${quote.author}`).fadeIn();
    })
};

// Set timeout on quote fetch
const fetchWithTimeout = function (url, timeout = 5000) {
    return Promise.race([
        fetch(url),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('timeout')), timeout)
        )
    ]);
}

// Click event to start quote fetch!
$(".generate").on('click', function () {
    fetchQuote();
});