import React,{Component} from 'react';

export default class Spinner extends Component{
	constructor(x,y,w,h){
		super();
	}
	render(){
		let rect = this.props.rect;
		let style={left:rect[0],top:rect[1],width:rect[2],height:[3]};
		return(
			<div ref="spinner" className="spinner" style={style}></div>			
		);
	}
}
