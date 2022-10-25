import React, { useEffect, useState } from 'react';
import useTempleteMaker from '../../CustomHooks/useTempleteMaker';

function ProductTempleteTypes({ type, specsHandler }) {
  let element;

  const cpuArray = [
    'BRAND',
    'PRODUCER',
    'MODAL',
    'Socket_Type',
    'Frequency_Speed',
    'Max_Frequency_Speed',
    'CPU_Cores/Threads',
    'Overclocking',
    'Architecture',
    'L2_Cache',
    'L3_Cache',
    'Technology',
    'TDP',
  ];

  const gpuArray = [
    'BRAND',
    'PRODUCER',
    'MODAL',
    'Memory_Size',
    'Memory_Type',
    'Memory_Clock',
    'Memory_Speed',
    'Memory_Bandwith',
    'Memory_Interface',
    'TDP',
    'HDMI',
    'Display_Port',
    'Max_Resolution',
  ];

  const moboArray = [
    'PCI',
    'CPU_Socket_Type',
    'Memory_Slots',
    'Max_Memory',
    'Memory_Type',
    'Memory_Frequency',
    'Product_Dimensions',
    'USB_3*2',
    'USB_3*1',
    'USB_3*0',
    'USB_2*0',
    'Bluetooth',
    'M*2',
    'HDMI',
    'Lan_Speed',
    'Lan_output',
    'Wireless',
    'Sound_Chip',
    'Case_type',
  ];

  const ramArray = [
    'Memory_type',
    'Capacity',
    'Clock',
    'Memory_Format',
    'Color',
    'CAS_Latency',
    'Memory_Voltage',
  ];

  const psuArray = [
    'Wattage',
    'Brand',
    'Connector_type',
    'Color',
    'Product_Dimensions',
    'Producer',
    'Weight',
    'Series',
  ];

  const caseArray = [
    'Brand',
    'Motherboard_compatibility',
    'Case_type',
    'Color',
    'Material',
    'Cooling method',
  ];

  const storageArray = [
    'Storage_capacity',
    'Disk_interface',
    'Connectivity_technology',
    'Brand',
    'Disk_form_factor',
    'Compatible_devices',
  ];

  switch (type) {
    case 'cpu':
      element = useTempleteMaker(cpuArray, specsHandler);
      break;
    case 'gpu':
      element = useTempleteMaker(gpuArray, specsHandler);
      break;
    case 'mobo':
      element = useTempleteMaker(moboArray, specsHandler);
      break;
    case 'ram':
      element = useTempleteMaker(ramArray, specsHandler);
      break;
    case 'psu':
      element = useTempleteMaker(psuArray, specsHandler);
      break;

    case 'case':
      element = useTempleteMaker(caseArray, specsHandler);
      break;
    case 'ssd':
      element = useTempleteMaker(storageArray, specsHandler);
      break;
    case 'hdd':
      element = useTempleteMaker(storageArray, specsHandler);
      break;

    default:
      break;
  }

  //Resets all specs if product type changes
  useEffect(() => {
    specsHandler.values.specs = {};
  }, [type]);

  return element;
}

export default ProductTempleteTypes;
