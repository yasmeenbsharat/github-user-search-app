const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
let searchTerm ='';
let user;
const userInfo = document.getElementById("userInfo");

async function getUserInformation(userName){
    const request = await fetch(`https://api.github.com/users/${userName}`);
    user =await request.json();
    console.log(request)
    console.log("yes");
    console.log(user);
    displayUserInformation();
}

let debounceTimeout;

searchInput.addEventListener('input', function () {
 clearTimeout(debounceTimeout);
 debounceTimeout = setTimeout(function () {
 searchTerm = searchInput.value; 
  }, 500); 
});

searchButton.onclick = function (e) {
    e.preventDefault();
    console.log(searchTerm);
    getUserInformation(searchTerm);  
}
function displayUserInformation(){
    console.log(user);
    const result =`    
     <div class="container bg-dark-mode-element p-5 rounded-4 d-flex justify-content-between">
    <div class="user-avatar w-25 "> <img src="${user.avatar_url}" alt="avatar" class="w-75 rounded-circle"> </div>
    <div class="user-info w-75 d-flex flex-column align-items-center  ">
    <div class="user-profile d-flex justify-content-between w-100">
        <div class="name">
        <h3 class="text-light">${user.name} </h3> 
        <span class="d-block fs-6 text-primary ">@${user.login} </span> 
        <span class="fs-6 d-block mt-4 fw-lighter">${ user.bio ? user.bio : "This profile has no bio"}</span>
        </div>

     <span class="mt-2 fs-6 d-block"> Joined ${user.created_at.substring(0, 10)}</span> 
    </div>
    <div class="d-flex justify-content-between w-100 bg-dark-mode rounded-4 p-1 text-start mt-4">
        <div class="item p-3">
            <h6>Repos</h6>
            <span>${user.public_repos}</span>
        </div>
        <div class="item p-3">
            <h6>Followers</h6>
            <span>${user.followers}</span>
        </div>
        <div class="item p-3">
            <h6>Following</h6>
            <span>${user.following}</span>
        </div>


    </div>
    <div class="d-flex justify-content-between w-100 flex-wrap  mt-4  ">
        <div class="item w-50 ">
            <i class="fa-solid fa-location-dot text-light me-2"></i>
            <span>${ user.location ? user.location : "Not Available"} </span>
        </div>
        <div class="item w-50">
            <i class="fa-brands fa-twitter me-2"></i>
            <span> ${ user.twitter_username ? user.twitter_username : "Not Available"} </span>
        </div>
        <div class="item w-50 mt-3">
            <i class="fa-solid fa-link me-2"></i>
            <span> ${ user.blog ? user.blog : "Not Available"} </span>
        </div>
        <div class="item w-50 mt-3">
            <i class="fa-solid fa-building me-2"></i>
            <span >${ user.company ? user.company : "Not Available"} </span>
        </div>


    </div>
    </div>
</div>

    
    
    `;

    userInfo.innerHTML=result;

}