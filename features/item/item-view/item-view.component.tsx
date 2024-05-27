import {View, Text, Pressable, ImageBackground} from 'react-native';
import {style} from '../../shared-style/style';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  DocumentPickerResponse,
  pick,
  types,
} from 'react-native-document-picker';
import PagerView from 'react-native-pager-view';
import {itemViewStyle} from './item-view.style';

type pagerViewRef = React.ElementRef<typeof PagerView>;

export const ItemView = () => {
  const [fileResponse, setFileResponse] = useState<DocumentPickerResponse[]>(
    [],
  );

  const handleFileSelection = useCallback(async () => {
    try {
      const response = await pick({
        type: [types.images],
        allowMultiSelection: true,
      });

      setFileResponse(response);
    } catch (error) {
      console.error('error: ', error);
    }
  }, []);

  const [count, setCount] = useState(0);

  const pagerView = useRef<pagerViewRef>(null);

  useEffect(() => {
    pagerView.current?.setPage(count);
  }, [count]);

  return (
    <View style={{flex: 1}}>
      <PagerView
        ref={pagerView}
        initialPage={0}
        collapsable={false}
        useNext={true}
        onPageSelected={(e)=>{
          setCount(e.nativeEvent.position)
        }}
        >
        {fileResponse.map((file, index) => (
          <View key={index} style={{alignItems: 'center'}}>
            <ImageBackground
              style={{width: 350, height: 350, backgroundColor: 'dodgerblue'}}
              source={{uri: file.uri}}
              resizeMode="contain"
            />
          </View>
        ))}
      </PagerView>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {fileResponse.length !== 0 ? (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Pressable
              onPress={() => {
                setCount(count - 1);

              }}>
              <Text style={itemViewStyle.arrows}>{'< '}</Text>
            </Pressable>
            <Text>
              {count + 1} / {fileResponse.length.toString()}
            </Text>
            <Pressable
              onPress={() => {
                setCount(count + 1);

              }}>
              <Text style={itemViewStyle.arrows}>{' >'}</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={[style.mainButtonContainer, {flex: 1}]}>
        <Pressable
          style={[style.pressable, {marginTop: 10}]}
          onPress={() => handleFileSelection()}>
          <Text style={style.lightText}>Select {'\u{1F5BC}'}</Text>
        </Pressable>
      </View>
    </View>
  );
};
