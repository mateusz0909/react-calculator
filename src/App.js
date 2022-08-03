import React from 'react'
import ReactDOM from 'react-dom'

class Output extends React.Component {
  render() {
    return(
      <div id='display'>
        <p>{this.props.output===""? "0":this.props.output }</p>
      </div>
    )
  }
}

class Keyboard extends React.Component {
    render() { 
      return (
        <div id='keyboard'>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)}id='clear'>AC</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='divide'>/</div>         
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='nine'>9</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='eight'>8</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='seven'>7</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='multiply'>*</div>         
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='six'>6</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='five'>5</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='four'>4</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='subtract'>-</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='three'>3</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='two'>2</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='one'>1</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='add'>+</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='zero'>0</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='decimal'>.</div>
          <div className='button' onClick={(e)=>this.props.onClick(e.target.textContent)} id='equals'>=</div>         
        </div>            
      )
      
    }
  }
class App extends React.Component { 
    constructor(props){
      super(props)
      this.state = {
        result: ''
      }
      this.onClick=this.onClick.bind(this)
      this.calculate=this.calculate.bind(this)
      this.clear=this.clear.bind(this)
      this.evalZeros=this.evalZeros.bind(this)
      this.multiCheck=this.multiCheck.bind(this)
    }
  
  calculate = () => {
    try {
       this.setState ({
      result: (eval(this.state.result)||'')+''
    })
    }
   catch (err) {
     this.setState ({
      result: 'Error'
    })
    }
   }
 
  clear = () => {
    this.setState({
      result: ''
    })
  }
  evalZeros = () => {
    let value = this.state.result
    if (value.startsWith('0')) {
      this.setState({
        result: ''
      })
    }

  }  
    
  multiCheck = (e) => {
    let result = this.state.result
    if ((e==='+'|| e==='*'|| e==='/') && result==='') {
      this.setState({
        result: ''
      }) 
      }
    else if (e==='.'&& result.endsWith('.')) {
      this.setState({
        result: this.state.result
      })
    }
    else if ((e==='+'|| e==='*'|| e==='/')&&(result.endsWith('+')||result.endsWith('-')||result.endsWith('*')||result.endsWith('/'))) {
      this.setState({
        result: result.slice(0,-1)+ e
      }) 
      }
  }
  onClick =(e)=>{
    if (e==='=') 
      this.calculate()
    
    else if (e==='AC')
      this.clear()
    else {
      
      this.setState ({
      result: this.state.result + e
    })
      this.multiCheck(e)
      this.evalZeros()
    }
     
  } 
    render() { 
      return (
      <div id='calculator'> 
        <Output output={this.state.result}/>
        <Keyboard onClick={this.onClick}/> 
      </div>
      )
    }
  }; 

ReactDOM.render(<App/>,document.querySelector('#root')) 
export default App;
