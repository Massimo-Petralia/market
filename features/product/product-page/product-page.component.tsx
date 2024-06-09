import {useContext, useEffect, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {ProductView} from '../product-view/product-view.component';
import {Product} from '../../models/market-models';
import {UserContext} from '../../context/market.context';
import {ProductServices} from '../../services/product.services';
import {useRoute} from '@react-navigation/native';
import {
  ProductRouteProp,
  HomeScreenNavigationProp,
} from '../../models/navigation-types';
import {useNavigation} from '@react-navigation/native';

const productService = new ProductServices();

export const ProductPage = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<ProductRouteProp>();
  const params = route.params;
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const userContext = useContext(UserContext);
  const [notifications, setNotifications] = useState({message: ''});
  const handleNotifications = (message: string) => {
    setNotifications(notificationsState => ({
      ...notificationsState,
      message: message,
    }));
  };
  const onCreateProduct = (product: Product) => {
    productService
      .createProduct(
        {
          ...product,
          userId: userContext.userData?.user?.id,
        },
        userContext.userData?.accessToken,
      )
      .then(async response => {
        const data: Product = await response.json();
        setProduct(data);
        handleNotifications('Product added !');
      })
      .catch(error => console.error('post request failed: ', error));
  };

  const onUpdateProduct = (product: Product) => {
    productService
      .updateProduct(product, userContext.userData.accessToken)
      .then(async response => {
        const responseData = await response.json();
        if (typeof response === 'string') {
          const warning: string = responseData;
          handleNotifications(warning);
        } else {
          const data: Product = responseData;
          setProduct(data);
        }
      })
      .catch(error => console.error('put request failed: ', error));
  };

  const onDeleteProduct = (id: number) => {
    productService
      .deleteProduct(id, userContext.userData.accessToken)
      .then(async response => {
        const responseData = await response.json();
        if (typeof response === 'string') {
          const warning: string = responseData;
          handleNotifications(warning);
        } else {
          navigation.navigate('Home');
        }
      })
      .catch(error => console.error('delete request failed: ', error));
  };

  const onResetNotifications = (value: string) => {
    setNotifications({message: value});
  };

  useEffect(() => {
    if (params.id) {
      productService
        .getProduct(params.id)
        .then(async response => {
          const data: Product = await response.json();
          setProduct(data);
        })
        .catch(error => console.error('get request failed: ', error));
    }
  }, []);

  return (
    <View style={{flex: 1}}>
      <ProductView
        notifications={notifications}
        onResetNotifications={onResetNotifications}
        onCreateProduct={onCreateProduct}
        onUpdateProduct={onUpdateProduct}
        onDeleteProduct={onDeleteProduct}
        product={product}
      />
    </View>
  );
};
