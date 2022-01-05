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
        <h3> ${oName}</h3>
        Bio: <i>${data.bio==null?"No User Bio":data.bio}</i>
        <br>
        Following: <i>${data.following==0?"This user doesn't follow anyone yet":data.following}</i>
        <br>
        Followers: <i>${data.followers==0?"This user has no followers":data.followers}</i>
        <br>
        Date created: <i>${data.created_at}</i>
        <br>
        No. Repositories: <i>${data.public_repos}</i>
      </div>
      <!-- </body> -->
    `
  })
})
  
function handleInput(input) {
    var user = document.getElementById("search").value;
    user = user.replace(/\s/g, '');
    var token = undefined
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
                label:"commits/hour",
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