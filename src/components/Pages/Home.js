import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Dimensions, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { uploadPhoto } from '../../actions/ImageActions';
import img from '../../img/imgText.png'
import Button from '../global/Button'
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import { Container, Content, Form, Item, Input, Label } from 'native-base';

const { width, height } = Dimensions.get('window');

class Home extends Component {

  state = {
    photoUri: null,
    isVisible: true
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  handleSelectPhotoButton = () => {
    const options = {
      title: 'Select Photo',
      noData: true,
      quality: 0.7
    };

    ImagePicker.showImagePicker(options, (response) => {
      const uri = response.uri;
      if (uri) {
        this.setState({ photoUri: uri });
      }
    });
  }

  handleUploadPhotoButton = () => {
    const uri = this.state.photoUri;
    const firstName = this.state.firstName;
    const surName = this.state.surName;
    const age = this.state.age;

    console.log(uri, firstName, surName, age);
    this.props.uploadPhoto(uri, firstName, surName, age);
    this.setState
      ({
        isModalVisible: !this.state.isModalVisible,
        firstName: null,
        surName: null,
        age: null,
        photoUri: null
      });
  }

  closeModal = () => {
    this.setState
      ({
        isModalVisible: !this.state.isModalVisible,
        firstName: null,
        surName: null,
        age: null,
        photoUri: null
      });
  }


  render() {
    return (
      <View style={styles.container}>
        <Modal isVisible={this.state.isModalVisible}>
          <Container style={styles.modalContainer}>
            <Content>
              <View style={styles.exit}>
                <Text onPress={this.closeModal} style={styles.bigFontSize}>X</Text>
              </View>
              <Form>
                <Item floatingLabel>
                  <Label>Name </Label>
                  <Input
                    onChangeText={(text) => this.setState({ firstName: text })}
                    value={this.state.text}
                  />
                </Item>
                <Item floatingLabel last>
                  <Label>Surname</Label>
                  <Input
                    onChangeText={(text) => this.setState({ surName: text })}
                    value={this.state.text}
                  />
                </Item>
                <Item floatingLabel last>
                  <Label>Age</Label>
                  <Input
                    onChangeText={(text) => this.setState({ age: text })}
                    value={this.state.text}
                  />
                </Item>

                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <TouchableOpacity
                    style={styles.selectPhotoButton}
                    onPress={this.handleSelectPhotoButton}>
                    <Text>Select a Photo</Text>
                  </TouchableOpacity>
                  {
                    this.state.photoUri === null
                      ?
                      <Text style={{ marginTop: 20 }}>Please Select a Photo</Text>
                      :
                      <Image source={{ uri: this.state.photoUri }} style={{ height: 200, width: 200, marginTop: 20, marginBottom: 20 }} />
                  }
                </View>

              </Form>
              <View style={styles.buttonView}>
                <Button handleButton={this.handleUploadPhotoButton} buttonName='Save' />
              </View>
            </Content>
          </Container>
        </Modal>

        <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <Image style={styles.imageStyle} source={img} />
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Button handleButton={this.toggleModal} buttonName='Create New Record' />
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
    paddingBottom: 20
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center'
  },
  exit: {
    alignItems: 'flex-end',
    marginTop: 20,
    marginRight: 10
  },
  bigFontSize: {
    fontSize: 20
  },
  buttonView: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    flex: 1,
    width: 420,
    height: 420,
    resizeMode: 'contain'
  },
  selectPhotoButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: width * 0.5,
    fontSize: 12,
    padding: 7,
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  photoStyle: {
    padding: 10
  }
})

const mapStateToProps = ({ imageResponse }) => {
  console.log('authResponse:', imageResponse)
  return { loading: imageResponse.loading }
};
export default connect(mapStateToProps, { uploadPhoto })(Home);