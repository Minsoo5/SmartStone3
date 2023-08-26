const API_URL = `http://localhost:8080`;

function fetchKnivesData() {
  fetch(`${API_URL}/api/knives`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showKnivesList(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Knife Data';
    });
}

function fetchKnife(knifeid) {
  fetch(`${API_URL}/api/knives/${knifeid}`)
    .then(res => {
      //console.log("res is ", Object.prototype.toString.call(res));
      return res.json();
    })
    .then(data => {
      showKnifeDetail(data);
    })
    .catch(error => {
      console.log(`Error Fetching data : ${error}`);
      document.getElementById('posts').innerHTML = 'Error Loading Knife Data';
    });
}

function parseKnifeId() {
  try {
    var url_string = window.location.href.toLowerCase();
    var url = new URL(url_string);
    var knifeid = url.searchParams.get('knifeid');
    // var geo = url.searchParams.get("geo");
    // var size = url.searchParams.get("size");
    // console.log(name+ " and "+geo+ " and "+size);
    return knifeid;
  } catch (err) {
    console.log("Issues with Parsing URL Parameter's - " + err);
    return '0';
  }
}
// takes a UNIX integer date, and produces a prettier human string
//function dateOf(date) {
//  const milliseconds = date * 1000; // 1575909015000
//  const dateObject = new Date(milliseconds);
//  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15
//  return humanDateFormat;
//}

function showKnivesList(data) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const ul = document.getElementById('posts');
  const list = document.createDocumentFragment();

  data.map(function (post) {
    console.log('Knife:', post);
    let li = document.createElement('li');
    let title = document.createElement('h3');
    let body = document.createElement('p');
    let by = document.createElement('p');
    title.innerHTML = `<a href="/knifedetail.html?knifeid=${post.id}">${post.knifeStyle}</a>`;
    body.innerHTML = `${post.knifeStyle}`;
    //let postedTime = dateOf(post.time)
    //by.innerHTML = `${post.date} - ${post.reportedBy}`;

    li.appendChild(title);
    li.appendChild(body);
    li.appendChild(by);
    list.appendChild(li);
  });

  ul.appendChild(list);
}

function showKnifeDetail(post) {
  // the data parameter will be a JS array of JS objects
  // this uses a combination of "HTML building" DOM methods (the document createElements) and
  // simple string interpolation (see the 'a' tag on title)
  // both are valid ways of building the html.
  const ul = document.getElementById('post');
  const detail = document.createDocumentFragment();

  console.log('Knife:', post);
  let li = document.createElement('div');
  let title = document.createElement('h2');
  let body = document.createElement('p');
  let by = document.createElement('p');
  title.innerHTML = `${post.knifeStyle}`;
  body.innerHTML = `${post.desiredOutcome}`;
  //let postedTime = dateOf(post.time)
  //by.innerHTML = `${post.date} - ${post.reportedBy}`;

  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(by);
  detail.appendChild(li);

  ul.appendChild(detail);
}

function handlePages() {
  let knifeid = parseKnifeId();
  console.log('knifeId: ', knifeid);

  if (knifeid != null) {
    console.log('found a knifeId');
    fetchKnife(knifeid);
  } else {
    console.log('load all knives');
    fetchKnivesData();
  }
}

handlePages();
