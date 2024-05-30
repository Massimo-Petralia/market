import {View, Text, Pressable, ImageBackground, ScrollView} from 'react-native';
import {style} from '../../shared-style/style';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  DocumentPickerResponse,
  pick,
  types,
} from 'react-native-document-picker';
import PagerView from 'react-native-pager-view';
import {productViewStyle} from './product-view.style';
import {Input} from '@rneui/themed';
import {Product} from '../../models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';

type pagerViewRef = React.ElementRef<typeof PagerView>;

export const ProductView = ({
  onCreateItem,
}: {
  onCreateItem: (product: Product) => void;
}) => {
  const [fileResponse, setFileResponse] = useState<string[]>([]);
  const [formProduct, setFormProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const updateFormProduct = (key: keyof Product, value: string | string[]) => {
    setFormProduct((previousFormProduct) => {
      return {...previousFormProduct, [key]: value};
    });
  };

  const [message, setMessage] = useState<string>('');

  const onSubmit = (product: Product) => {
    onCreateItem(product);
  };

  const handleFileSelection = useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });
      if (response.length > 5) {
        setMessage('Only 5 images are allowed');
        return;
      } else {
        const files: string[] = [];
        for (let file of response) {
          const base64String = await RNFS.readFile(file.uri, 'base64');
          files.push(`data:image/${file.type};base64,${base64String}`);
          //console.log('files:  ', base64String)
        }
        setFileResponse(files);
        // productForm.images = fileResponse
        setMessage('');
      }
    } catch (error) {
      console.error('error: ', error);
    }
  }, []);

  const [count, setCount] = useState(0);

  const pagerView = useRef<pagerViewRef>(null);

  useEffect(() => {
    pagerView.current?.setPage(count);
  }, [count]);

  const productForm: Product = {
    name: '',
    description: '',
    price: '',
    images: [],
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <Input label="name" onChangeText={name => (productForm.name = name)} />
        <Input
          label="Description"
          onChangeText={description => (productForm.description = description)}
        />
        <Input
          label="Price"
          onChangeText={price => (productForm.price = price)}
        />
      </View>
      <PagerView
        ref={pagerView}
        initialPage={0}
        collapsable={false}
        useNext={true}
        onPageSelected={e => {
          setCount(e.nativeEvent.position);
        }}>
        {fileResponse.map((file, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <ImageBackground
              style={{width: 350, height: 350, backgroundColor: 'dodgerblue'}}
              source={{uri: fileResponse[index]}}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
      {message ? <Text>{message}</Text> : null}
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {fileResponse.length !== 0 ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Pressable
              style={{marginRight: 20}}
              android_ripple={{
                color: 'lightgreen',
                borderless: true,
                radius: 25,
              }}
              onPress={() => {
                if (count == 0) {
                  return;
                } else setCount(count - 1);
              }}>
              <MaterialIcons style={{fontSize: 50}} name="chevron-left" />
            </Pressable>
            <Text style={productViewStyle.imageStatus}>
              {count + 1} / {fileResponse.length.toString()}
            </Text>
            <Pressable
              style={{marginLeft: 20}}
              android_ripple={{
                color: 'lightgreen',
                borderless: true,
                radius: 25,
              }}
              onPress={() => {
                if (count == fileResponse.length - 1) {
                  return;
                } else setCount(count + 1);
              }}>
              <MaterialIcons style={{fontSize: 50}} name="chevron-right" />
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={[style.mainButtonContainer, {flex: 1}]}>
        <Pressable
          android_ripple={{color: 'lightgreen'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => handleFileSelection()}>
          <Text style={style.lightText}>Select {'\u{1F5BC}'}</Text>
        </Pressable>
        <Pressable
          android_ripple={{color: 'lightgreen'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => {
            onSubmit(productForm);
            console.log('product from view', productForm);
          }}>
          <Text style={style.lightText}>SUBMIT</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};
