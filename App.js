import React, {Component} from 'react';
import {Button, FlatList, Image, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  state = {
    posts: [],
    postIndex: 0,
    formsNum: 5,
  };

  getPosts() {
    return new Promise((resolve,reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://jsonplaceholder.typicode.com/photos', true);
      xhr.send();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          switch (xhr.status) {
            case 200: resolve(xhr.responseText);
              break;
            default: reject(xhr.status);
              break;
          }
        }
      }
    });
  }

  componentDidMount() {
    this.getPosts()
      .then((value) => {
        var posts = JSON.parse(value).map((post,id) => {
          post.key = '' + id;
          return post;
        });
        this.setState({posts: posts})
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  onPrev() {
    this.state.postIndex >= this.state.formsNum ? this.setState({postIndex: this.state.postIndex - this.state.formsNum}) : this.setState({postIndex: 0})
  }

  onNext() {
    if (this.state.postIndex <= (this.state.posts.length - this.state.formsNum)) this.setState({postIndex: this.state.postIndex + this.state.formsNum})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center'}}>
          <FlatList
            data={this.state.posts.slice(this.state.postIndex, this.state.postIndex + this.state.formsNum)}
            renderItem={data =>
              <View style={styles.element}>
                <Image
                  source={{uri: data.item.thumbnailUrl}}
                  style={{width: 75, height: 75, margin: 5}}
                />
                <View style={styles.text}>
                  <Text>{data.item.title}</Text>
                  <Text style={{alignSelf: 'flex-end'}}>{'#PostID: ' + data.item.id}</Text>
                </View>
              </View>
            }
          />
        </View>
        <View style={styles.buttons}>
          <View style={{width:'45%'}}>
            <Button title='prev' onPress={this.onPrev.bind(this)}/>
          </View>
          <View style={{width:'45%'}}>
            <Button title='next' onPress={this.onNext.bind(this)}/>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  element: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    marginTop: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    paddingRight: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    padding: 20,
    backgroundColor: '#e9edf1'
  }
});
