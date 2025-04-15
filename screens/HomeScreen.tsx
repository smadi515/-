import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import ImagePickerComponent from '../components/ImagePickerComponent';
import {
  saveOfflineProduct,
  getOfflineProducts,
  removeOfflineProduct,
} from '../utils/storage';
import Icon from '../components/icon';

const HomeScreen = () => {
  const [mainImage, setMainImage] = useState<any>(null);
  const [extraImages, setExtraImages] = useState<any[]>([
    null,
    null,
    null,
    null,
  ]);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [limitedQuantity, setLimitedQuantity] = useState(false);

  const [offlineProducts, setOfflineProducts] = useState<any[]>([]);

  const handleSave = async () => {
    const productId = Date.now().toString();
    const product = {
      id: productId,
      name,
      price,
      category,
      description,
      limitedQuantity,
      mainImage,
      extraImages,
    };

    try {
      // Replace this with your real API call
      throw new Error('Simulated upload failure');

      // On success: you could clear offline
    } catch (err) {
      console.log('Upload failed. Saving offline...');
      await saveOfflineProduct(productId, product);
      Alert.alert('تم الحفظ بدون اتصال. حاول لاحقاً.');
    }
  };

  const loadOffline = async () => {
    const products = await getOfflineProducts();
    setOfflineProducts(products);
  };

  const retryUpload = async (product: any) => {
    try {
      // Simulate successful upload (remove throw)
      // TODO: Replace this with your real API call
      // throw new Error('Still offline');

      await removeOfflineProduct(product.id);
      await loadOffline();
      Alert.alert('تم رفع المنتج بنجاح!');
    } catch {
      Alert.alert('ما زال فشل الرفع. حاول لاحقاً.');
    }
  };

  useEffect(() => {
    loadOffline();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Main Image */}
      <View style={{paddingVertical: 20, paddingHorizontal: 15}}>
        <ImagePickerComponent
          text="إضافة صورة أو فيديو"
          image={mainImage}
          onPick={setMainImage}
          extraStyle={styles.mainBox}
          customIcon={
            <Icon type="ant" name="pluscircleo" color="white" size={30} />
          }
        />
      </View>

      {/* Extra Images */}
      <View style={styles.imageRow}>
        {extraImages.map((img, i) => (
          <ImagePickerComponent
            extraStyle={styles.box}
            key={i}
            image={img}
            customIcon={
              <Icon type="ant" name="pluscircleo" color="black" size={20} />
            }
            onPick={asset => {
              const newImages = [...extraImages];
              newImages[i] = asset;
              setExtraImages(newImages);
            }}
          />
        ))}
      </View>

      {/* Text Inputs */}
      <TextInput
        placeholder="ادخل اسم المنتج"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <View style={styles.row}>
        <Text style={styles.currency}>JOD</Text>
        <TextInput
          placeholder="ادخل السعر"
          style={[styles.input, {flex: 1}]}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
      </View>
      <TextInput
        placeholder="فئة المنتج"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="أضف وصف المنتج"
        style={[styles.input, {height: 80}]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.switchRow}>
        <Text>كمية محدودة</Text>
        <Switch value={limitedQuantity} onValueChange={setLimitedQuantity} />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>حفظ</Text>
      </TouchableOpacity>

      {/* Offline Items */}
      {offlineProducts.length > 0 && (
        <>
          <Text style={styles.offlineTitle}>محاولات رفع غير ناجحة:</Text>
          {offlineProducts.map(product => (
            <View key={product.id} style={styles.offlineItem}>
              <Text>
                {product.name} - {product.price} JOD
              </Text>
              <TouchableOpacity
                style={styles.retryBtn}
                onPress={() => retryUpload(product)}>
                <Text style={styles.retryText}>🔁 إعادة المحاولة</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: '#00BCD4',
    width: '100%',
    height: 170,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  box: {
    backgroundColor: '#f2f2f2',
    width: '20%',
    height: '100%',
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  MainImage: {width: '100%', marginVertical: 10},
  container: {padding: 16, backgroundColor: '#fff'},
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '10%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  currency: {marginRight: 10, fontSize: 18, position: 'absolute', right: 0},
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  saveBtn: {
    backgroundColor: '#00BCD4',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveText: {color: '#fff', fontSize: 18},
  offlineTitle: {fontSize: 18, fontWeight: 'bold', marginTop: 20},
  offlineItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  retryBtn: {paddingHorizontal: 10, paddingVertical: 5},
  retryText: {color: '#00BCD4'},
});

export default HomeScreen;
