import React, { Component } from 'react';

class App extends Component {
    
    constructor(){
        super();
        this.state={
            value1:"",
            value2:""
        }
        
        this.handleChange1=(event)=>{
            this.setState({
                value1:event.target.value
            })
        }
        
        this.handleChange2=(event)=>{
            this.setState({
                value2:event.target.value
            })              
        }
    }
     
  render() {
      
      let colour1="red",colour2="red",colour3="red",colour4="red",colour5="red";
      if(this.state.value1.length >= "8")
      {
          colour1="green";    
      }
      if(this.state.value1.match(/[A-Z]/))
      {
          colour2="green";    
      }
      if(this.state.value1.match(/[a-z]/))
      {
          colour3="green";    
      }
      if(this.state.value1.match(/[\d`~!@#$%\^&*()+=|;:'",.<>\/?\\\-]/))
      {
          colour4="green";    
      }
      if(this.state.value1 === this.state.value2 && this.state.value1!=="" )
      {
          colour5="green";    
      }
      
      const style={
          boxShadow:"2px 2px 3px 3px #ccc",
          border:"2px #eee",
          padding:"20px",
          marginTop:"25px"
      }
           
    return (
        
    <div className="container"> 
    <div className="row">
    <div className="col-md-4"></div>
        
    
    <div className="col-md-4">
    <div style={style}>
    <form> 
          <p style={{fontWeight:"bold"}}><p style={{ color: 'White' }}>Update Password, password must have:</p></p>
          <p style={{ color: 'white' }}><p><i style={{color:colour1,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 8 characters</p></p>
          <p style={{ color: 'white' }}> <p><i style={{color:colour2,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 uppercase letter</p></p>
          <p style={{ color: 'white' }}> <p><i style={{color:colour3,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 lowercase letter</p></p>
          <p style={{ color: 'white' }}><p><i style={{color:colour4,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> At least 1 number or special character</p></p>
          <p style={{ color: 'white' }}> <p><i style={{color:colour5,fontSize:"20px"}} class="fa fa-check-circle" aria-hidden="true"></i> </p></p>
        
          <div class="form-group">
            <label for="password"></label>
            <input type="text" class="form-control" style={{width: '100%',height: '25px'}} value={this.state.value1} onChange={this.handleChange1} placeholder="Password"/>
          </div>
          <div class="form-group">
            <label for="password"></label>
            <input type="text" class="form-control" style={{width: '100%',height: '25px'}} value={this.state.value2} onChange={this.handleChange2} placeholder="Confirm Password"/>
          </div> 
         {this.state.value2 === "" ? "" :
         (this.state.value1 === this.state.value2  ? <p style={{color:"green",fontWeight:"bold"}}> Passwords match </p> :
         <p style={{color:"red",fontWeight:"bold"}}> Passwords don't match </p>
          )}
    </form>
    </div>
    </div>
   
        
    <div className="col-md-4"></div>
    </div>
    </div>
    );
  }
}

export default App;