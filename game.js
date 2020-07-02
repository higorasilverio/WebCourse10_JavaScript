var timerId = null; //variable that keeps the timeout call

function beginGame(){
	var url = window.location.search;
	var gameLevel = url.replace("?", "");
	var time_seconds = 0;
	if (gameLevel == 1) {//Easy: 120 segundos
		time_seconds = 120;
	}
	if (gameLevel == 2) {//Medium: 60 segundos
		time_seconds = 60;
	}
	if (gameLevel == 3) {//Hard: 30 segundos
		time_seconds = 30;
	}
	//insert seconds in cronometer
	document.getElementById('cronometer').innerHTML = time_seconds;
	//quantity of balloons
	var qtt_balloons = 80;
	createBalloons(qtt_balloons);
	//press quantity of intact balloons
	document.getElementById('ballons_intact').innerHTML = qtt_balloons;
	//press quantity of popped balloons
	document.getElementById('ballons_popped').innerHTML = 0;
	countingTime(time_seconds + 1);
}

function countingTime(seconds){
	seconds = seconds -1;
	if (seconds == -1) {
		clearTimeout(timerId); //stop the countingTime execution
		gameOver();
		return false;
	}
	document.getElementById('cronometer').innerHTML = seconds;
	timerId = setTimeout("countingTime("+seconds+")",1000);
}

function gameOver(){
	removeBalloonsEvent();
	alert('Game Over! You did not popped all balloons in time!')
}

function createBalloons(qtt_balloons){
	for (var i = 1; i <= qtt_balloons; i++) {
		var balloon = document.createElement('img');
		balloon.src = 'img/balao_azul_pequeno.png';
		balloon.style.margin = '12px';
		balloon.id = 'b'+i;
		balloon.onclick = function(){ pop(this); }
		document.getElementById('cenarium').appendChild(balloon);
	}
}

function pop(e){
	var id_balloon = e.id;
	document.getElementById(id_balloon).setAttribute("onclick","");
	document.getElementById(id_balloon).src = 'img/balao_azul_pequeno_estourado.png';
	ponctuation(-1);
}

function ponctuation(argument) {
	var intactBalloons = document.getElementById('ballons_intact').innerHTML;
	var poppedBalloons = document.getElementById('ballons_popped').innerHTML;
	intactBalloons = parseInt(intactBalloons);
	poppedBalloons = parseInt(poppedBalloons);
	intactBalloons = intactBalloons + argument;
	poppedBalloons = poppedBalloons - argument;
	document.getElementById('ballons_intact').innerHTML = intactBalloons;
	document.getElementById('ballons_popped').innerHTML = poppedBalloons;
	gameSituation(intactBalloons);
}

function gameSituation(intactBalloons){
	if(intactBalloons == 0){
		alert('Congrats! You popped it all!')
		stopGame();
	}
}

function stopGame(){
	clearTimeout(timerId);
}

function removeBalloonsEvent(){
	var i = 1;//counter to recover the ballon by id
	//WHILE to read the elements by its id and leave when there is no correspondence with the element
	while (document.getElementById('b'+i)){
		//remove onclick event from the element 
		document.getElementById('b'+i).onclick='';
		//iterates the i variable
		i++;
	}

}