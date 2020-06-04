import React, {Component, useState} from 'react'
import {ScrollView, View, Text, FlatList} from 'react-native'

export default function Orden({data}){
  const [products, setProducts] = useState(Array)

  return(
    <View>
      <Text>Esta orden</Text>
      <FlatList 
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={
          <Text>un producto</Text>
        }
      />
    </View>
  )
}

/*
{this.renderHeader()}
        {this.state.showItems ? (
          <View style={{ flex: 2 }}>
            <FlatList
              ref={this.myComponent}
              data={this.state.serverData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.product}
                  onPress={() => {
                    this.orden.push(item);
                    this.setState({ orden: this.orden });
                  }}>
                  <Text style={styles.productDesc}>{item.description}</Text>
                  <Text style={styles.productDetail}>
                    {'Restantes: ' + item.stock}
                  </Text>
                  <Text style={styles.productDetail}>
                    {'Precio: ' + item.unit_price}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View />
        )}
*/