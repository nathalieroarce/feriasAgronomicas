import React, { Component } from 'react';
import { ListView, View, Image, Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';


const data = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgczAlJbEstRsc8i1avw9AbHP9CNJanGCSK1k5Vs8nZ-sjWJyY3g',
    ownner: 'El norte S.A.',
    name: 'Papas',
    id: 0,
    price: 100,
    um: 'Kgg',
  },
  {
    image: 'http://www.eluniversal.com.mx/sites/default/files/styles/f03-651x400/public/2016/11/17/lo_que_no_sabias_de_las_papas.jpg?itok=pc-BFYqf',
    ownner: 'Don Domingo S.A.',
    name: 'Papas',
    id: 0,
    price: 250,
    um: 'Kg',
  },
  {
    image: 'https://img-aws.ehowcdn.com/750x500/photos.demandstudios.com/93/94/fotolia_515058_XS.jpg',
    ownner: 'Las Americas S.A.',
    name: 'Papa roja',
    id: 0,
    price: 200,
    um: 'Kg',
  },
];
const rowHasChanged = (r1, r2) => r1.id !== r2.id;
const ds = new ListView.DataSource({ rowHasChanged });

class SearchResults extends Component {
  print = () => {
    console.log('Hello world');
  };

  state = {
    dataSource: ds.cloneWithRows(data),
  };

  renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Image source={{ uri: rowData.image }} style={styles.image} />

        <View style={styles.rowContent}>
          <Text style={styles.rowTitle}>
            {rowData.name}
          </Text>

          <Text>
            Productor:
            {rowData.ownner}
          </Text>

          <Text>
            Precio:
            {rowData.price} / {rowData.um}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.appContainer}>
        <SearchBar
          onChangeText={this.print}
          onClearText={this.print}
          placeholder="¿Que buscas?"
        />
        <ListView
          style={styles.appContainer}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    backgroundColor:'black',
  },
  image: {
    width: 70,
    height: 70,
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#81F79F',
  },
  rowContent: {
    paddingLeft: 40,
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchResults;