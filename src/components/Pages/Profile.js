import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class Profile extends Component {

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpn2CwuuukdKymh0eZBPJSr--mrV8bgt2V9ZYu4lMsQw0J1ROx'}} />
                <Body>
                  <Text>Student Name: Ayşe Nilüfer</Text>
                  <Text note>Age: 7</Text>
                </Body>
              </Left>
            </CardItem>
            {/* <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem> */}
            <CardItem>
              <Left>
                  <Text>45 Words</Text>
              </Left>
              <Body>
                  <Text>180 letters</Text>
              </Body>
              <Right>
                <Text>82%</Text>
              </Right>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'data:image/png;base64,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'}} />
                <Body>
                  <Text>Student Name: Ali Tarhan</Text>
                  <Text note>Age: 7</Text>
                </Body>
              </Left>
            </CardItem>
            {/* <CardItem cardBody>
              <Image source={{uri: 'Image URL'}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem> */}
            <CardItem>
              <Left>
                  <Text>45 Words</Text>
              </Left>
              <Body>
                  <Text>180 letters</Text>
              </Body>
              <Right>
                <Text>66%</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}