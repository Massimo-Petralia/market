import {useContext, useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import {ProductView} from '../product-view/product-view.component';
import {Product} from '../../models';
import {userContext} from '../../context/market.context';
import {ProductServices} from '../../services/product.services';

const productService = new ProductServices();

export const ProductPage = () => {
  const contextUserData = useContext(userContext);
  const [notifications, setNotifications] = useState({message: ''});
  const handleNotifications = (message: string) => {
    setNotifications(notificationsState => ({
      ...notificationsState,
      message: message,
    }));
  };
  const onCreateItem = (product: Product) => {
    productService
      .createProduct(
        {
          ...product,
          userId: contextUserData.userData?.user?.id,
        },
        contextUserData.userData?.accessToken,
      )
      .then(async response => {
        const data: Product = await response.json();
        handleNotifications('Product added !');
      })
      .catch(error => console.error('post request failed: ', error));
  };

  const onResetNotifications = (value: string) => {
    setNotifications({message: value});
  };
  return (
    <View style={{flex: 1}}>
      <ProductView
        notifications={notifications}
        onResetNotifications={onResetNotifications}
        onCreateItem={onCreateItem}
      />
    </View>
  );
};
