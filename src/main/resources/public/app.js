const API_URL = `http://localhost:8080`;

function fetchTicketsData() {
  fetch(`${API_URL}/api/tickets`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showTicketList(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Tickets Data';
    });
}

function fetchTicket(ticketid) {
  fetch(`${API_URL}/api/tickets/${ticketid}`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showTicketDetail(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Single Ticket Data';
    });
}

function parseTicketId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var ticketid = url.searchParams.get('ticketid');
    // var geo = url.searchParams.get("geo");
    // var size = url.searchParams.get("size");
    // console.log(name+ " and "+geo+ " and "+size);
    return ticketid;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
    return '0';
  }
}
// takes a UNIX integer date, and produces a prettier human string
function dateOf(date) {
  const milliseconds = date * 1000; // 1575909015000
  const dateObject = new Date(milliseconds);
  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
  return humanDateFormat;
}

function showTicketList(data) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const ul = document.getElementById('posts');
  const list = document.createDocumentFragment();

  data.map(function (post) {
    console.log('Ticket:', post);
    let li = document.createElement('li');
    let title = document.createElement('h3');
    let body = document.createElement('p');
    let by = document.createElement('p');
    title.innerHTML = `<a href="/ticketdetail.html?ticketid=${post.id}">${post.title}</a>`;
    body.innerHTML = `${post.description}`;
    //let postedTime = dateOf(post.time)
    by.innerHTML = `${post.date} - ${post.reportedBy}`;

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(by);
    list.appendChild(li);
  });

  ul.appendChild(list);
}

function showTicketDetail(post) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const ul = document.getElementById('post');
  const detail = document.createDocumentFragment();

  console.log('Ticket:', post);
  let li = document.createElement('div');
  let title = document.createElement('h2');
  let body = document.createElement('p');
  let by = document.createElement('p');
  title.innerHTML = `${post.title}`;
  body.innerHTML = `${post.description}`;
  //let postedTime = dateOf(post.time)
  by.innerHTML = `${post.date} - ${post.reportedBy}`;

  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(by);
  detail.appendChild(li);

  ul.appendChild(detail);
}

function handlePages() {
  let ticketid = parseTicketId();
  console.log('ticketId: ', ticketid);

  if (ticketid != null) {
    console.log('found a ticketId');
    fetchTicket(ticketid);
  } else {
    console.log('load all tickets');
    fetchTicketsData();
  }
}

handlePages();
