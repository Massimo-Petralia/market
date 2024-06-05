import {View, Text, Pressable, ImageBackground, ScrollView} from 'react-native';
import {style} from '../../shared-style/style';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import {pick, types} from 'react-native-document-picker';
import PagerView from 'react-native-pager-view';
import {productViewStyle} from './product-view.style';
import {Input, Overlay} from '@rneui/themed';
import {Product} from '../../models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import {userContext} from '../../context/market.context';
import { useRoute } from '@react-navigation/native';
import { ProductRouteProp } from '../../navigation/types';

type pagerViewRef = React.ElementRef<typeof PagerView>;

export const ProductView = ({
  onCreateItem,
  notifications,
  onResetNotifications,
}: {
  onCreateItem: (product: Product) => void;
  notifications: {message: string};
  onResetNotifications: (message: string) => void;
}) => {
  const route = useRoute<ProductRouteProp>()
  const params = route.params
 // console.log('id: ',params.id)
  const contextUserData = useContext(userContext);

  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>('');
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);

  const [formProduct, setFormProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const updateFormProduct = (key: keyof Product, value: string | string[]) => {
    setFormProduct(previousFormProduct => {
      return {...previousFormProduct, [key]: value};
    });
  };

  const handleNameChanges = (name: string) => updateFormProduct('name', name);
  const handleDescriptionChanges = (description: string) =>
    updateFormProduct('description', description);
  const handlePriceChanges = (price: string) =>
    updateFormProduct('price', price);
  const handleImagesChanges = (images: string[]) =>
    updateFormProduct('images', images);

  const toggleOverlay = () => {
    setVisibleOverlay(!visibleOverlay);
  };

  const resetNotifications = (value: string) => {
    onResetNotifications(value);
  };

  const handleFileSelection = useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });
      const files: string[] = [];
      for (let file of response) {
        const base64String = await RNFS.readFile(file.uri, 'base64');
        files.push(`data:image/${file.type};base64,${base64String}`);
      }
      handleImagesChanges(files);
    } catch (error) {
      console.error('error: ', error);
    }
  }, []);

  const pagerView = useRef<pagerViewRef>(null);

  const onSubmit = (product: Product) => {
    if (!contextUserData.userData.accessToken) {
      setVisibleOverlay(true);
      setMessage('For add product you must be signed in');
      return;
    }
    if (formProduct.images.length === 0) {
      setVisibleOverlay(!visibleOverlay);
      setMessage('minimum number of images allowed : 1');
      return;
    }
    if (formProduct.images.length > 5) {
      setVisibleOverlay(!visibleOverlay);
      setFormProduct(previousState => ({...previousState, images: []}));
      setMessage('maximum number of images allowed : 5');
      return;
    }
    if (product.name && product.images.length !== 0) {
      onCreateItem(product);
    }
  };

  useEffect(() => {
    pagerView.current?.setPage(count);
  }, [count]);

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <Input label="name" onChangeText={name => handleNameChanges(name)} />
        <Input
          label="Description"
          onChangeText={description => handleDescriptionChanges(description)}
        />
        <Input
          label="Price"
          onChangeText={price => handlePriceChanges(price)}
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
        {formProduct.images.map((file, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <ImageBackground
              style={{width: 350, height: 350, backgroundColor: 'dodgerblue'}}
              source={{uri: formProduct.images[index]}}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {formProduct.images.length !== 0 ? (
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
              {count + 1} / {formProduct.images.length.toString()}
            </Text>
            <Pressable
              style={{marginLeft: 20}}
              android_ripple={{
                color: 'lightgreen',
                borderless: true,
                radius: 25,
              }}
              onPress={() => {
                if (count == formProduct.images.length - 1) {
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
            onSubmit(formProduct);
          }}>
          <Text style={style.lightText}>SUBMIT</Text>
        </Pressable>
      </View>
      <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay}>
        <Text>{message}</Text>
      </Overlay>
      <Overlay isVisible={notifications.message !== ''}>
        <Text style={style.notifications}>{notifications.message}</Text>
        <Pressable
          android_ripple={{color: 'lightgreen'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => resetNotifications('')}>
          <Text>OK</Text>
        </Pressable>
      </Overlay>
    </ScrollView>
  );
};
