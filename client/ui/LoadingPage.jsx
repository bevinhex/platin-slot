import React,{Component} from 'react';
import {browserHistory} from 'react-router';

export default class LoadingPage extends Component{
	constructor(){
		super();

		this.state = {
			progress:0
		}
	}
	gamePreload(game){

		game.load.onLoadStart.add(this.loadStart,this)
		game.load.onFileComplete.add(this.fileComplete,this)
		game.load.onLoadComplete.add(this.loadComplete,this)

		game.load.image('9','sprites/9.png');
		game.load.image('10','sprites/10.png');
		game.load.image('A','sprites/A.png');
		game.load.image('J','sprites/J.png');
		game.load.image('K','sprites/K.png');
		game.load.image('Q','sprites/Q.png');
		game.load.image('Odo','sprites/Odo.png');
		game.load.image('SeaHorse','sprites/SeaHorse.png');
		game.load.image('Shark','sprites/Shark.png');
		game.load.image('Shell','sprites/Shell.png');
		game.load.image('StarFish','sprites/StarFish.png');
		game.load.image('Turtle','sprites/Turtle.png');
		game.load.image('Whale','sprites/Whale.png');

		game.load.audio('bgmusic',['sounds/loading.mp3','sounds/loading.ogg']);

		game.load.start();

	}
	gameCreate(game){
	}
	gameUpdate(game){
	}
	gameRender(game){
	}
	loadStart(){
		console.log('starting');
	}
	fileComplete(progress,cacheKey,success,totalLoaded,totalFiles){
		this.setState({progress:progress});
	}
	loadComplete(){
		browserHistory.push('/game');
	}
	
	render(){
		let progressStyle = {width:this.state.progress+'%'}
		return(
			<div id='loadingPage'>
				<img className='logo' src='images/logo.png'/>
				<img className='logo-blue' src='images/logo-blue.png'/>
				<div className="progressbar-3d">
					<div className="cube">
						<div className="front">
					        <div className="progress" style={progressStyle}></div>
					    </div>
						<div className="back">
							<div className="progress" style={progressStyle}></div>
						</div>
						<div className="top">
							<div className="progress" style={progressStyle}></div>
						</div>
						<div className="bottom">
							<div className="progress" style={progressStyle}></div>
						</div>
						<div className="left"></div>
						<div className="right"></div>
					</div>
				</div>
			</div>
		);
	}
}
