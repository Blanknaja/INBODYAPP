/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
} from 'react-native';
import {BleManager} from 'react-native-ble-plx';
import { Buffer } from 'buffer';

const App = () => {
  const [deviceName, setdeviceName] = useState(null);
  let manager = new BleManager();
  let subscription;

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App ACCESS_FINE_LOCATION Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the ACCESS_FINE_LOCATION');
      } else {
        console.log('ACCESS_FINE_LOCATION permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    async function checkPermission() {
      await requestCameraPermission();
    }

    checkPermission();

    subscription = manager.onStateChange((state) => {
      console.log('state ', state);
      if (state === 'PoweredOn') {
        scanAndConnect();
        subscription.remove();
      }
    }, true);
  }, []);

  const scanAndConnect = async () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('error ', error);
        // Handle error (scanning will be stopped automatically)
        return;
      }
      console.table('device ', JSON.stringify(device.name));

      // setdeviceName(device.name)

      if (device.name == 'A&D_UA-651BLE_1D6BB3') {
        console.log('Fond it!');

        manager.stopDeviceScan();





          







        // device
        //   .connect()
        //   .then((device) => {
        //     return device.discoverAllServicesAndCharacteristics();
        //   })
        //   .then((device) => {
        //     console.log('device ', device);

        //     let services = device.services();
        //     console.log('device connect', services);


        //     services.then(res =>{
        //       console.log("resres" , res);

        //       console.log("res[0].deviceID" , res[0].deviceID);
        //       console.log("res[0].uuid" ,  res[0].uuid);


        //      let abbb =  manager.readDescriptorForDevice(res[0].deviceID , res[0].uuid , res[0].uuid , res[0].uuid , null)
        //      console.log("abbb " , abbb);
             
        //     }).catch(err =>{
        //       console.log("err" , err)
        //     })

      


        //     //  let data =  manager.readCharacteristicForDevice(services.uuid)


        //     // Do work on device with services and characteristics
        //   })
        //   .then((result) => {
        //     // Do work on device with services and characteristics
        //     //console.log(this.manager.characteristicsForService("00001800-0000-1000-8000-00805f9b34fb"))
        //     console.log('device result', result);
        //     console.log('connected');
        //   })
        //   .catch((error) => {
        //     console.log('device error', error);

        //     // Handle errors
        //   });
      }
    });
  };
  return (
    <>
      {console.log('subscription ', subscription)}
      <SafeAreaView>
        <View>
          <Text>device {deviceName ? 'scanning...' : deviceName}</Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default App;
