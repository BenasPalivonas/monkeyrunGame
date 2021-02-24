const addLeaders = () => {
    leaderBoard.replaceChildren();
    var p = document.createElement("p");
    p.setAttribute('id', "leaderText");
    p.appendChild(document.createTextNode("Leader Board"));
    leaderBoard.appendChild(p);
    fetch('https://hidden-mesa-40035.herokuapp.com/top3').then(response => response.json())
        .then((leaders) => {
            leaders.map(leader => {
                var li = document.createElement("li");
                //li.setAttribute('id', leader.Name);
                li.appendChild(document.createTextNode(leader.name + " : " + leader.score));
                leaderBoard.appendChild(li);

            });


        })
}
export default addLeaders;