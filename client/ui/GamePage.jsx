import React,{Component} from 'react';
import Footer from './Footer.jsx';
import Spinner from './Spinner.jsx';
import Sidebar from './Sidebar.jsx';
import Controller from '../controller.js';
export default class GamePage extends Component{
	constructor(){
		super();

	}
	componentDidUpdate(prevProps,prevState){
		this.props.game.scale.onSizeChange.add(this.onResize,this);
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.onResize();
		let spinner		= [
							this.refs.spinner0,
							this.refs.spinner1,
							this.refs.spinner2,
							this.refs.spinner3,
							this.refs.spinner4];
		let footer		=	this.refs.footer;
		let sidebar		=	this.refs.sidebar;
		this.controller =	new Controller(spinner,sidebar,footer);
	}
	gamePreload(){
		//preload is belongs to loading page, this never should been called
	}
	gameCreate(){
		this.music = this.props.game.add.audio('bg-music');
		this.controller.spinMusic = this.props.game.add.audio('spin-music');
		this.controller.spinStopMusic = this.props.game.add.audio('spin-stop-music');
		this.music.loopFull(0.3);
		this.refs.spinner0.create();
		this.refs.spinner1.create();
		this.refs.spinner2.create();
		this.refs.spinner3.create();
		this.refs.spinner4.create();

		this.refs.sidebar.create();
	}
	gameUpdate(){
		this.refs.spinner0.update();
		this.refs.spinner1.update();
		this.refs.spinner2.update();
		this.refs.spinner3.update();
		this.refs.spinner4.update();

		this.refs.sidebar.update();
	}
	gameRender(){
	}
	render(){
		return(
			<div ref="page" id="gamePage">
				<img ref='title' className="title" src="images/title.png" />
				<Sidebar ref='sidebar' game={this.props.game}/>
				<Spinner ref='spinner0' rect={[67,67,133,399]} game={this.props.game}/>
				<Spinner ref='spinner1' rect={[200,67,133,399]} game={this.props.game}/>
				<Spinner ref='spinner2' rect={[333,67,133,399]} game={this.props.game}/>
				<Spinner ref='spinner3' rect={[466,67,133,399]} game={this.props.game}/>
				<Spinner ref='spinner4' rect={[599,67,133,399]} game={this.props.game}/>
				<Footer ref='footer' game={this.props.game}/>
			</div>
		);
	}
	gamePixeltoDOM(val){
		return $(this.props.game.canvas).width()*val/800.0;
	}
	onResize(){
		//resize title 
		let gameWidth = $(this.props.game.canvas).width();
		$(this.refs.page).css('width',gameWidth);
		let marginTop = this.props.game.canvas.offsetTop;
		$(this.refs.title).css('margin-top',marginTop);
		$(this.refs.title).css('height',this.gamePixeltoDOM(66));

		//resize sidebar
		$(this.refs.sidebar.refs.sidebar).css('margin-top',marginTop);
		$(this.refs.sidebar.refs.sidebar).css('top',this.gamePixeltoDOM(67));
		$(this.refs.sidebar.refs.sidebar).css('height',this.gamePixeltoDOM(400));

		//resize spinner
		//margintop = this.gamePixeltoDOM(67)+marginTop;
		$(this.refs.spinner0.refs.spinner).css('margin-top',marginTop);
		$(this.refs.spinner1.refs.spinner).css('margin-top',marginTop);
		$(this.refs.spinner2.refs.spinner).css('margin-top',marginTop);
		$(this.refs.spinner3.refs.spinner).css('margin-top',marginTop);
		$(this.refs.spinner4.refs.spinner).css('margin-top',marginTop);

		//resize footer
		//this is stupid, but face book designed it that way
		$(this.refs.footer.refs.footer).css('margin-top',this.gamePixeltoDOM(400));
		$(this.refs.footer.refs.footer).css('height',this.gamePixeltoDOM(122));
	}
}
