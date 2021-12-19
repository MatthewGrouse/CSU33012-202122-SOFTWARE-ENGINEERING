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
