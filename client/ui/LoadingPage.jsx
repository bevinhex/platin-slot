import React,{Component} from 'react';
import {browserHistory} from 'react-router';

export default class LoadingPage extends Component{
	constructor(){
		super();

		this.state = {
			progress:0
		}
	}
	componentWillMount(){
	}
	componentDidMount(){
	}
	gamePreload(){
		let load = this.props.game.load;
		load.onLoadStart.add(this.loadStart,this)
		load.onFileComplete.add(this.fileComplete,this)
		load.onLoadComplete.add(this.loadComplete,this)

		load.image('9','sprites/9.png');
		load.image('10','sprites/10.png');
		load.image('A','sprites/A.png');
		load.image('J','sprites/J.png');
		load.image('K','sprites/K.png');
		load.image('Q','sprites/Q.png');
		load.image('Odo','sprites/Odo.png');
		load.image('SeaHorse','sprites/SeaHorse.png');
		load.image('Shark','sprites/Shark.png');
		load.image('Shell','sprites/Shell.png');
		load.image('StarFish','sprites/StarFish.png');
		load.image('Turtle','sprites/Turtle.png');
		load.image('Whale','sprites/Whale.png');

		load.image('spinner-bg','images/spinner-bg.png');
		load.audio('bg-music',['sounds/loading.mp3','sounds/loading.ogg']);
		load.audio('spin-music',['sounds/spin.mp3','sounds/spin.ogg']);
		load.audio('spin-stop-music',['sounds/spin-stop.mp3','sounds/spin-stop.ogg']);

		load.start();
	}
	gameCreate(){
	}
	gameUpdate(){
	}
	gameRender(){
	}
	loadStart(){
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
