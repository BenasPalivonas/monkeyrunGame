const submitScore = (name, score) => {
    if (name) {
        fetch('https://hidden-mesa-40035.herokuapp.com/addToLeaderBoard', {
            method: 'post',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                name: name,
                score: score
            })
        }).then(response => response.json()).then(data => {
            console.log(data);
        }
        )
    }
}
export default submitScore;