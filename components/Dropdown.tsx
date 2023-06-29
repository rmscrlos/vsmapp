import {MaterialCommunityIcons} from '@expo/vector-icons'
import React, {FC, ReactElement, forwardRef, useEffect, useRef, useState} from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native'
import Colors from '../constants/Colors'
import {updateTaskStatus} from '../redux/tasksSlice/tasks'
import {useAppDispatch} from '../redux/hook'
import {patchTaskStatus} from '../lib/sanityClient'

interface Props {
  label: string
  data: Array<string>
  id: string
  onSelect: (item: string) => void
}

const Dropdown: FC<Props> = ({label, data, onSelect, id}) => {
  const disptach = useAppDispatch()
  const DropdownButton = useRef<View>(null)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(undefined)
  const [dropdownTop, setDropdownTop] = useState(0)

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown()
  }

  const openDropdown = (): void => {
    DropdownButton.current?.measure(
      (_fx: number, _fy: number, _w: number, h: number, _px: number, py: number) => {
        setDropdownTop(py + h)
      }
    )
    setVisible(true)
  }

  const onItemPress = (item: any): void => {
    setSelected(item)
    onSelect(item)
    setVisible(false)
  }

  useEffect(() => {
    if (selected !== undefined && selected !== label) {
      patchTaskStatus(id, selected)
      disptach(updateTaskStatus({id, status: selected}))
    }
  }, [onItemPress])

  const renderItem = ({item, index}: any): ReactElement<any, any> => (
    <View style={[styles.item, index === data.length - 1 && {borderBottomWidth: 0}]}>
      <TouchableWithoutFeedback onPress={() => onItemPress(item)}>
        <Text
          style={{textTransform: 'capitalize', fontFamily: 'PoppinsMedium', color: Colors.offWhite}}
        >
          {item}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  )

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <View>
          <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
            <View style={[styles.dropdown, {top: dropdownTop - 10}]}>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  return (
    <View style={styles.button} ref={DropdownButton}>
      <TouchableWithoutFeedback onPress={() => toggleDropdown()}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <MaterialCommunityIcons
            style={[styles.icon, {color: Colors.pastelPurple}]}
            name="chevron-down"
            size={24}
          />
          {renderDropdown()}
          <View>
            <Text style={styles.textTitle}>Status</Text>
            <Text style={styles.status}>{(!!selected && selected) || label}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '43%',
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  textTitle: {
    fontFamily: 'PoppinsSemiBold',
    fontSize: 12,
    marginBottom: 5,
    color: Colors.secondaryColorLightShade,
  },
  status: {
    color: Colors.offWhite,
    fontSize: 16,
    fontFamily: 'PoppinsSemiBold',
    textTransform: 'capitalize',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    right: 30.1,
    backgroundColor: Colors.secondaryColor,
    width: '38.5%',
    borderBottomEndRadius: 8,
    borderBottomStartRadius: 8,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.secondaryColorLightShade,
  },
})

export default Dropdown
