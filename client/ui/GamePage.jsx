import React,{Component} from 'react';
import Footer from './Footer.jsx';
import Spinner from './Spinner.jsx';

export default class GamePage extends Component{
	constructor(){
		super();
	}
	gamePreload(game){
		this.game = game;
		game.scale.onSizeChange.add(this.onResize,this);
	}
	gameCreate(game){
		this.music = game.add.audio('bgmusic');
		this.music.loopFull(1);
	}
	gameUpdate(game){
	}
	gameRender(game){
	}
	render(){
		return(
			<div id="gamePage">
				<img ref='title' className="title" src="images/title.png" />
				<Spinner rect={[67,67,133,399]}/>
				<Footer ref='footer'/>
			</div>
		);
	}
	gamePixeltoDOM(val){
		return $(this.game.canvas).width()*val/800.0;
	}
	onResize(){
		let marginTop = this.game.canvas.style.marginTop;
		$(this.refs.title).css('margin-top',marginTop);
		$(this.refs.title).css('height',this.gamePixeltoDOM(66));


		//this is stupid, but face book designed it that way
		$(this.refs.footer.refs.footer).css('margin-top',this.gamePixeltoDOM(400));
		$(this.refs.footer.refs.footer).css('height',this.gamePixeltoDOM(122));
	}
}
