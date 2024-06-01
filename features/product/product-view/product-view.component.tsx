import {View, Text, Pressable, ImageBackground, ScrollView} from 'react-native';
import {style} from '../../shared-style/style';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import {
  DocumentPickerResponse,
  pick,
  types,
} from 'react-native-document-picker';
import PagerView from 'react-native-pager-view';
import {productViewStyle} from './product-view.style';
import {Input, Overlay} from '@rneui/themed';
import {Product} from '../../models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import {userContext} from '../../contexts/user.context';

type pagerViewRef = React.ElementRef<typeof PagerView>;

export const ProductView = ({
  onCreateItem,
  notifications,
  onNotifications
}: {
  onCreateItem: (product: Product) => void;
  notifications: {message: string};
  onNotifications: (message: string)=> void
}) => {
  const contextUserData = useContext(userContext);

  const [formProduct, setFormProduct] = useState<Product>({
    name: '',
    description: '',
    price: '',
    images: [],
  });

  const [productNotifications, setProductNotifications] = useState<{message: string}>({message: ''})

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

  const [message, setMessage] = useState<string>('');
  const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);

  const toggleOverlay = () => {
    setVisibleOverlay(!visibleOverlay);
  };

  const toggleOvarlaySuccess = ()=> {
    return notifications.message ! == '' ? false : true
  }
  

  const onSubmit = (product: Product) => {
    if (!contextUserData.userData.accessToken) {
      setVisibleOverlay(!visibleOverlay);
      return;
    } else onCreateItem(product);
  };
  const handleNotifications = (message: string) => {
    onNotifications(message)
  }

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
        }
        handleImagesChanges(files);
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
    setProductNotifications(notifications)
  }, [count, productNotifications]);

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
      {message ? <Text>{message}</Text> : null}
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
        <Text>To add products you must be logged in</Text>
      </Overlay>
      <Overlay
      isVisible={notifications.message !== ''}
     
      >
        <Text style={style.notifications}>{notifications.message}</Text>
        <Pressable
         android_ripple={{color: 'lightgreen'}}
         style={[style.pressable, {marginTop: 10}]}
         onPress={()=> handleNotifications('')}
        >
          <Text>OK</Text>
        </Pressable>
      </Overlay>
    </ScrollView>
  );
};
