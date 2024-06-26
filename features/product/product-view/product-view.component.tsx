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
import {Input, Overlay, Divider} from '@rneui/themed';
import {Product} from '../../models/market-models';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFS from 'react-native-fs';
import {userContext} from '../../context/market.context';

type pagerViewRef = React.ElementRef<typeof PagerView>;

export const ProductView = ({
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct,
  notifications,
  onResetNotifications,
  product,
}: {
  onCreateProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: number) => void;
  notifications: {message: string};
  onResetNotifications: (message: string) => void;
  product: Product | undefined;
}) => {
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

  const checkImages = (images: string[]) => {
    if (images.length === 0) {
      setVisibleOverlay(!visibleOverlay);
      setMessage('minimum required images number : 1');
      return true;
    }
    if (images.length > 5) {
      setVisibleOverlay(!visibleOverlay);
      setFormProduct(previousState => ({...previousState, images: []}));
      setMessage('maximum number of images allowed : 5');
      return true;
    } else return false;
  };

  const onSubmit = (product: Product) => {
    if (!contextUserData.userData.accessToken) {
      setVisibleOverlay(true);
      setMessage('For add or update product you must be signed in');
      return;
    }

    if (!product.id && !checkImages(product.images)) {
      onCreateProduct(product);
    }
    if (product.id && !checkImages(product.images)) {
      onUpdateProduct(product);
    }
  };

  useEffect(() => {
    pagerView.current?.setPage(count);
    if (product?.id) {
      setFormProduct(product);
    }
  }, [count, product]);

  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <Input
          label="name"
          value={formProduct.name}
          onChangeText={name => handleNameChanges(name)}
        />
        <Input
          label="Description"
          value={formProduct.description}
          onChangeText={description => handleDescriptionChanges(description)}
        />
        <Input
          label="Price"
          value={formProduct.price}
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
              style={{
                width: 350,
                height: 350,
                backgroundColor: 'dodgerblue',
                borderRadius: 6,
              }}
              source={{uri: formProduct.images[index]}}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
        }}>
        {formProduct.images.length !== 0 ? (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Pressable
              style={{marginRight: 20}}
              android_ripple={{
                color: 'lightsalmon',
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
                color: 'lightsalmon',
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
      <Divider width={3} style={{marginHorizontal: 25}} />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}>
        <Text style={{textAlign: 'center'}}>If you are a seller </Text>
        <MaterialIcons name="arrow-downward" style={productViewStyle.icon} />
      </View>
      <View style={[style.mainButtonContainer, {flex: 1}]}>
        <Pressable
          android_ripple={{color: 'lightsalmon'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => handleFileSelection()}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.lightText}>Select </Text>
            <MaterialIcons
              name="image"
              color="ghostwhite"
              style={productViewStyle.icon}
            />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{color: 'lightsalmon'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => {
            onSubmit(formProduct);
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text style={style.lightText}>SUBMIT </Text>
            <MaterialIcons
              name="send"
              color="ghostwhite"
              style={productViewStyle.icon}
            />
          </View>
        </Pressable>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            android_ripple={{
              color: 'lightsalmon',
              borderless: true,
              radius: 25,
            }}
            onPress={() => setVisibleOverlay(true)}>
            <MterialCommunityIcons
              style={{margin: 20}}
              size={40}
              color={'tomato'}
              name="delete-circle"
            />
          </Pressable>
          <Text style={{color: 'tomato'}}>Delete product</Text>
        </View>
      </View>
      <Overlay isVisible={visibleOverlay} onBackdropPress={toggleOverlay}>
        <Text>{message}</Text>
      </Overlay>
      <Overlay isVisible={notifications.message !== ''}>
        <Text style={style.greenPalette}>{notifications.message}</Text>
        <Pressable
          android_ripple={{color: 'lightsalmon'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => resetNotifications('')}>
          <Text>OK</Text>
        </Pressable>
      </Overlay>
      <Overlay isVisible={visibleOverlay}>
        <Text>You are sure to delete {product?.name}</Text>
        <Pressable
          android_ripple={{color: 'lightsalmon'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => {
            if (formProduct.id !== undefined) {
              onDeleteProduct(formProduct.id);
            }
          }}>
          <Text>Yes</Text>
        </Pressable>
        <Pressable
          android_ripple={{color: 'lightsalmon'}}
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => setVisibleOverlay(false)}>
          <Text>No</Text>
        </Pressable>
      </Overlay>
    </ScrollView>
  );
};
