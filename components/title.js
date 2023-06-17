import React from 'react' 
import { Text} from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function Title(text){
    return(
            <Text style = {tw`text-2xl font-bold tracking-wide p-2`}>
{text}
            </Text>
    )
}
