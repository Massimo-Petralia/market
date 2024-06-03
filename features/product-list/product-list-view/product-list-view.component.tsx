import { View, Text } from "react-native";
import { Product } from "../../models";
import PagerView from "react-native-pager-view";
import { Card } from "@rneui/themed";

export const ProductListView = ({products}: {products: Product[]}) => {
    return (
        <View>
            
            <PagerView
            initialPage={0}
            useNext
            >
                {products.length !== 0 ?  products.map((product, index)=>{
                    return <Card key={index}>
                        <Card.Title>{product.name.toUpperCase()}</Card.Title>
                    <Card.Divider/>
                    <Card.Image
                    source={{
                        uri: product.images[0]
                    }}
                    />
                    </Card>
                    
                    
                    }):<View key="0"><Text>no products present</Text></View>}
            </PagerView>
        </View>
    )
}