import './App.css';
import styled from 'styled-components';
import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
      super(props);
      this.data = [];
      this.setUpdateFlag = true;
      this.state = {
        posts: []
      }
    }
    componentDidMount() {
      const url = "https://webcdn.17app.co/campaign/pretest/data.json";
      fetch(url)
      .then(response => response.json())
      .then(json => this.setState({ posts: json }))
    }
    dataUpdate(){
      setInterval( () => {
        this.pointUpdate();
        this.rankSort();
        this.forceUpdate();
      } , 1000);
    }
    pointUpdate(){
      for(let i = 0; i < this.data.length; i++){
        this.data[i]['score'] = this.data[i]['score'] + Math.floor( Math.random() * 1000 );
      }
    }
    rankSort(){
      for(let i = 0; i < this.data.length; i++){
        for(let j = 0; j < this.data.length - 1 - i; j++){
          if(this.data[j + 1]['score'] > this.data[j]['score']){
            let temp;
            temp = this.data[j];
            this.data[j] = this.data[j + 1];
            this.data[j + 1] = temp;
          }
        }
      }
    }
    render() {
      const { posts } = this.state;
      if(this.setUpdateFlag){
        if(posts[0] !== undefined){
          this.data = posts;
          this.dataUpdate();
          this.setUpdateFlag = false;
        }
      }    
      return (
        <MainDivItem className="container">
          {this.data.map((post) => (
            <div className="card" key={post.userID}>
              <GroupStyleItem>
                <CardBodyStyleItem className="card-body">
                  <div>{post.id}</div>
                  <div><ImgStyleItem src={post.picture}></ImgStyleItem></div>&nbsp;
                  <div>{post.displayName}</div> 
                </CardBodyStyleItem>
                <div>{post.score}pt</div>&nbsp;&nbsp;&nbsp;
              </GroupStyleItem>
            </div>
          ))}
        </MainDivItem>
      );
    }
}

const MainDivItem = styled.div`
    width: 30rem;
    weight: 30rem;
`;

const ImgStyleItem = styled.img`
    width: 3rem;
    weight: 3rem;
    border-radius: 3rem;
`;

const GroupStyleItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
`;

const CardBodyStyleItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
`;

export default App;