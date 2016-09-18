import React,{Component} from 'react';

export default class Spinner extends Component{
	constructor(x,y,w,h){
		super();
		this.spriteNames = [
			'9','10','A','J','K','Odo','Q','SeaHorse','Shark','Shell','StarFish','Turtle','Whale'
		]
		this.friction = 1;//0.98;
		this.speed = 40;
		this.stopped = true;
		this.state={
		onStop:null
	}
	}
	SetFriction(friction){
		this.friction = friction;
	}
	Start(){
		this.speed = 40;
		this.friction=1;
		this.stopped = false;
	}
	componentDidMount(){
		this.game = this.props.game;
		this.group = this.game.add.group();
		this.group.x = this.props.rect[0];
		this.group.y = this.props.rect[1];
		this.group.width = this.props.rect[2];
		this.group.height = this.props.rect[3];
	}
	randomImage(){
		const index = Math.floor(Math.random()*this.spriteNames.length);
		return this.spriteNames[index];
	}
	create(){
		//create mask
		this.mask = this.game.add.graphics(0,0);
		this.mask.beginFill(0xffffff,0);
		this.mask.drawRect(this.props.rect[0],this.props.rect[1],this.props.rect[2],this.props.rect[3]);
		this.mask.endFill();
		//create sprite
		for(var i = 0;i<5;i++){
			let sprite = this.group.create(0,(i-1)*133,this.randomImage());
			sprite.width=133;
			sprite.height=133;
			sprite.mask =this.mask;
		}
	}
	update(){
		if(!this.stopped){
			this.speed *= this.friction;
			this.speed = this.speed<2?2:this.speed;
			this.updateSprites()
		}
	}
	checkStop(){
		if(this.speed == 2){
			this.stopped = true;
			var result = [];
			result.push(this.group.getAt(1).key);
			result.push(this.group.getAt(2).key);
			result.push(this.group.getAt(3).key);
			this.state.onStop(result);
		}
	}
	updateSprites(){
		this.group.forEach((item)=>{
			item.y += this.speed;	
		});
		if(this.group.length<5){
			var topSprite = this.group.getAt(0);
			var newSprite = this.group.create(0,topSprite.y-this.props.rect[2],this.randomImage());
			this.group.setChildIndex(newSprite,0);
			newSprite.width=133;
			newSprite.height=133;
			newSprite.mask = this.mask;
		}
		//check the last one
		var lastSprite = this.group.getAt(this.group.length-1);
		if(lastSprite.world.y>this.props.rect[3]+this.props.rect[1])
		{
			if(lastSprite.world.y-this.props.rect[3]-this.props.rect[1]<2) {
				this.checkStop();
			}
			lastSprite.destroy();
		}
	}
	render(){
		let rect = this.props.rect;
		let style={left:this.gamePixeltoDOM(rect[0]),top:this.gamePixeltoDOM(rect[1]),
				width:this.gamePixeltoDOM(rect[2]),height:this.gamePixeltoDOM(rect[3])};
		return(
			<div ref="spinner" className="spinner" style={style}></div>			
		);
	}
	gamePixeltoDOM(val){
		return $(this.props.game.canvas).width()*val/800.0;
	}
}
