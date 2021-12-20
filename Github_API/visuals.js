var form = document.getElementById("myForm")

form.addEventListener('submit',function(e){
  e.preventDefault()

  var search = document.getElementById("search").value

  var oName = search.split(' ').join('')
  document.getElementById("result").innerHTML =""

  fetch("https://api.github.com/users/" + oName)
  .then((result) => result.json())
  .then((data) =>{
    console.log(data)

    document.getElementById("result").innerHTML = `
      <a target ="_blank" href = "https://github.com/${oName}">
       <img src = "${data.avatar_url}" width="200" height="200"/>
      </a>
      <div href = "https://github.com/${oName}">
      <br>
        <h3>${oName} User Profile</h3>
        Bio: <i>${data.bio==null?"He/She hasn't say anything":data.bio}</i>
        <br>
        Following: <i>${data.following==0?"He/She is not following anyone":data.following}</i>
        <br>
        Followers: <i>${data.followers==0?"Nobody is following him/her, click on the profile image to follow👆":data.followers}</i>
        <br>
        Date became a Github user: <i>${data.created_at}</i>
        <br>
        No. Repositories: <i>${data.public_repos}</i>
      </div>
      <!-- </body> -->
    `
  })



    fetch("https://api.github.com/users/" + oName + "/followers")
      .then((result1) => result1.json())
      .then((dataF) =>{
        console.log(dataF)
        var first = dataF[0];
        if(first!=null){
            var firstName = first.login;
            document.getElementById("resultF").innerHTML = `
            <div>
                <!-- <h6>First github user he/she follows:</h6> -->
                First github user following him/her:
                <a target ="_blank" href = "https://github.com/${firstName}">
                 <img src = "${first.avatar_url}" width="100" height="100"/>
                </a>
                 (Click avatar to view)
              </div>
              <!-- </body> -->
            `
          }
          else{

          }

        })




            fetch("https://api.github.com/users/" + oName + "/following")
              .then((result2) => result2.json())
              .then((dataFF) =>{
                console.log(dataFF)
                var firstF = dataFF[0];
                if(firstF!=null){
                    var firstFName = firstF.login;
                    document.getElementById("resultFF").innerHTML = `
                    <div>
                        First github user he/she follows:
                        <a target ="_blank" href = "https://github.com/${firstFName}">
                         <img src = "${firstF.avatar_url}" width="100" height="100"/>
                        </a>
                        (Click avatar to view)
                      </div>
                    `
                  }
                  else{

                  }

                })
})
function handleInput(input) {
    var user = document.getElementById("search").value;
    user = user.replace(/\s/g, '');
    var token = document.getElementById("authToken").value !== "" ? document.getElementById("authToken").value : undefined;
        if (languageChart != null) languageChart;
        if (hourCommitChart != null) hourCommitChart;
        chartType = (input==2) ?    'doughnut':'bar';
    main(user, token,chartType);
}

async function main(user, token,chartType) {
    var url = `https://api.github.com/users/${user}/repos`;
    var repo = await getRequest(url, token).catch(error => console.error(error));

    url = `https://api.github.com/users/${user}`;
    var user_info = await getRequest(url, token).catch(error => console.error(error));

    get_language_pie(repo, user, token, chartType);
    get_commits_times(repo, user, token);
}

async function getRequest(url, token) {
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = (token == undefined) ? await fetch(url) : await fetch(url, {
        "method": "GET",
        "headers": headers
    });

    let data = await response.json();
    return data;
}


async function get_language_pie(repo, user, token, chartType) {
    let data = [];
    let label = [];
    for (i in repo) {
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/languages`;
        let languages = await getRequest(url, token).catch(error => console.error(error));
        for (language in languages) {
            if (label.includes(language)) {
                for (i = 0; i < label.length; i++)
                    if (language == label[i])
                        data[i] = data[i] + languages[language];
            } else {
                label.push(language);
                data.push(languages[language]);
            }
        }
    }
    draw('language', chartType, label,data);

}

function draw(ctx, chartType, label,data) {

    let myChart = document.getElementById(ctx).getContext('2d');

    languageChart = new Chart(myChart, {
        type: chartType,
        data: {
            labels: label,
            datasets: [{
                data: data,
                label:"languages",
                backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',

                'rgba(45, 99, 102, 0.2)',
                'rgba(211, 102, 255, 0.2)',
                'rgba(144, 106, 86, 0.2)',
                'rgba(35, 160, 152, 0.2)',
                'rgba(122, 102, 155, 0.2)',
                'rgba(57, 159, 64, 0.2)',
                'rgba(95, 199, 202, 0.2)',
                'rgba(211, 82, 25, 0.2)',
                'rgba(14, 226, 86, 0.2)',
                'rgba(35, 160, 222, 0.2)',
                'rgba(122, 232, 155, 0.2)',
                'rgba(97, 159, 24, 0.2)',
                'rgba(214, 226, 186, 0.2)',
                'rgba(135, 60, 22, 0.2)',
                'rgba(252, 232, 155, 0.2)',
                'rgba(97, 159, 224, 0.2)'

            ],
            borderColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',

              'rgba(45, 99, 102, 0.2)',
              'rgba(211, 102, 255, 0.2)',
              'rgba(144, 106, 86, 0.2)',
              'rgba(35, 160, 152, 0.2)',
              'rgba(122, 102, 155, 0.2)',
              'rgba(57, 159, 64, 0.2)',
              'rgba(95, 199, 202, 0.2)',
              'rgba(211, 82, 25, 0.2)',
              'rgba(14, 226, 86, 0.2)',
              'rgba(35, 160, 222, 0.2)',
              'rgba(122, 232, 155, 0.2)',
              'rgba(97, 159, 24, 0.2)',
              'rgba(214, 226, 186, 0.2)',
              'rgba(135, 60, 22, 0.2)',
              'rgba(252, 232, 155, 0.2)',
              'rgba(97, 159, 224, 0.2)'
            ],
            borderWidth: 1
            }],
        },
    });
}

async function get_commits_times(repo, user, token) {
    let label = [];
    let data = [];
    let backgroundColor = [];
    var hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24' ];

    for (i in repo) {
        let url = `https://api.github.com/repos/${user}/${repo[i].name}/commits?per_page=100`;
        let commits = await getRequest(url, token).catch(error => console.error(error));

        for (j in commits) {
            let date = commits[j].commit.committer.date;

            var h = new Date(date);
            let hour = hours[h.getHours()];

            if (label.includes(hour)) {
                for (i = 0; i < label.length; i++)
                    if (hour == label[i])
                        data[i] += 1;

            } else {
                label.push(hour);
                data.push(1);
                backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.2)`);
            }
        }

    }

    drawHour('commits', 'commits',  label, data);
}


function drawHour(cont, label, data) {

    let myChart = document.getElementById(cont).getContext('2d');

    hrComChart = new Chart(myChart, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10','11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24' ],
            datasets: [{
                data: data,
                label:"commit freq /hour",
                borderWidth: 1,
                hoverBorderWidth: 2,

                borderColor: 'rgba(54, 162, 235, 1)',
                hoverBorderColor: 'rgba(45, 99, 102, 0.2)'
            }],
            options: {
                  responsive: true,
                  scales: {
                    xAxes: [ {
                      type: 'time',
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: 'Hour'
                      },
                      ticks: {
                        major: {
                          fontStyle: 'bold',
                          fontColor: '#FF0000'
                        }
                      }
                    } ],
                    yAxes: [ {
                      display: true,
                      scaleLabel: {
                        display: true,
                        labelString: 'Frequency'
                      }
                    } ]
                  }}
        },
    });
}

async function toggleChart() {
  // languageChart.destroy;
  var statue = 2;
  handleInput(statue);
}

var languageChart = null;
var hourCommitChart = null;